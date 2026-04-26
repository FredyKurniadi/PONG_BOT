param(
  [switch]$SkipPython = $false,
  [switch]$SkipNode = $false,
  [switch]$RecreateVenv = $false
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Write-Host "[setup] project root: $root"

if (-not $SkipNode) {
  Write-Host "[setup] installing web dependencies"
  Push-Location "$root/web"
  npm install
  Pop-Location
}

if (-not $SkipPython) {
  Write-Host "[setup] preparing python virtual environment"
  Push-Location $root
  $pythonCmd = $null
  if (Get-Command py -ErrorAction SilentlyContinue) {
    try {
      py -3.11 -c "import sys; print(sys.version)" | Out-Null
      $pythonCmd = "py -3.11"
    } catch {
      $pythonCmd = $null
    }
  }
  if (-not $pythonCmd) {
    $pythonExe = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonExe) {
      try {
        python -c "import sys; assert sys.version_info[:2] == (3, 11)" | Out-Null
        $pythonCmd = "python"
      } catch {
        $pythonCmd = $null
      }
    }
  }
  if (-not $pythonCmd) {
    throw "Python 3.11 tidak ditemukan. Install Python 3.11 lalu jalankan lagi."
  }

  if ($RecreateVenv -and (Test-Path ".venv")) {
    Write-Host "[setup] removing existing .venv (RecreateVenv=true)"
    Remove-Item -Recurse -Force .venv
  }

  if (Test-Path ".venv\Scripts\python.exe") {
    $venvVersion = .\.venv\Scripts\python.exe -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"
    if ($venvVersion -ne "3.11") {
      Write-Host "[setup] existing .venv uses Python $venvVersion, recreating with 3.11"
      Remove-Item -Recurse -Force .venv
    }
  }

  if (-not (Test-Path ".venv")) {
    Invoke-Expression "$pythonCmd -m venv .venv"
  }
  .\.venv\Scripts\python.exe -m pip install --upgrade pip
  .\.venv\Scripts\python.exe -m pip install -r train/requirements.txt

  Write-Host "[setup] building C backend for MLP"
  try {
    & "$root\scripts\build_mlp_backend.ps1"
  } catch {
    Write-Host "[setup][warn] build backend C gagal, training akan pakai fallback numpy"
    Write-Host "[setup][warn] detail: $($_.Exception.Message)"
  }

  Write-Host "[setup] building C backend for Decision Tree"
  try {
    & "$root\scripts\build_decision_tree_backend.ps1"
  } catch {
    Write-Host "[setup][warn] build backend C tree gagal, training tree akan pakai fallback python"
    Write-Host "[setup][warn] detail: $($_.Exception.Message)"
  }
  Pop-Location
}

Write-Host "[setup] done"
