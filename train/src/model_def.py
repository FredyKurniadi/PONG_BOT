from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
  sys.path.insert(0, str(ROOT_DIR))

from mlp.numpy_mlp import NumpyMLPClassifier


def build_model(model_cfg: dict, sequence_length: int, seed: int = 42):
  model_type = str(model_cfg.get("model_type", "mlp")).lower()

  if model_type != "mlp":
    raise ValueError(f"Unsupported model_type: {model_type}. Use 'mlp'.")

  hidden_sizes = model_cfg.get("hidden_sizes", [256, 128])
  if not isinstance(hidden_sizes, list) or not hidden_sizes:
    raise ValueError("model.hidden_sizes must be a non-empty list")

  return NumpyMLPClassifier(
    input_size=int(model_cfg["input_size"]),
    sequence_length=int(sequence_length),
    hidden_sizes=[int(v) for v in hidden_sizes],
    dropout=float(model_cfg["dropout"]),
    num_classes=int(model_cfg["num_classes"]),
    seed=int(seed),
  )
