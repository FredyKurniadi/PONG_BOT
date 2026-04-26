# Arsitektur Proyek

## Komponen
1. `web/src/core`: game loop dan physics.
2. `web/src/modes`: controller mode PVP/PVE/BVB.
3. `web/src/data`: recorder dan replay store.
4. `web/src/bot`: manager inferensi bot (ONNX + Decision Tree JSON) + cheat bot opsional.
5. `train/src`: pipeline data dan training model MLP/Decision Tree.

## Data Flow
1. Match dimainkan di frontend.
2. Recorder menyimpan state + action setiap frame.
3. CSV diekspor dari UI dan disimpan ke `datasets/raw/`.
4. Pipeline train membaca CSV, preprocess, build sample, dan melatih model.
5. Model versi MLP diekspor ke ONNX, model tree diekspor ke JSON.
6. Web memuat model ONNX atau JSON untuk mode bot.
