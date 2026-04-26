import ctypes
from pathlib import Path
import numpy as np

from decision_tree.pure_tree import PureDecisionTreeClassifier


def _configure_signatures(lib):
  lib.dt_create.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int, ctypes.c_int]
  lib.dt_create.restype = ctypes.c_void_p

  lib.dt_free.argtypes = [ctypes.c_void_p]
  lib.dt_free.restype = None

  lib.dt_fit.argtypes = [
    ctypes.c_void_p,
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_int64),
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
  ]
  lib.dt_fit.restype = ctypes.c_int

  lib.dt_predict.argtypes = [
    ctypes.c_void_p,
    ctypes.POINTER(ctypes.c_float),
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_int64),
  ]
  lib.dt_predict.restype = ctypes.c_int

  lib.dt_num_nodes.argtypes = [ctypes.c_void_p]
  lib.dt_num_nodes.restype = ctypes.c_int

  lib.dt_num_classes.argtypes = [ctypes.c_void_p]
  lib.dt_num_classes.restype = ctypes.c_int

  lib.dt_copy_children_left.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_int), ctypes.c_int]
  lib.dt_copy_children_left.restype = ctypes.c_int

  lib.dt_copy_children_right.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_int), ctypes.c_int]
  lib.dt_copy_children_right.restype = ctypes.c_int

  lib.dt_copy_feature.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_int), ctypes.c_int]
  lib.dt_copy_feature.restype = ctypes.c_int

  lib.dt_copy_threshold.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_float), ctypes.c_int]
  lib.dt_copy_threshold.restype = ctypes.c_int

  lib.dt_copy_value.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_float), ctypes.c_int]
  lib.dt_copy_value.restype = ctypes.c_int


