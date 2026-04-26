import ctypes
from pathlib import Path
import numpy as np


class _FallbackNumpyMLP:
  def __init__(self, input_size: int, sequence_length: int, hidden_sizes: list[int], dropout: float, num_classes: int, seed: int):
    self.input_size = int(input_size)
    self.sequence_length = int(sequence_length)
    self.hidden_sizes = [int(v) for v in hidden_sizes]
    self.dropout = float(dropout)
    self.num_classes = int(num_classes)
    self.rng = np.random.default_rng(int(seed))

    layer_sizes = [self.input_size * self.sequence_length, *self.hidden_sizes, self.num_classes]
    self.weights: list[np.ndarray] = []
    self.biases: list[np.ndarray] = []

    for fan_in, fan_out in zip(layer_sizes[:-1], layer_sizes[1:]):
      scale = np.sqrt(2.0 / max(1, fan_in))
      w = self.rng.standard_normal((fan_in, fan_out), dtype=np.float32) * np.float32(scale)
      b = np.zeros((fan_out,), dtype=np.float32)
      self.weights.append(w.astype(np.float32))
      self.biases.append(b)

  def _flatten(self, x: np.ndarray) -> np.ndarray:
    arr = np.asarray(x, dtype=np.float32)
    return arr.reshape(arr.shape[0], -1)

  def _forward_internal(self, x: np.ndarray, training: bool):
    a = self._flatten(x)
    caches: list[dict] = []

    for idx, (w, b) in enumerate(zip(self.weights, self.biases)):
      z = a @ w + b
      is_last = idx == len(self.weights) - 1

      if is_last:
        caches.append({"a_prev": a, "z": z, "w": w, "layer": idx})
        a = z
        continue

      relu_out = np.maximum(z, 0.0).astype(np.float32)
      mask = None
      if training and self.dropout > 0.0:
        keep_prob = 1.0 - self.dropout
        mask = (self.rng.random(relu_out.shape) < keep_prob).astype(np.float32)
        relu_out = (relu_out * mask) / np.float32(keep_prob)

      caches.append({
        "a_prev": a,
        "z": z,
        "relu_out": relu_out,
        "mask": mask,
        "w": w,
        "layer": idx,
      })
      a = relu_out

    return a.astype(np.float32), caches

  def forward(self, x: np.ndarray, training: bool = False) -> np.ndarray:
    logits, _ = self._forward_internal(x, training=training)
    return logits

  def predict(self, x: np.ndarray) -> np.ndarray:
    logits = self.forward(x, training=False)
    return np.argmax(logits, axis=1).astype(np.int64)

  def train_batch(self, x: np.ndarray, y: np.ndarray, sample_weight: np.ndarray, learning_rate: float, weight_decay: float) -> float:
    logits, caches = self._forward_internal(x, training=True)

    labels = np.asarray(y, dtype=np.int64)
    weights = np.asarray(sample_weight, dtype=np.float32)
    weights = weights / np.maximum(np.mean(weights), np.float32(1e-8))

    max_logits = np.max(logits, axis=1, keepdims=True)
    exp_shifted = np.exp(logits - max_logits)
    probs = exp_shifted / np.sum(exp_shifted, axis=1, keepdims=True)

    n = logits.shape[0]
    one_hot = np.zeros_like(probs, dtype=np.float32)
    one_hot[np.arange(n), labels] = 1.0

    log_probs = -np.log(np.maximum(probs[np.arange(n), labels], np.float32(1e-8)))
    loss = float(np.mean(log_probs * weights))

    grad = (probs - one_hot).astype(np.float32)
    grad *= (weights[:, None] / np.float32(max(1, n)))

    for idx in reversed(range(len(self.weights))):
      cache = caches[idx]
      a_prev = cache["a_prev"]

      grad_w = a_prev.T @ grad
      grad_b = np.sum(grad, axis=0)

      if weight_decay > 0.0:
        grad_w += np.float32(weight_decay) * self.weights[idx]

      if idx > 0:
        grad_prev = grad @ self.weights[idx].T
        prev_cache = caches[idx - 1]
        relu_grad = (prev_cache["z"] > 0).astype(np.float32)
        grad_prev = grad_prev * relu_grad

        if prev_cache["mask"] is not None:
          keep_prob = np.float32(1.0 - self.dropout)
          grad_prev = (grad_prev * prev_cache["mask"]) / keep_prob

        grad = grad_prev

      self.weights[idx] -= np.float32(learning_rate) * grad_w
      self.biases[idx] -= np.float32(learning_rate) * grad_b

    return loss


