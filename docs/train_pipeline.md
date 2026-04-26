# PONG Training Pipeline (Train-Only)

Dokumen ini menjelaskan pipeline **training saja** untuk proyek PONG, tanpa membahas runtime inference di web.

## 1. Entry Point Training

Jalur eksekusi utama:
1. `scripts/run_train.ps1` (MLP, default)
2. `train/src/train.py`

Alternatif model pohon keputusan:
1. `scripts/run_train_tree.ps1`
2. `train/src/train_decision_tree.py`

## 2. Tujuan Training

Target aksi paddle diklasifikasikan ke 3 kelas:
- `up`
- `down`
- `stay`

Fokus objektif training adalah **meminimalkan jarak vertikal paddle ke bola** (`delta_y`), bukan objective menang/kalah skor.

## 3. Konfigurasi Utama

Sumber konfigurasi:
- `train/configs/train.yaml`
- `train/configs/model_mlp.yaml`

Default penting:
- `seed: 42`
- `raw_data_glob: datasets/raw/*.csv`
- `processed_output: datasets/processed/train_dataset.parquet`
- `sequence_length: 1`
- `batch_size: 128`
- `epochs: 20`
- `learning_rate: 0.001`
- `weight_decay: 0.0001`
- `val_size: 0.2`
- `feature_columns: [delta_y]`
- `input_size: 1`
- `hidden_sizes: [256, 128]`
- `dropout: 0.2`
- `num_classes: 3`

## 4. Kontrak Data Input (Raw CSV)

File CSV yang di-load dari `datasets/raw/*.csv` harus menyediakan kolom minimal:
- `match_id`
- `frame_idx`
- `left_paddle_y`
- `right_paddle_y`
- `ball_x`
- `ball_y`
- `ball_vx`
- `ball_vy`
- `label_action_left`
- `label_action_right`
- `score_left`
- `score_right`

Tahap preprocess melakukan:
1. Normalisasi tipe data (`match_id`, `frame_idx`, label aksi).
2. Sort per `match_id` dan `frame_idx`.
3. Drop baris invalid/null untuk kolom penting.
4. Simpan hasil preprocess ke Parquet (`datasets/processed/train_dataset.parquet`).

## 5. Feature Engineering, Label, dan Objective Weight

### 5.1 Perspektif Sisi
Setiap match diproses 2 kali:
1. Perspektif paddle kiri.
2. Perspektif paddle kanan.

Untuk setiap perspektif:
- `own_paddle_center_y = own_paddle_y + paddle_height / 2`
- `delta_y = ball_y - own_paddle_center_y`

Dengan default:
- `paddle_height = 96.0`

### 5.2 Rule-Based Label
Label tidak diambil dari aksi pemain replay, tapi dari rule pada `delta_y`:
- jika `delta_y < -label_deadzone` -> `up`
- jika `delta_y > label_deadzone` -> `down`
- selain itu -> `stay`

Default:
- `label_deadzone = 6.0`

### 5.3 Sample Weight (Distance-Oriented)
Setiap sampel diberi bobot berdasar kedekatan paddle terhadap bola:

$$
\text{closeness} = \frac{1}{1 + \frac{|\Delta y|}{\text{distance\_scale}}}
$$

$$
w = \text{min\_weight} + (\text{max\_weight} - \text{min\_weight}) \cdot \text{closeness}
$$

Default:
- `distance_scale = 120.0`
- `min_weight = 0.2`
- `max_weight = 3.0`

Interpretasi:
- makin dekat (`|delta_y|` kecil) -> bobot makin besar,
- makin jauh (`|delta_y|` besar) -> bobot makin kecil.

## 6. Bentuk Input Tensor (Input Size)

Dari konfigurasi default:
- `input_size = 1` (hanya fitur `delta_y`)
- `sequence_length = 1`

Bentuk tensor:
- sebelum flatten (untuk model): `x.shape = [batch, sequence_length, input_size] = [B, 1, 1]`
- setelah flatten internal MLP: `[B, sequence_length * input_size] = [B, 1]`

Label:
- `y.shape = [B]` dengan indeks kelas (`up:0`, `down:1`, `stay:2`).

Sample weight:
- `w.shape = [B]`.

## 7. Sequence Building

