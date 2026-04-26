# FAQ

## Kenapa data disimpan per frame, bukan per event?
Karena target model adalah time series. Data per frame menjaga urutan temporal secara konsisten.

## Apakah semua kolom dipakai untuk training?
Tidak. Sebagian kolom dipakai sebagai metadata (`match_id`, `mode`, dll), bukan feature model.

## Kenapa label hanya `up/down/stay`?
Agar model klasifikasi sederhana dulu. Mekanik acceleration/deceleration ditangani physics engine, bukan label tambahan.

## Kenapa ada CSV dan Parquet?
CSV mudah debug/manual check, Parquet efisien untuk training pipeline.

## Apakah proyek ini memakai reinforcement learning (RL)?
Tidak. Proyek ini final di pendekatan supervised dengan rule-based label untuk model MLP/ONNX dan Decision Tree.
