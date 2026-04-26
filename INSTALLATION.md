# Installation Guide

## Prasyarat
- Windows PowerShell
- Node.js 20.x LTS
- Python 3.11.x (`py -3.11` tersedia)
- GCC (opsional, MinGW64/MSYS2) jika ingin memakai backend C untuk MLP/Decision Tree

## Setup Otomatis (Direkomendasikan)
Dari root project:
```powershell
./scripts/setup_all.ps1
```

Jika ingin merapikan `.venv` agar hanya berisi paket yang dibutuhkan saat ini:
```powershell
./scripts/setup_all.ps1 -RecreateVenv
```

Script ini akan:
1. Install dependency web (`npm install` di `web/`).
2. Membuat virtual environment `.venv`.
3. Install package Python dari `train/requirements.txt`.
4. Mencoba build backend C MLP dan Decision Tree (jika gagal, otomatis fallback ke backend Python/numpy).

Jika perlu build manual:
```powershell
./scripts/build_mlp_backend.ps1
./scripts/build_decision_tree_backend.ps1
```

Catatan build C:
1. Script build akan mencoba `gcc` langsung dari PowerShell.
2. Jika gagal, script otomatis fallback ke MSYS2 bash (`C:\msys64\usr\bin\bash.exe`) dengan `/mingw64/bin/gcc`.

## Menjalankan Aplikasi Web
```powershell
./scripts/run_web.ps1
```

## Menyiapkan Data Training
1. Jalankan game dalam mode PVP.
2. Klik `Export Last CSV` di UI.
3. Simpan file ke folder `datasets/raw/`.

## Menjalankan Training MLP (ONNX)
Pastikan `datasets/raw/` sudah berisi CSV hasil gameplay.
```powershell
./scripts/run_train.ps1
```

Output utama:
1. `models/bot_xxx/model.npz`
2. `models/bot_xxx/model.onnx`
3. `models/bot_xxx/metrics.json`

## Menjalankan Training Decision Tree (JSON)
```powershell
./scripts/run_train_tree.ps1
```

Output utama:
1. `models/bot_xxx/model_tree.json`
2. `models/bot_xxx/metrics.json`

## Load Model di Web
1. Klik `Load Model (ONNX/Tree)`.
2. Pilih salah satu file:
	- `models/bot_xxx/model.onnx`
	- `models/bot_xxx/model_tree.json`
3. Jalankan mode `Player vs Bot` atau `Bot vs Bot`.

## Menjalankan Test
```powershell
./scripts/run_all_tests.ps1
```

## Troubleshooting Singkat
- Jika `py -3.11` tidak ditemukan: install Python 3.11 dan aktifkan launcher `py`.
- Jika `npm` tidak ditemukan: install Node.js LTS.
- Jika model bot belum ada: mode `PVE/BVB` akan ditolak sampai model tersedia atau cheat bot diaktifkan pada config.
