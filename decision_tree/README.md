# Decision Tree Backend (C + Python Fallback)

Folder ini berisi implementasi Decision Tree dengan backend C (ctypes) dan fallback Python murni.

## Tujuan
1. Tetap membaca konfigurasi YAML seperti pipeline yang sudah ada.
2. Mengubah training tree di [train/src/train_decision_tree.py](train/src/train_decision_tree.py) agar tanpa dependensi machine learning eksternal.
3. Menjaga alur output tetap kompatibel untuk web (`model_tree.json`).

## Komponen Program
1. Class tree C backend + fallback:
- [HybridDecisionTreeClassifier](decision_tree/c_tree.py)
- [CDecisionTreeClassifier](decision_tree/c_tree.py)
- [PureDecisionTreeClassifier](decision_tree/pure_tree.py)

2. Function loss:
- [weighted_gini_loss](decision_tree/pure_tree.py)

3. Class struktur data (linked list) yang berisi class node:
- [NodeLinkedList](decision_tree/pure_tree.py)
- [TreeNode](decision_tree/pure_tree.py)

## Ringkasan Cara Kerja
1. Data training masuk sebagai matriks `x` dan label `y`.
2. Tree mencari split terbaik per node dengan evaluasi `weighted_gini_loss`.
3. Proses rekursif berhenti berdasarkan `max_depth`, `min_samples_split`, dan `min_samples_leaf`.
4. Setelah fit, struktur tree dikonversi ke format array (`children_left`, `children_right`, `feature`, `threshold`, `value`) agar bisa dieksekusi evaluator web.

## Integrasi ke Training
File [train/src/train_decision_tree.py](train/src/train_decision_tree.py) sekarang:
1. Membaca `train.yaml` dan `model_mlp.yaml` seperti biasa.
2. Menjalankan fit memakai `HybridDecisionTreeClassifier`.
3. Menyimpan output `model_tree.json`, `metrics.json`, `config_snapshot.yaml`.

## Build Backend C
Gunakan command berikut:

```powershell
./scripts/build_decision_tree_backend.ps1
```

Catatan:
1. Script mencoba `gcc` langsung dari PowerShell.
2. Jika gagal, script otomatis fallback ke MSYS2 bash.

Output DLL:
1. [decision_tree/build/tree_core.dll](decision_tree/build/tree_core.dll)

Jika DLL tidak tersedia, training otomatis fallback ke backend Python.

## Cek GCC
```powershell
gcc --version
Get-Command gcc | Format-List *
```

## Menjalankan
```powershell
./scripts/run_train_tree.ps1
```