class _CBackendMLP:
  def __init__(self, input_size: int, sequence_length: int, hidden_sizes: list[int], dropout: float, num_classes: int, seed: int):
    self.input_size = int(input_size)
    self.sequence_length = int(sequence_length)
    self.hidden_sizes = [int(v) for v in hidden_sizes]
    self.dropout = float(dropout)
    self.num_classes = int(num_classes)
    self.flat_size = self.input_size * self.sequence_length

    self._lib = self._load_backend()
    hs_arr = (ctypes.c_int * len(self.hidden_sizes))(*self.hidden_sizes) if self.hidden_sizes else None
    self._handle = self._lib.mlp_create(
      self.input_size,
      self.sequence_length,
      hs_arr,
      len(self.hidden_sizes),
      self.num_classes,
      ctypes.c_float(self.dropout),
      ctypes.c_uint32(int(seed)),
    )

    if not self._handle:
      raise RuntimeError("Gagal inisialisasi MLP C backend")

    self.weights: list[np.ndarray] = []
    self.biases: list[np.ndarray] = []
    self.sync_parameters()

  @staticmethod
  def _load_backend():
    root = Path(__file__).resolve().parent
    candidates = [
      root / "build" / "mlp_core.dll",
      root / "build" / "libmlp_core.dll",
    ]

    for dll in candidates:
      if dll.exists():
        lib = ctypes.CDLL(str(dll))
        _configure_signatures(lib)
        return lib

    raise FileNotFoundError("MLP C backend DLL tidak ditemukan")

  def __del__(self):
    try:
      if hasattr(self, "_handle") and self._handle:
        self._lib.mlp_free(self._handle)
        self._handle = None
    except Exception:
      pass

  def _flatten(self, x: np.ndarray) -> np.ndarray:
    arr = np.asarray(x, dtype=np.float32)
    return np.ascontiguousarray(arr.reshape(arr.shape[0], -1), dtype=np.float32)

  def sync_parameters(self) -> None:
    layers = self._lib.mlp_num_layers(self._handle)
    if layers <= 0:
      raise RuntimeError("Model C tidak memiliki layer")

    weights: list[np.ndarray] = []
    biases: list[np.ndarray] = []

    for layer_idx in range(layers):
      in_dim = ctypes.c_int(0)
      out_dim = ctypes.c_int(0)
      ok = self._lib.mlp_get_layer_shape(self._handle, layer_idx, ctypes.byref(in_dim), ctypes.byref(out_dim))
      if ok != 1:
        raise RuntimeError(f"Gagal membaca shape layer {layer_idx}")

      w_len = in_dim.value * out_dim.value
      w_buf = np.zeros((w_len,), dtype=np.float32)
      b_buf = np.zeros((out_dim.value,), dtype=np.float32)

      got_w = self._lib.mlp_copy_layer_weights(
        self._handle,
        layer_idx,
        w_buf.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
        w_len,
      )
      got_b = self._lib.mlp_copy_layer_biases(
        self._handle,
        layer_idx,
        b_buf.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
        out_dim.value,
      )

      if got_w != w_len or got_b != out_dim.value:
        raise RuntimeError(f"Gagal copy parameter layer {layer_idx}")

      weights.append(w_buf.reshape((in_dim.value, out_dim.value)).copy())
      biases.append(b_buf.copy())

    self.weights = weights
    self.biases = biases

  def forward(self, x: np.ndarray, training: bool = False) -> np.ndarray:
    flat = self._flatten(x)
    batch = int(flat.shape[0])
    logits = np.zeros((batch, self.num_classes), dtype=np.float32)

    ok = self._lib.mlp_forward(
      self._handle,
      flat.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      batch,
      self.flat_size,
      logits.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
    )
    if ok != 1:
      raise RuntimeError("mlp_forward gagal")

    return logits

  def predict(self, x: np.ndarray) -> np.ndarray:
    flat = self._flatten(x)
    batch = int(flat.shape[0])
    out = np.zeros((batch,), dtype=np.int64)

    ok = self._lib.mlp_predict(
      self._handle,
      flat.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      batch,
      self.flat_size,
      out.ctypes.data_as(ctypes.POINTER(ctypes.c_int64)),
    )
    if ok != 1:
      raise RuntimeError("mlp_predict gagal")

    return out

  def train_batch(self, x: np.ndarray, y: np.ndarray, sample_weight: np.ndarray, learning_rate: float, weight_decay: float) -> float:
    flat = self._flatten(x)
    labels = np.ascontiguousarray(np.asarray(y, dtype=np.int64), dtype=np.int64)
    weights = np.ascontiguousarray(np.asarray(sample_weight, dtype=np.float32), dtype=np.float32)
    batch = int(flat.shape[0])

    loss = self._lib.mlp_train_batch(
      self._handle,
      flat.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      batch,
      self.flat_size,
      labels.ctypes.data_as(ctypes.POINTER(ctypes.c_int64)),
      weights.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      ctypes.c_float(float(learning_rate)),
      ctypes.c_float(float(weight_decay)),
    )

    if loss < 0:
      raise RuntimeError("mlp_train_batch gagal")

    return float(loss)


