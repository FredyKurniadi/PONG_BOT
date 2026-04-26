import json
from pathlib import Path
import numpy as np


def _confusion_matrix(y_true: np.ndarray, y_pred: np.ndarray, labels: list[int]) -> np.ndarray:
  label_to_pos = {label: idx for idx, label in enumerate(labels)}
  cm = np.zeros((len(labels), len(labels)), dtype=np.int64)

  for truth, pred in zip(y_true, y_pred):
    if truth in label_to_pos and pred in label_to_pos:
      cm[label_to_pos[truth], label_to_pos[pred]] += 1
  return cm


def _macro_f1_from_cm(cm: np.ndarray) -> float:
  f1_scores = []
  for idx in range(cm.shape[0]):
    tp = float(cm[idx, idx])
    fp = float(np.sum(cm[:, idx]) - tp)
    fn = float(np.sum(cm[idx, :]) - tp)

    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    if precision + recall == 0:
      f1 = 0.0
    else:
      f1 = 2.0 * precision * recall / (precision + recall)
    f1_scores.append(f1)

  if not f1_scores:
    return 0.0
  return float(np.mean(np.array(f1_scores, dtype=np.float64)))


def compute_metrics(y_true, y_pred, labels: list[int]):
  y_true = np.asarray(y_true, dtype=np.int64)
  y_pred = np.asarray(y_pred, dtype=np.int64)
  cm = _confusion_matrix(y_true, y_pred, labels)

  return {
    "accuracy": float(np.mean(y_true == y_pred)) if y_true.size > 0 else 0.0,
    "macro_f1": _macro_f1_from_cm(cm),
    "confusion_matrix": cm.tolist(),
  }


def write_metrics(metrics: dict, output_path: str) -> None:
  target = Path(output_path)
  target.parent.mkdir(parents=True, exist_ok=True)
  target.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
