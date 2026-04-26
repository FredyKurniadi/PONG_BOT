# Aturan Game

## Kontrol
- Player 1: `W` dan `S`
- Player 2: `ArrowUp` dan `ArrowDown`

## Paddle Motion
- Paddle memiliki velocity vertikal.
- Input searah berulang menambah kecepatan hingga batas maksimum.
- Input berlawanan memberi perlambatan lebih besar sebelum berbalik arah.
- `stay` memberi perlambatan bertahap ke nol.

## Ball Motion
- Bola memantul pada dinding atas/bawah.
- Pantulan pada paddle memakai offset titik tabrak terhadap pusat paddle.
- Kecepatan bola meningkat setiap collision paddle sampai nilai maksimum.

## Scoring
- Bola keluar sisi kiri: skor kanan bertambah.
- Bola keluar sisi kanan: skor kiri bertambah.
- Match selesai jika salah satu pemain mencapai score limit (`5`).
