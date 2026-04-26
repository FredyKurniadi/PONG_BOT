$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Push-Location "$root/web"
npm run test
Pop-Location

Push-Location $root
if (Test-Path ".venv\Scripts\python.exe") {
  .\.venv\Scripts\python.exe -m pytest train/tests -q
} else {
  Write-Host "[warn] Python venv not found, skipping python tests"
}
Pop-Location
