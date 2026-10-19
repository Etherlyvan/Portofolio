# Secret chapter — /specialperson

Halaman pesan rahasia memakai gaya komik merah, hitam, dan putih yang menyatu dengan portfolio. Rasa personal berasal dari pesan singkat, amplop interaktif, dan signature Jovan. Halaman berfokus pada satu pesan untuk orang spesial dan belum memakai nama penerima.

## Alur

1. Saat masuk, judul “BUAT KAMU.” dan amplop tertutup tampil lebih dahulu.
2. Label “Untuk orang spesial” memperjelas tujuan halaman tanpa pilihan mode tambahan.
3. Tombol “Buka pesan” menjalankan reveal dan berubah menjadi “Baca lagi” setelah selesai.
4. Pesan utama: “Nggak perlu jadi hari istimewa untuk bilang: aku senang kamu ada.”
5. Catatan: “Terima kasih sudah menemani banyak cerita kecil.”
6. Signature “— Jovan”. “Simpan momen” mengunduh kartu PNG berisi pesan yang sama.

## Animasi dan struktur Astro

- Halaman menggunakan layout khusus agar tidak membawa seluruh navigation/footer portfolio.
- Amplop, flap, surat, burst, dan bintang dibangun dengan HTML/CSS. Teks tetap berupa HTML asli.
- Sapuan diagonal membuka halaman, lalu judul masuk secara stagger. Klik amplop memutar flap, menaikkan surat, dan menampilkan pesan bertahap.
- Gerak singkat berhenti setelah surat terbuka. Reduced motion langsung menampilkan state akhir.
- Mobile tersusun judul → label penerima → amplop/surat → tombol. Tinggi halaman otomatis agar isi tidak terpotong.
- Tanpa JavaScript, pesan default tetap terbaca.
- Route tidak muncul di menu utama dan menggunakan meta `noindex`.
- Pesan disimpan dalam file data lokal tanpa backend, akun, form, atau audio autoplay.
