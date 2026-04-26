# ONNX Guide (Numpy MLP -> Web Inference)

## Tujuan
Model MLP/FNN berbasis numpy diexport ke ONNX agar bisa dipakai di web via `onnxruntime-web`.

## Langkah Export
1. Train model dengan script `train/src/train.py`.
2. Script akan menyimpan:
   - `model.npz`
   - `model.onnx`
   - `metrics.json`
   - `config_snapshot.yaml`
3. File ONNX berada di `models/bot_xxx/model.onnx`.

## Kontrak Input (Baseline)
- Nama input: `input`
- Shape: `[batch, sequence_length, input_size]`
- Tipe: `float32`

Default config:
- `sequence_length = 1`
- `input_size = 1`

Urutan fitur per timestep:
1. `delta_y = ball_y - own_paddle_center_y`

## Kontrak Output
- Nama output: `logits`
- Shape: `[batch, num_classes]`
- Kelas: `up=0`, `down=1`, `stay=2`

## Integrasi Web (Ringkas)
1. Muat model ONNX:
```js
const ort = await import("onnxruntime-web");
const session = await ort.InferenceSession.create("/models/bot_001/model.onnx");
```
2. Bentuk tensor input sesuai kontrak shape.
3. Jalankan inferensi `session.run({ input: tensor })`.
4. Ambil argmax pada output logits untuk aksi.

## Catatan WebGPU
- Baseline memakai `onnxruntime-web` standar.
- Optimisasi dapat menambah backend WebGPU jika environment mendukung.
