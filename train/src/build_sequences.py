from __future__ import annotations

import numpy as np
import pandas as pd


def build_sequences(
  df: pd.DataFrame,
  feature_columns: list[str],
  label_to_index: dict[str, int],
  sequence_length: int,
  objective_config: dict,
):
  x_chunks: list[np.ndarray] = []
  y_chunks: list[int] = []
  match_ids: list[str] = []
  sample_weights: list[float] = []
  total_candidates = 0
  label_counts = {"up": 0, "down": 0, "stay": 0}

  required = [
    "match_id",
    "frame_idx",
    "left_paddle_y",
    "right_paddle_y",
    "ball_y",
  ]
  missing = [col for col in required if col not in df.columns]
  if missing:
    raise ValueError(f"Missing required columns for perspective build: {missing}")

  for match_id, group in df.groupby("match_id"):
    group = group.sort_values("frame_idx")
    for side in ("left", "right"):
      perspective = _build_perspective_group(group, side, objective_config)
      features = perspective[feature_columns].to_numpy(dtype=np.float32)
      labels = perspective["label_action"].astype(str).to_numpy()

      if len(features) <= sequence_length:
        continue

      for start in range(0, len(features) - sequence_length):
        end = start + sequence_length
        target_idx = end
        if target_idx >= len(labels):
          break
        total_candidates += 1

        label = labels[target_idx]
        if label not in label_to_index:
          continue
        label_counts[label] = label_counts.get(label, 0) + 1

        sample_weight = _distance_weight(
          delta_y=float(perspective.loc[target_idx, "delta_y"]),
          distance_scale=float(objective_config["distance_scale"]),
          min_weight=float(objective_config["min_weight"]),
          max_weight=float(objective_config["max_weight"]),
        )

        x_chunks.append(features[start:end])
        y_chunks.append(label_to_index[label])
        match_ids.append(f"{match_id}:{side}")
        sample_weights.append(sample_weight)

  if not x_chunks:
    raise ValueError("No sequences built after own-half filter. Tambah replay atau longgarkan objective config.")

  x = np.stack(x_chunks)
  y = np.array(y_chunks, dtype=np.int64)
  match_ids_arr = np.array(match_ids)
  weights_arr = np.array(sample_weights, dtype=np.float32)

  metadata = {
    "num_samples": int(len(y)),
    "num_candidates": int(total_candidates),
    "label_counts": label_counts,
    "mean_weight": float(np.mean(weights_arr)),
    "min_weight": float(np.min(weights_arr)),
    "max_weight": float(np.max(weights_arr)),
  }

  return x, y, match_ids_arr, weights_arr, metadata


def _build_perspective_group(group: pd.DataFrame, side: str, objective_config: dict) -> pd.DataFrame:
  out = pd.DataFrame(index=group.index)
  out["ball_y"] = group["ball_y"].astype(float)
  paddle_height = float(objective_config["paddle_height"])

  if side == "left":
    out["own_paddle_y"] = group["left_paddle_y"].astype(float)
  else:
    out["own_paddle_y"] = group["right_paddle_y"].astype(float)

  out["own_paddle_center_y"] = out["own_paddle_y"] + (paddle_height / 2.0)
  out["delta_y"] = out["ball_y"] - out["own_paddle_center_y"]
  out["label_action"] = out["delta_y"].apply(
    lambda value: _rule_label(float(value), float(objective_config["label_deadzone"]))
  )
  out = out.reset_index(drop=True)
  return out


def _rule_label(delta_y: float, deadzone: float) -> str:
  if delta_y < -deadzone:
    return "up"
  if delta_y > deadzone:
    return "down"
  return "stay"


def _distance_weight(
  delta_y: float,
  distance_scale: float,
  min_weight: float,
  max_weight: float,
) -> float:
  abs_delta = abs(delta_y)
  closeness = 1.0 / (1.0 + abs_delta / max(distance_scale, 1e-6))
  return float(min_weight + (max_weight - min_weight) * closeness)
