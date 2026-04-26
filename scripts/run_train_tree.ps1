param(
  [string]$RawDataGlob = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Push-Location $root

if (-not (Test-Path ".venv\Scripts\python.exe")) {
  throw "Python environment belum siap. Jalankan scripts/setup_all.ps1 dulu."
}

if (-not $RawDataGlob) {
  $csvFiles = Get-ChildItem "datasets/raw" -Filter "*.csv" -File | Sort-Object Name
  if (-not $csvFiles -or $csvFiles.Count -eq 0) {
    throw "Tidak ada data replay CSV di datasets/raw. Export dulu dari web game."
  }

  Write-Host "Pilih data replay untuk training Decision Tree:"
  Write-Host "  [0] Semua file CSV (datasets/raw/*.csv)"
  for ($i = 0; $i -lt $csvFiles.Count; $i++) {
    Write-Host ("  [{0}] {1}" -f ($i + 1), $csvFiles[$i].Name)
  }

  $choice = Read-Host "Masukkan nomor pilihan"
  if (-not ($choice -match "^\d+$")) {
    throw "Pilihan harus berupa angka."
  }

  $idx = [int]$choice
  if ($idx -eq 0) {
    $RawDataGlob = "datasets/raw/*.csv"
  } elseif ($idx -ge 1 -and $idx -le $csvFiles.Count) {
    $RawDataGlob = $csvFiles[$idx - 1].FullName
  } else {
    throw "Pilihan di luar daftar."
  }
}

Write-Host "[train-tree] raw data source: $RawDataGlob"

.\.venv\Scripts\python.exe train/src/train_decision_tree.py `
  --train-config train/configs/train.yaml `
  --model-config train/configs/model_mlp.yaml `
  --raw-data-glob "$RawDataGlob"

Pop-Location
