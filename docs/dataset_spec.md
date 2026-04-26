# Dataset Specification

## Format
- Raw dataset: CSV (`datasets/raw`).
- Processed dataset: Parquet (`datasets/processed`).

## Kolom Frame-Level
- `match_id`
- `frame_idx`
- `timestamp_ms`
- `mode`
- `player_left_id`
- `player_right_id`
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

## Catatan Training
- Kolom metadata (`match_id`, `mode`, `frame_idx`) tidak wajib menjadi feature model.
- Label training final dihasilkan rule-based dari `delta_y` (bukan langsung label aksi replay).
- Fitur default: `delta_y = ball_y - own_paddle_center_y`.
- Setiap replay dipakai dua perspektif (kiri dan kanan) untuk membangun data training.
