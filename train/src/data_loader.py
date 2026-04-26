from __future__ import annotations

from pathlib import Path
import glob
import pandas as pd


def load_raw_matches(raw_data_glob: str) -> pd.DataFrame:
  files = sorted(glob.glob(raw_data_glob))
  if not files:
    raise FileNotFoundError(f"No raw CSV files found by glob: {raw_data_glob}")

  frames = [pd.read_csv(path) for path in files]
  df = pd.concat(frames, ignore_index=True)
  return df


def save_processed_dataframe(df: pd.DataFrame, output_path: str) -> None:
  target = Path(output_path)
  target.parent.mkdir(parents=True, exist_ok=True)
  df.to_parquet(target, index=False)


def load_processed_dataframe(path: str) -> pd.DataFrame:
  source = Path(path)
  if not source.exists():
    raise FileNotFoundError(f"Processed dataset not found: {path}")
  return pd.read_parquet(source)
