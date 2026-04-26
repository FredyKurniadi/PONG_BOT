# Testing Strategy

## Web
- Framework: Vitest.
- Cakupan saat ini:
  - Validasi physics paddle (akselerasi dan deselerasi).

Jalankan:
```powershell
cd web
npm run test
```

## Python
- Framework: Pytest.
- Cakupan saat ini:
  - Validasi generator sample training menghasilkan shape dan label yang benar.

Jalankan:
```powershell
.\.venv\Scripts\python.exe -m pytest train/tests -q
```

## Smoke Test End-to-End
1. Jalankan web app dan mainkan PVP.
2. Export CSV dan pindahkan ke `datasets/raw/`.
3. Jalankan training.
4. Pastikan folder `models/bot_xxx/` berisi `model.onnx`, `model.npz`, `metrics.json`.
