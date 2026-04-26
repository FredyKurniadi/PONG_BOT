# Quick Start

Panduan ini untuk mencoba proyek secepat mungkin di Windows PowerShell.

## 1. Setup sekali saja
Dari folder root proyek:

```powershell
./scripts/setup_all.ps1
```

## 2. Jalankan game web

```powershell
./scripts/run_web.ps1
```

Lalu buka alamat lokal Vite yang muncul di terminal (default: http://localhost:5173).

## 3. Coba gameplay awal (PVP)
Di halaman game:
- Klik Start PVP.
- Kontrol:
  - Player 1: W / S
  - Player 2: Arrow Up / Arrow Down
- Main sampai match selesai atau klik Stop Match.

## 4. Simpan data match
Di halaman game:
- Klik Export Last CSV.
- Simpan file CSV ke folder:
  - datasets/raw

Catatan:
- Nama file bebas, tetapi disarankan format seperti: player1_vs_player2_v001.csv

## 5. Training model (MLP) + export ONNX
Kembali ke PowerShell root proyek:

```powershell
./scripts/run_train.ps1
```

Saat script berjalan, Anda akan diminta memilih data replay CSV yang ingin dipakai training:
- `0` untuk semua file di `datasets/raw/*.csv`
- `1..N` untuk satu file spesifik

Jika sukses, model baru muncul di folder:
- models/bot_xxx

Isi penting folder model:
- model.onnx
- model.npz
- metrics.json
- config_snapshot.yaml

Alternatif training Decision Tree:

```powershell
./scripts/run_train_tree.ps1
```

Isi tambahan untuk model tree:
- model_tree.json

## 6. Coba mode bot
Di web game:
- Klik Load Model (ONNX/Tree).
- Pilih file model:
  - models/bot_xxx/model.onnx
  - models/bot_xxx/model_tree.json
- Klik Start Player vs Bot atau Start Bot vs Bot.

Catatan:
- ONNX runtime web menggunakan backend WASM. Pastikan koneksi internet aktif saat inisialisasi pertama agar asset backend dapat diambil dengan benar.

## 7. Coba replay
- Klik Replay Last Match untuk replay terakhir.
- Atau pilih replay di dropdown lalu klik Replay Selected.

## 8. Jalankan semua test

```powershell
./scripts/run_all_tests.ps1
```

## Troubleshooting cepat
- Jika mode bot ditolak, pastikan model ONNX atau model Tree JSON sudah di-load.
- Jika training gagal karena data kosong, pastikan datasets/raw berisi CSV hasil gameplay.
- Jika setup Python bermasalah, pastikan Python 3.11 terpasang.
- Jika build backend C gagal, training tetap jalan dengan fallback Python/numpy.
