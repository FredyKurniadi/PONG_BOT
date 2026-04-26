$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Push-Location $root
if (-not (Test-Path ".venv\Scripts\python.exe")) {
  throw "Python environment belum siap. Jalankan scripts/setup_all.ps1 dulu."
}
$code = @"
import glob
import pandas as pd
from pathlib import Path

files = sorted(glob.glob('datasets/raw/*.csv'))
if not files:
    raise SystemExit('No CSV files found in datasets/raw')

df = pd.concat([pd.read_csv(f) for f in files], ignore_index=True)
out = Path('datasets/processed/merged.parquet')
out.parent.mkdir(parents=True, exist_ok=True)
df.to_parquet(out, index=False)
print(f'Wrote {out} with {len(df)} rows')
"@
.\.venv\Scripts\python.exe -c $code
Pop-Location
