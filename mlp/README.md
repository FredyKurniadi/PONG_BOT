# MLP C Backend Guide

Folder ini berisi implementasi MLP berbasis C yang dipanggil dari Python melalui ctypes.

Tujuan utama:
1. Core training MLP dijalankan di C (forward, backward, update SGD).
2. Alur program utama tetap kompatibel dengan [train/src/train.py](train/src/train.py).
3. Output tetap sama: model.npz dan model.onnx.

## Struktur Folder
1. [mlp/csrc/mlp_core.c](mlp/csrc/mlp_core.c): implementasi C backend.
2. [mlp/numpy_mlp.py](mlp/numpy_mlp.py): wrapper Python ctypes.
3. [mlp/build](mlp/build): output hasil kompilasi DLL.

## Build Backend C
Command yang digunakan:

```powershell
./scripts/build_mlp_backend.ps1
```

Script build berada di [scripts/build_mlp_backend.ps1](scripts/build_mlp_backend.ps1).

Catatan:
1. Script mencoba `gcc` langsung dari PowerShell.
2. Jika gagal, script otomatis fallback ke MSYS2 bash.

Output yang diharapkan:
1. [mlp/build/mlp_core.dll](mlp/build/mlp_core.dll)

## Cara Cek GCC
Command cek versi:

```powershell
gcc --version
```

Command cek lokasi executable:

```powershell
Get-Command gcc | Format-List *
```

## Status Toolchain di Laptop Anda (hasil pengecekan saat ini)
1. GCC tersedia.
2. Versi: gcc.exe (Rev13, Built by MSYS2 project) 15.2.0
3. Path: C:/msys64/mingw64/bin/gcc.exe
4. MSVC cl tidak tersedia di PATH.

## Setup yang Direkomendasikan
1. Jalankan setup proyek seperti biasa:

```powershell
./scripts/setup_all.ps1
```

2. Script setup sekarang juga otomatis build backend C untuk MLP.

## Cara Menjalankan Training Setelah Build

```powershell
./scripts/run_train.ps1
```

Atau langsung:

```powershell
.\.venv\Scripts\python.exe train/src/train.py --train-config train/configs/train.yaml --model-config train/configs/model_mlp.yaml --raw-data-glob "datasets/raw/*.csv"
```

## Kontrak API Python yang Dipertahankan
Class [NumpyMLPClassifier](mlp/numpy_mlp.py) tetap menyediakan method berikut sehingga [train/src/train.py](train/src/train.py) tidak perlu dirombak besar:
1. train_batch
2. forward
3. predict
4. save_npz
5. sync_parameters

## Troubleshooting
1. Jika muncul error C backend tidak ditemukan, jalankan ulang [scripts/build_mlp_backend.ps1](scripts/build_mlp_backend.ps1).
2. Jika gcc tidak ditemukan, pastikan folder MinGW64 ada di PATH Windows.
3. Jika compile gagal, cek apakah file [mlp/csrc/mlp_core.c](mlp/csrc/mlp_core.c) bisa diakses dan tidak sedang terkunci proses lain.
