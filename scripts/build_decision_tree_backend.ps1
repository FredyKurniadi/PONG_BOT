$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "decision_tree/csrc/tree_core.c"
$outDir = Join-Path $root "decision_tree/build"
$outDll = Join-Path $outDir "tree_core.dll"
$msysBash = "C:\msys64\usr\bin\bash.exe"

if (-not (Test-Path $src)) {
  throw "Source C backend tidak ditemukan: $src"
}

if (-not (Get-Command gcc -ErrorAction SilentlyContinue)) {
  throw "gcc tidak ditemukan. Install MSYS2/MinGW64 lalu pastikan gcc ada di PATH."
}

if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

Write-Host "[build-tree] compiling $src"
gcc -O2 -std=c11 -shared -fPIC -o "$outDll" "$src" 2>$null
$nativeCode = $LASTEXITCODE

if ($nativeCode -ne 0 -and (Test-Path $msysBash)) {
  Write-Host "[build-tree] native gcc gagal, mencoba lewat MSYS2 bash"
  $drive = $root.Substring(0, 1).ToLower()
  $pathNoDrive = ($root.Substring(2) -replace "\\", "/")
  $rootMsys = "/$drive$pathNoDrive"
  $cmd = "cd '$rootMsys' && export PATH=/mingw64/bin:`$PATH && /mingw64/bin/gcc -O2 -std=c11 -shared -o decision_tree/build/tree_core.dll decision_tree/csrc/tree_core.c"
  & $msysBash -lc $cmd
  if ($LASTEXITCODE -ne 0) {
    throw "Build gagal: native gcc exit=$nativeCode, msys gcc exit=$LASTEXITCODE"
  }
} elseif ($nativeCode -ne 0) {
  throw "Build gagal: gcc exit code $nativeCode"
}

if (-not (Test-Path $outDll)) {
  throw "Build gagal: DLL tidak terbentuk"
}

Write-Host "[build-tree] done -> $outDll"
