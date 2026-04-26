from __future__ import annotations

import argparse
from pathlib import Path
import random

import numpy as np
import yaml

from data_loader import load_raw_matches, save_processed_dataframe
from preprocess import preprocess_dataframe
from build_sequences import build_sequences
from model_def import build_model
from evaluate import compute_metrics, write_metrics
from export_model import export_onnx


def parse_args():
  parser = argparse.ArgumentParser(description="Train Pong MLP classifier")
  parser.add_argument("--train-config", default="train/configs/train.yaml")
  parser.add_argument("--model-config", default="train/configs/model_mlp.yaml")
  parser.add_argument("--raw-data-glob", default=None)
  return parser.parse_args()


def load_yaml(path: str) -> dict:
  with open(path, "r", encoding="utf-8") as file:
    return yaml.safe_load(file)


def set_seed(seed: int) -> None:
  random.seed(seed)
  np.random.seed(seed)


def latest_bot_id(models_dir: Path, prefix: str) -> int:
  current = 0
  for path in models_dir.glob(f"{prefix}[0-9][0-9][0-9]"):
    suffix = path.name.replace(prefix, "")
    if suffix.isdigit():
      current = max(current, int(suffix))
  return current


def split_train_val_indices(x: np.ndarray, groups: np.ndarray, val_size: float, seed: int):
  n_samples = x.shape[0]
  if n_samples < 2:
    raise ValueError("Data sequence terlalu sedikit untuk split train/val. Tambahkan data replay dulu.")

  unique_groups = np.unique(groups)
  if unique_groups.size >= 2:
    rng = np.random.default_rng(seed)
    shuffled = unique_groups.copy()
    rng.shuffle(shuffled)

    target_val = max(1, int(round(n_samples * val_size)))
    selected = []
    selected_count = 0
    for group_id in shuffled:
      count = int(np.sum(groups == group_id))
      selected.append(group_id)
      selected_count += count
      if selected_count >= target_val:
        break

    val_mask = np.isin(groups, np.array(selected))
    val_idx = np.where(val_mask)[0]
    train_idx = np.where(~val_mask)[0]
    if len(train_idx) > 0 and len(val_idx) > 0:
      return train_idx, val_idx

  rng = np.random.default_rng(seed)
  perm = rng.permutation(n_samples)
  val_count = max(1, int(round(n_samples * val_size)))
  if val_count >= n_samples:
    val_count = n_samples - 1

  val_idx = perm[:val_count]
  train_idx = perm[val_count:]
  return train_idx, val_idx


def main():
  args = parse_args()
  train_cfg = load_yaml(args.train_config)
  model_cfg = load_yaml(args.model_config)

  if args.raw_data_glob:
    train_cfg["raw_data_glob"] = args.raw_data_glob

  set_seed(int(train_cfg["seed"]))

  df_raw = load_raw_matches(train_cfg["raw_data_glob"])
  df = preprocess_dataframe(df_raw, train_cfg["feature_columns"])
  save_processed_dataframe(df, train_cfg["processed_output"])

  x, y, groups, sample_weights, sequence_metadata = build_sequences(
    df,
    feature_columns=train_cfg["feature_columns"],
    label_to_index=model_cfg["label_to_index"],
    sequence_length=int(train_cfg["sequence_length"]),
    objective_config=train_cfg["objective_weighting"],
  )

  train_idx, val_idx = split_train_val_indices(
    x,
    groups,
    val_size=float(train_cfg["val_size"]),
    seed=int(train_cfg["seed"]),
  )

  x_train = x[train_idx].astype(np.float32)
  y_train = y[train_idx].astype(np.int64)
  w_train = sample_weights[train_idx].astype(np.float32)
  x_val = x[val_idx].astype(np.float32)
  y_val = y[val_idx].astype(np.int64)

  model = build_model(
    model_cfg,
    sequence_length=int(train_cfg["sequence_length"]),
    seed=int(train_cfg["seed"]),
  )

  batch_size = int(train_cfg["batch_size"])
  epochs = int(train_cfg["epochs"])
  learning_rate = float(train_cfg["learning_rate"])
  weight_decay = float(train_cfg["weight_decay"])

  for epoch in range(epochs):
    permutation = np.random.permutation(x_train.shape[0])
    epoch_loss = 0.0

    for start in range(0, x_train.shape[0], batch_size):
      idx = permutation[start:start + batch_size]
      xb = x_train[idx]
      yb = y_train[idx]
      wb = w_train[idx]

      loss = model.train_batch(
        xb,
        yb,
        wb,
        learning_rate=learning_rate,
        weight_decay=weight_decay,
      )

      epoch_loss += float(loss)

    print(f"epoch={epoch + 1}/{epochs} loss={epoch_loss:.4f}")

  val_logits = model.forward(x_val, training=False)
  val_pred = np.argmax(val_logits, axis=1).astype(np.int64)

  y_val_np = y_val
  labels = sorted(model_cfg["label_to_index"].values())
  metrics = compute_metrics(y_val_np, val_pred, labels)
  metrics["training_focus"] = "defense_distance_minimization"
  metrics["sequence_metadata"] = sequence_metadata
  metrics["mlp_backend"] = getattr(model, "backend", "unknown")

  models_root = Path(train_cfg["model_output_dir"])
  models_root.mkdir(parents=True, exist_ok=True)
  next_id = latest_bot_id(models_root, train_cfg["model_counter_prefix"]) + 1
  model_dir = models_root / f"{train_cfg['model_counter_prefix']}{next_id:03d}"
  model_dir.mkdir(parents=True, exist_ok=False)

  model.save_npz(str(model_dir / "model.npz"))
  export_onnx(
    model,
    input_size=int(model_cfg["input_size"]),
    sequence_length=int(train_cfg["sequence_length"]),
    output_path=str(model_dir / "model.onnx"),
  )

  write_metrics(metrics, str(model_dir / "metrics.json"))
  with open(model_dir / "config_snapshot.yaml", "w", encoding="utf-8") as f:
    yaml.safe_dump({"train": train_cfg, "model": model_cfg}, f, sort_keys=False)

  print("Training complete")
  print(f"Model output: {model_dir}")
  print(f"Metrics: {metrics}")


if __name__ == "__main__":
  main()