Pipeline sequence:
1. Kelompokkan data per `match_id`.
2. Urutkan frame berdasarkan `frame_idx`.
3. Bentuk window sepanjang `sequence_length`.
4. Gunakan frame setelah window sebagai target label (next-step target).
5. Simpan metadata training:
   - `num_samples`
   - `num_candidates`
   - `label_counts`
   - `mean_weight`
   - `min_weight`
   - `max_weight`

Jika tidak ada sequence valid, training dihentikan dengan error.

## 8. Train/Validation Split

Split dilakukan dengan strategi group-aware menggunakan `match_id:side`:
1. Pilih grup untuk validation sampai mendekati target `val_size`.
2. Jika split group-aware gagal (misalnya grup terlalu sedikit), fallback ke split acak.
3. Dijaga agar train dan validation sama-sama tidak kosong.

Default:
- `val_size = 0.2`

## 9. Arsitektur Model MLP (Default)

Model default (`model_type: mlp`):
1. Input flatten: `1`
2. Dense 1: `1 -> 256` + ReLU + dropout
3. Dense 2: `256 -> 128` + ReLU + dropout
4. Output: `128 -> 3` (logits)

Catatan backend:
- Jika backend C tersedia, dipakai melalui wrapper.
- Jika tidak, fallback ke implementasi NumPy.

## 10. Objective/Loss dan Update Parameter (MLP)

### 10.1 Weighted Cross-Entropy
Untuk batch berukuran $N$:
- hitung logits,
- softmax untuk probabilitas,
- sample weight dinormalisasi terhadap rata-ratanya,
- loss batch:

$$
L = \frac{1}{N} \sum_{i=1}^{N} \left( w_i \cdot -\log p(y_i|x_i) \right)
$$

### 10.2 Regularization
`weight_decay` diterapkan pada gradien bobot (setara efek L2 regularization pada update parameter).

### 10.3 Optimisasi
Update dilakukan per mini-batch dengan backprop manual NumPy:
- grad logits: `softmax - one_hot`
- dikalikan sample weight ter-normalisasi
- backward ke semua layer
- update bobot dan bias dengan `learning_rate`

## 11. Loop Training

Untuk setiap epoch:
1. Acak indeks train (`np.random.permutation`).
2. Iterasi mini-batch (`batch_size`).
3. Hitung dan akumulasi loss per batch.
4. Cetak log `epoch=k/epochs loss=...`.

Default:
- `epochs = 20`
- `batch_size = 128`
- `learning_rate = 0.001`
- `weight_decay = 0.0001`

## 12. Evaluasi Validation

Setelah training:
1. Forward pada validation set.
2. Prediksi kelas via `argmax(logits)`.
3. Hitung metrik:
   - `accuracy`
   - `macro_f1`
   - `confusion_matrix`
4. Tambahkan metadata:
   - `training_focus = defense_distance_minimization`
   - `sequence_metadata`
   - info backend (`mlp_backend` atau `tree_backend`)

## 13. Artefak Output Training

Output disimpan versioned di:
- `models/bot_001`, `models/bot_002`, dst.

Untuk MLP (`train.py`):
- `model.npz`
- `model.onnx`
- `metrics.json`
- `config_snapshot.yaml`

Untuk Decision Tree (`train_decision_tree.py`):
- `model_tree.json`
- `metrics.json`
- `config_snapshot.yaml`

## 14. Catatan Decision Tree (Alternatif Train)

Jika menjalankan `run_train_tree.ps1`:
1. Input sequence di-flatten menjadi vektor 2D.
2. Training menggunakan weighted decision tree classifier.
3. Objective split menggunakan weighted Gini loss.
4. Hyperparameter tree default:
   - `max_depth: 8`
   - `min_samples_leaf: 20`
   - `min_samples_split: 40`

## 15. Kegagalan Umum Saat Training

Training akan gagal jika:
1. `datasets/raw` kosong atau glob tidak menemukan CSV.
2. Kolom wajib CSV tidak lengkap.
3. Data terlalu sedikit untuk split train/validation.
4. Sequence valid tidak terbentuk (setelah rule/filter/objective).

## 16. Reproducibility

Seed global dari config (`seed`) dipakai untuk:
- Python random,
- NumPy random,
- urutan split,
- inisialisasi model.

Dengan data dan config yang sama, hasil training cenderung stabil antar-run.