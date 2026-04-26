from __future__ import annotations

import pandas as pd


def preprocess_dataframe(df: pd.DataFrame, feature_columns: list[str]) -> pd.DataFrame:
  required = [
    "match_id",
    "frame_idx",
    "left_paddle_y",
    "right_paddle_y",
    "ball_x",
    "ball_y",
    "ball_vx",
    "ball_vy",
    "label_action_left",
    "label_action_right",
    "score_left",
    "score_right",
  ]
  missing = [col for col in required if col not in df.columns]
  if missing:
    raise ValueError(f"Missing required columns: {missing}")

  out = df.copy()

  # Normalize metadata and labels to stable string/int types across mixed CSV sources.
  out["match_id"] = out["match_id"].astype(str)
  out["frame_idx"] = pd.to_numeric(out["frame_idx"], errors="coerce")
  out["label_action_left"] = out["label_action_left"].astype(str).str.strip().str.lower()
  out["label_action_right"] = out["label_action_right"].astype(str).str.strip().str.lower()

  out = out.dropna(subset=["frame_idx"])
  out["frame_idx"] = out["frame_idx"].astype("int64")
  out = out.sort_values(["match_id", "frame_idx"]).reset_index(drop=True)
  out = out.dropna(subset=[
    "left_paddle_y",
    "right_paddle_y",
    "ball_x",
    "ball_y",
    "ball_vx",
    "ball_vy",
    "label_action_left",
    "label_action_right",
    "score_left",
    "score_right",
  ])

  numeric_columns = [
    "left_paddle_y",
    "right_paddle_y",
    "ball_x",
    "ball_y",
    "ball_vx",
    "ball_vy",
    "score_left",
    "score_right",
  ]
  for col in numeric_columns:
    out[col] = pd.to_numeric(out[col], errors="coerce")
  out = out.dropna(subset=numeric_columns)

  return out
