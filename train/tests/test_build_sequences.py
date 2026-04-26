import pandas as pd

from train.src.build_sequences import build_sequences


def test_build_sequences_generates_samples():
  df = pd.DataFrame(
    {
      "match_id": ["m1"] * 40,
      "frame_idx": list(range(40)),
      "left_paddle_y": [100.0] * 40,
      "right_paddle_y": [120.0] * 40,
      "ball_y": [200.0 + (i % 5) * 2 for i in range(40)],
    }
  )

  x, y, groups, weights, metadata = build_sequences(
    df,
    feature_columns=["delta_y"],
    label_to_index={"up": 0, "down": 1, "stay": 2},
    sequence_length=1,
    objective_config={
      "paddle_height": 96.0,
      "label_deadzone": 6.0,
      "distance_scale": 120.0,
      "min_weight": 0.2,
      "max_weight": 3.0,
    },
  )

  assert x.shape[0] > 0
  assert len(y) == x.shape[0]
  assert len(groups) == x.shape[0]
  assert len(weights) == x.shape[0]
  assert metadata["num_samples"] == x.shape[0]
  assert metadata["label_counts"]["down"] > 0
