# /specialperson — Secret Chapter

Route `/specialperson` menampilkan halaman mandiri berbahasa Indonesia dan tidak dicantumkan di menu utama portfolio. Metadata `noindex, nofollow` mencegah pengindeksan normal, tetapi tidak melindungi URL dari orang yang membukanya langsung.

Source utama berada di `src/pages/specialperson.astro`, `src/styles/special-person.css`, dan `src/scripts/special-person.ts`. Copy pesan dapat diedit di `src/data/special-person.ts`.

Amplop HTML/CSS menganimasikan seal → flap → surat → pesan → catatan → signature. Pembukaan berlangsung sekitar 1,8 detik. Tombol “Baca lagi” memutar ulang animasi. Halaman hanya mempunyai satu pesan yang fokus untuk orang spesial. “Simpan momen” mengunduh pesan tersebut sebagai kartu PNG. Seal dapat dibuka dengan keyboard.

Layout mobile tersusun vertikal dan bergerak menuju surat saat dibuka. Tinggi mengikuti isi. Reduced motion melewati animasi. Tanpa JavaScript, surat tetap terlihat. Skip link dapat membuka dan menuju langsung ke pesan.

Verifikasi mencakup Astro check/build; buka, putar ulang, unduh PNG, tanpa horizontal overflow, dan tidak adanya mode Sahabat pada 320/375/768/1440px; serta reduced-motion dan fallback tanpa JavaScript. Screenshot berada di `closed-*.png` dan `open-*.png`; contoh kartu unduhan berada di `card-special-*.png`.