class CDecisionTreeClassifier:
  def __init__(self, max_depth: int = 8, min_samples_leaf: int = 20, min_samples_split: int = 40, max_thresholds_per_feature: int = 64):
    self.max_depth = int(max_depth)
    self.min_samples_leaf = int(min_samples_leaf)
    self.min_samples_split = int(min_samples_split)
    self.max_thresholds_per_feature = int(max_thresholds_per_feature)

    self._lib = self._load_backend()
    self._handle = self._lib.dt_create(
      self.max_depth,
      self.min_samples_leaf,
      self.min_samples_split,
      self.max_thresholds_per_feature,
    )
    if not self._handle:
      raise RuntimeError("Gagal inisialisasi Decision Tree C backend")

    self.classes_: np.ndarray | None = None
    self.num_classes = 0

    self.children_left: list[int] = []
    self.children_right: list[int] = []
    self.feature: list[int] = []
    self.threshold: list[float] = []
    self.value: list[list[float]] = []

  @staticmethod
  def _load_backend():
    root = Path(__file__).resolve().parent
    candidates = [
      root / "build" / "tree_core.dll",
      root / "build" / "libtree_core.dll",
    ]

    for dll in candidates:
      if dll.exists():
        lib = ctypes.CDLL(str(dll))
        _configure_signatures(lib)
        return lib

    raise FileNotFoundError("Decision Tree C backend DLL tidak ditemukan")

  def __del__(self):
    try:
      if hasattr(self, "_handle") and self._handle:
        self._lib.dt_free(self._handle)
        self._handle = None
    except Exception:
      pass

  def fit(self, x: np.ndarray, y: np.ndarray, sample_weight: np.ndarray | None = None):
    x_arr = np.ascontiguousarray(np.asarray(x, dtype=np.float32))
    y_arr = np.ascontiguousarray(np.asarray(y, dtype=np.int64))
    if x_arr.ndim != 2:
      raise ValueError("x must be 2D")

    n_samples, n_features = x_arr.shape
    if sample_weight is None:
      w_arr = np.ones((n_samples,), dtype=np.float32)
    else:
      w_arr = np.ascontiguousarray(np.asarray(sample_weight, dtype=np.float32))

    classes = np.unique(y_arr)
    num_classes = int(np.max(classes)) + 1

    ok = self._lib.dt_fit(
      self._handle,
      x_arr.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      int(n_samples),
      int(n_features),
      y_arr.ctypes.data_as(ctypes.POINTER(ctypes.c_int64)),
      w_arr.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      int(num_classes),
    )
    if ok != 1:
      raise RuntimeError("dt_fit gagal")

    self.classes_ = classes.astype(np.int64)
    self.num_classes = int(num_classes)
    self._sync_arrays()
    return self

  def predict(self, x: np.ndarray) -> np.ndarray:
    x_arr = np.ascontiguousarray(np.asarray(x, dtype=np.float32))
    if x_arr.ndim != 2:
      raise ValueError("x must be 2D")

    n_samples, n_features = x_arr.shape
    out = np.zeros((n_samples,), dtype=np.int64)

    ok = self._lib.dt_predict(
      self._handle,
      x_arr.ctypes.data_as(ctypes.POINTER(ctypes.c_float)),
      int(n_samples),
      int(n_features),
      out.ctypes.data_as(ctypes.POINTER(ctypes.c_int64)),
    )
    if ok != 1:
      raise RuntimeError("dt_predict gagal")

    return out

  def _sync_arrays(self):
    node_count = int(self._lib.dt_num_nodes(self._handle))
    class_count = int(self._lib.dt_num_classes(self._handle))
    if node_count <= 0 or class_count <= 0:
      raise RuntimeError("Model C belum ter-fit")

    left = np.zeros((node_count,), dtype=np.int32)
    right = np.zeros((node_count,), dtype=np.int32)
    feat = np.zeros((node_count,), dtype=np.int32)
    thr = np.zeros((node_count,), dtype=np.float32)
    val = np.zeros((node_count * class_count,), dtype=np.float32)

    if self._lib.dt_copy_children_left(self._handle, left.ctypes.data_as(ctypes.POINTER(ctypes.c_int)), node_count) != node_count:
      raise RuntimeError("dt_copy_children_left gagal")
    if self._lib.dt_copy_children_right(self._handle, right.ctypes.data_as(ctypes.POINTER(ctypes.c_int)), node_count) != node_count:
      raise RuntimeError("dt_copy_children_right gagal")
    if self._lib.dt_copy_feature(self._handle, feat.ctypes.data_as(ctypes.POINTER(ctypes.c_int)), node_count) != node_count:
      raise RuntimeError("dt_copy_feature gagal")
    if self._lib.dt_copy_threshold(self._handle, thr.ctypes.data_as(ctypes.POINTER(ctypes.c_float)), node_count) != node_count:
      raise RuntimeError("dt_copy_threshold gagal")
    if self._lib.dt_copy_value(self._handle, val.ctypes.data_as(ctypes.POINTER(ctypes.c_float)), node_count * class_count) != (node_count * class_count):
      raise RuntimeError("dt_copy_value gagal")

    self.children_left = left.astype(np.int64).tolist()
    self.children_right = right.astype(np.int64).tolist()
    self.feature = feat.astype(np.int64).tolist()
    self.threshold = thr.astype(np.float64).tolist()
    self.value = val.reshape((node_count, class_count)).astype(np.float64).tolist()

  def to_web_json(self, sequence_length: int, feature_size: int, label_to_index: dict[str, int]):
    inverse = {int(v): str(k) for k, v in label_to_index.items()}
    classes = [int(v) for v in sorted(label_to_index.values())]

    return {
      "model_type": "decision_tree",
      "input": {
        "sequence_length": int(sequence_length),
        "feature_size": int(feature_size),
      },
      "classes": classes,
      "label_by_index": {str(k): inverse.get(int(k), "stay") for k in classes},
      "tree": {
        "children_left": self.children_left,
        "children_right": self.children_right,
        "feature": self.feature,
        "threshold": self.threshold,
        "value": self.value,
      },
    }


class HybridDecisionTreeClassifier:
  def __init__(self, max_depth: int = 8, min_samples_leaf: int = 20, min_samples_split: int = 40, max_thresholds_per_feature: int = 64):
    self.backend = "python"
    try:
      self._impl = CDecisionTreeClassifier(
        max_depth=max_depth,
        min_samples_leaf=min_samples_leaf,
        min_samples_split=min_samples_split,
        max_thresholds_per_feature=max_thresholds_per_feature,
      )
      self.backend = "c"
    except Exception:
      self._impl = PureDecisionTreeClassifier(
        max_depth=max_depth,
        min_samples_leaf=min_samples_leaf,
        min_samples_split=min_samples_split,
        max_thresholds_per_feature=max_thresholds_per_feature,
      )

  def fit(self, x: np.ndarray, y: np.ndarray, sample_weight: np.ndarray | None = None):
    self._impl.fit(x, y, sample_weight=sample_weight)
    return self

  def predict(self, x: np.ndarray) -> np.ndarray:
    return self._impl.predict(x)

  def to_web_json(self, sequence_length: int, feature_size: int, label_to_index: dict[str, int]):
    return self._impl.to_web_json(sequence_length=sequence_length, feature_size=feature_size, label_to_index=label_to_index)
