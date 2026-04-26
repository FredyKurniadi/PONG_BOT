# Training Specification

## Task
Prediksi aksi paddle (`up`, `down`, `stay`) dengan objective utama meminimalkan jarak vertikal paddle dengan bola.

## Input Sequence
- Panjang sequence default: `1` frame.
- Fitur default:
  - `delta_y = ball_y - own_paddle_center_y`

Catatan:
- Posisi paddle lawan tidak dipakai pada fase ini.
- Target tetap 3 kelas: `up/down/stay`.

## Label Rule (Auto-generated)
Label tidak lagi mengikuti aksi manusia replay, tetapi dibuat otomatis dari aturan:
1. Jika `delta_y < -deadzone` -> `up`
2. Jika `delta_y > deadzone` -> `down`
3. Selain itu -> `stay`

## Data Augmentation Perspektif Ganda
Setiap replay diproses menjadi dua perspektif:
1. Perspektif model sebagai player kiri.
2. Perspektif model sebagai player kanan.

Dengan ini satu replay menghasilkan dua trajectory training.

## Objective Weighting (Closeness-based)
Training memakai weighted supervised loss:

`L = mean(w_t * CE(logits_t, y_t))`

Bobot `w_t` dihitung dari besar kecilnya `|delta_y|`:
1. Semakin dekat vertikal paddle ke bola (|delta_y| kecil), bobot semakin besar.
2. Semakin jauh vertikal paddle ke bola (|delta_y| besar), bobot semakin kecil.

Objective ini murni distance-minimization oriented, bukan win/lose oriented.

## Pipeline
1. Load CSV raw dari `datasets/raw`.
2. Preprocess kolom, sorting, pembersihan data null.
3. Bangun dataset perspektif kiri dan kanan dari setiap replay.
4. Generate label rule-based dari `delta_y`.
5. Hitung sample weight berbasis kedekatan `delta_y`.
6. Build sequence per perspektif match.
7. Split train/validation (group-aware; fallback acak jika group tunggal).
8. Train MLP/FNN (numpy) dengan weighted cross-entropy.
9. Evaluasi metrik.
10. Simpan `model.npz`, `model.onnx`, `metrics.json`, `config_snapshot.yaml`.

## Metadata Training
Metadata sequence yang dicatat:
1. `num_candidates` (sebelum filter)
2. distribusi label rule (`label_counts`)
3. statistik bobot training (`mean/min/max`)

## Output Model
Disimpan di folder versioned:
- `models/bot_001/`
- `models/bot_002/`
- dst.

Isi folder output dapat berisi:
1. `model.npz` dan `model.onnx` (hasil training MLP).
2. `model_tree.json` (hasil training Decision Tree).