def _configure_signatures(lib):
  lib.mlp_create.argtypes = [
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_int),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.c_float,
    ctypes.c_uint32,
  ]
  lib.mlp_create.restype = ctypes.c_void_p

  lib.mlp_free.argtypes = [ctypes.c_void_p]
  lib.mlp_free.restype = None

  lib.mlp_num_layers.argtypes = [ctypes.c_void_p]
  lib.mlp_num_layers.restype = ctypes.c_int

  lib.mlp_get_layer_shape.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.POINTER(ctypes.c_int), ctypes.POINTER(ctypes.c_int)]
  lib.mlp_get_layer_shape.restype = ctypes.c_int

  lib.mlp_copy_layer_weights.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.POINTER(ctypes.c_float), ctypes.c_int]
  lib.mlp_copy_layer_weights.restype = ctypes.c_int

  lib.mlp_copy_layer_biases.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.POINTER(ctypes.c_float), ctypes.c_int]
  lib.mlp_copy_layer_biases.restype = ctypes.c_int

  lib.mlp_forward.argtypes = [
    ctypes.c_void_p,
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_float),
  ]
  lib.mlp_forward.restype = ctypes.c_int

  lib.mlp_predict.argtypes = [
    ctypes.c_void_p,
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_int64),
  ]
  lib.mlp_predict.restype = ctypes.c_int

  lib.mlp_train_batch.argtypes = [
    ctypes.c_void_p,
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_int64),
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_float,
    ctypes.c_float,
  ]
  lib.mlp_train_batch.restype = ctypes.c_float


class NumpyMLPClassifier:
  def __init__(self, input_size: int, sequence_length: int, hidden_sizes: list[int], dropout: float, num_classes: int, seed: int = 42):
    self.input_size = int(input_size)
    self.sequence_length = int(sequence_length)
    self.hidden_sizes = [int(v) for v in hidden_sizes]
    self.dropout = float(dropout)
    self.num_classes = int(num_classes)
    self.backend = "numpy"

    try:
      self._impl = _CBackendMLP(
        input_size=self.input_size,
        sequence_length=self.sequence_length,
        hidden_sizes=self.hidden_sizes,
        dropout=self.dropout,
        num_classes=self.num_classes,
        seed=int(seed),
      )
      self.backend = "c"
    except Exception:
      self._impl = _FallbackNumpyMLP(
        input_size=self.input_size,
        sequence_length=self.sequence_length,
        hidden_sizes=self.hidden_sizes,
        dropout=self.dropout,
        num_classes=self.num_classes,
        seed=int(seed),
      )

    self.weights = self._impl.weights
    self.biases = self._impl.biases

  def sync_parameters(self) -> None:
    if hasattr(self._impl, "sync_parameters"):
      self._impl.sync_parameters()
    self.weights = self._impl.weights
    self.biases = self._impl.biases

  def forward(self, x: np.ndarray, training: bool = False) -> np.ndarray:
    return self._impl.forward(x, training=training)

  def predict(self, x: np.ndarray) -> np.ndarray:
    return self._impl.predict(x)

  def train_batch(self, x: np.ndarray, y: np.ndarray, sample_weight: np.ndarray, learning_rate: float, weight_decay: float) -> float:
    return self._impl.train_batch(x, y, sample_weight, learning_rate, weight_decay)

  def save_npz(self, output_path: str) -> None:
    self.sync_parameters()
    payload = {
      "input_size": np.array(self.input_size, dtype=np.int64),
      "sequence_length": np.array(self.sequence_length, dtype=np.int64),
      "num_classes": np.array(self.num_classes, dtype=np.int64),
      "dropout": np.array(self.dropout, dtype=np.float32),
      "num_layers": np.array(len(self.weights), dtype=np.int64),
    }

    for idx, (w, b) in enumerate(zip(self.weights, self.biases)):
      payload[f"W{idx}"] = w.astype(np.float32)
      payload[f"b{idx}"] = b.astype(np.float32)

    np.savez(output_path, **payload)
