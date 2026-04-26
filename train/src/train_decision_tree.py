import argparse
from pathlib import Path
import random
import json
import sys

import numpy as np
import yaml

from data_loader import load_raw_matches, save_processed_dataframe
from preprocess import preprocess_dataframe
from build_sequences import build_sequences
from evaluate import compute_metrics, write_metrics

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
  sys.path.insert(0, str(ROOT_DIR))

from decision_tree.c_tree import HybridDecisionTreeClassifier


def parse_args():
  parser = argparse.ArgumentParser(description="Train Pong Decision Tree classifier")
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

  x_train = x[train_idx].reshape(len(train_idx), -1)
  y_train = y[train_idx]
  w_train = sample_weights[train_idx]

  x_val = x[val_idx].reshape(len(val_idx), -1)
  y_val = y[val_idx]

  tree_cfg = train_cfg.get("decision_tree", {})
  clf = HybridDecisionTreeClassifier(
    max_depth=tree_cfg.get("max_depth", 8),
    min_samples_leaf=tree_cfg.get("min_samples_leaf", 20),
    min_samples_split=tree_cfg.get("min_samples_split", 40),
  )
  clf.fit(x_train, y_train, sample_weight=w_train)

  val_pred = clf.predict(x_val)
  labels = sorted(model_cfg["label_to_index"].values())
  metrics = compute_metrics(y_val, val_pred, labels)
  metrics["training_focus"] = "defense_distance_minimization"
  metrics["model_type"] = "decision_tree"
  metrics["tree_backend"] = getattr(clf, "backend", "unknown")
  metrics["sequence_metadata"] = sequence_metadata

  models_root = Path(train_cfg["model_output_dir"])
  models_root.mkdir(parents=True, exist_ok=True)
  next_id = latest_bot_id(models_root, train_cfg["model_counter_prefix"]) + 1
  model_dir = models_root / f"{train_cfg['model_counter_prefix']}{next_id:03d}"
  model_dir.mkdir(parents=True, exist_ok=False)

  tree_json = clf.to_web_json(
    sequence_length=int(train_cfg["sequence_length"]),
    feature_size=int(model_cfg["input_size"]),
    label_to_index=model_cfg["label_to_index"],
  )

  with open(model_dir / "model_tree.json", "w", encoding="utf-8") as f:
    json.dump(tree_json, f, indent=2)

  write_metrics(metrics, str(model_dir / "metrics.json"))
  with open(model_dir / "config_snapshot.yaml", "w", encoding="utf-8") as f:
    yaml.safe_dump({"train": train_cfg, "model": model_cfg}, f, sort_keys=False)

  print("Decision Tree training complete")
  print(f"Model output: {model_dir}")
  print(f"Metrics: {metrics}")


if __name__ == "__main__":
  main()
