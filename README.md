# Pong AI Portfolio Project

Proyek ini adalah implementasi end-to-end game Pong berbasis web yang menghasilkan dataset per frame untuk melatih bot aksi paddle (`up/down/stay`).

Pipeline yang digunakan saat ini:
1. Supervised training berbasis rule label dari `delta_y`.
2. Model MLP dengan backend C (ctypes, opsional) dan fallback numpy, lalu diexport ke ONNX untuk web.
3. Alternatif model Decision Tree dengan backend C (opsional) dan fallback Python, diexport ke JSON untuk web.

## Fitur Utama
- Mode `Player vs Player` (W/S vs Arrow Up/Down).
- Mode `Player vs Bot` dan `Bot vs Bot` aktif jika bot tersedia.
- Perekaman data per frame untuk dataset training.
- Replay match untuk debug/tracing.
- Pipeline training MLP (ONNX) dan Decision Tree (JSON).
- Script PowerShell untuk setup, run, dan test.

## Struktur Inti
- `web/`: game frontend (Vite + Vanilla JS).
- `train/`: pipeline preprocessing, training, evaluasi, export model.
- `datasets/`: data raw CSV dan processed parquet.
- `models/`: output bot versioned (`bot_001`, dst).
- `docs/`: dokumentasi teknis.
- `scripts/`: script otomatisasi `.ps1`.

## Quick Start
1. Jalankan setup:
```powershell
./scripts/setup_all.ps1
```
2. Jalankan web game:
```powershell
./scripts/run_web.ps1
```
3. Mainkan PVP untuk kumpulkan data, lalu export CSV dari UI ke `datasets/raw/`.
4. Jalankan training:
```powershell
./scripts/run_train.ps1
```
Script akan meminta Anda memilih data replay CSV yang dipakai untuk training.
Alternatif Decision Tree:
```powershell
./scripts/run_train_tree.ps1
```
5. Di UI web, klik `Load Model (ONNX/Tree)` dan pilih salah satu:
	- `models/bot_xxx/model.onnx`
	- `models/bot_xxx/model_tree.json`
6. Jalankan mode `Player vs Bot` atau `Bot vs Bot`.
7. Jalankan semua tes:
```powershell
./scripts/run_all_tests.ps1
```

## Catatan Integrasi Bot
- Runtime bot di web mendukung dua format:
	- ONNX (`model.onnx`)
	- Decision Tree JSON (`model_tree.json`)
- Model output disimpan di `models/bot_xxx/`.
- Kontrak input/output dibahas di `docs/onnx_guide.md` dan `docs/training_spec.md`.
