# Experience Motion V2

## Tujuan

Membuat pilihan Experience terasa seperti pergantian chapter pada menu game Persona. Pergantian tab mengubah tiga hal secara serempak: tab aktif, isi panel tengah, dan foto karakter di kanan. Ukuran grid dan panggung foto selalu tetap sehingga section tidak bergeser.

## Pemetaan foto yang sudah tersedia

| Pilihan | Visual kanan | Aset lokal |
| --- | --- | --- |
| RAHO Premier | Foto asli bersandar di railing arena | `/images/manga/concert-panel-v2.webp` |
| Sekawan Media | Foto asli berdiri di luar stadion | `/images/manga/stadium-front-panel-v1.webp` |
| Genbatik | Foto asli berdiri dengan tangan menyilang | `/images/manga/arms-crossed-panel-v1.webp` |
| Batikpedia | Foto asli duduk di kafe tepi pantai | `/images/about-beach-v1.webp` |

Semua visual memakai foto dokumentasi asli yang sudah tersedia. Efek grayscale, contrast, halftone, aksen merah, crop, dan sobekan dibuat melalui CSS. Tidak ada wajah atau pose baru yang dibuat dengan AI. Foto Batikpedia memakai crop landscape yang berbeda agar setiap chapter memiliki identitas visual sendiri tetapi tetap berada di panggung berukuran sama.

## Urutan saat pilihan diganti

1. **Selection hit — 0–70 ms**  
   Titik timeline memancarkan spark putih. Tab baru berubah merah dan memanjang 12 px ke kanan. Tab lama kembali ke kertas krem.

2. **Slash switch — 40–220 ms**  
   Sapuan merah-putih bergerak dari pilihan aktif menuju panel tengah dan panggung foto. Isi lama tertutup. Panel kertas lama terbelah menjadi dua potongan pendek.

3. **Content replacement — 150–300 ms**  
   Judul, role, tanggal, bullet, dan tag pilihan baru diganti ketika tertutup slash. Teks baru masuk berurutan dari kiri dengan jarak 35–45 ms.

4. **Photo impact — 220–480 ms**  
   Foto lama keluar sebagai tiga potongan diagonal. Foto baru masuk dari kanan bawah, skala `0.88 → 1.04 → 1`, lengkap dengan outline putih dan impact burst. Burst berotasi sedikit sesuai chapter.

5. **Settle — 480–650 ms**  
   Semua layer kembali ke posisi dasar. Hanya burst dekoratif yang boleh bergerak halus; teks dan foto tidak terus bergoyang.

## Identitas tiap chapter

- **RAHO Premier:** star burst besar dan garis bisnis yang tegas.
- **Sekawan Media:** speed line diagonal dan aksen merah dari bomber jacket.
- **Genbatik:** node/circuit dots yang menyatu dengan motif batik geometris.
- **Batikpedia:** motif bunga batik dan circuit line di dalam bidang merah.

## Konsep struktur Astro

- Data experience mendapat properti `image`, `imageMode`, dan `theme`.
- Semua empat visual dirender absolut di dalam satu `.experience-persona__stage`; tidak ada pergantian tinggi layout.
- Visual aktif ditandai `data-active`; visual keluar mendapat `data-leaving` selama transisi.
- Tiga salinan gambar sementara memakai `clip-path` untuk efek potongan diagonal. Salinan dihapus setelah animasi selesai.
- Detail panel tetap memakai tab semantics sekarang (`role=tab`, `role=tabpanel`, arrow keys, Home, End).
- Klik cepat membatalkan animasi lama dan langsung melanjutkan ke pilihan terbaru.
- Empat gambar dimuat sejak section mendekati viewport agar tidak ada flash gambar kosong saat tab diklik.
- `prefers-reduced-motion: reduce` mengganti teks dan foto secara langsung tanpa slash atau potongan gambar.

## Responsive

- **≥ 1024 px:** menu, detail, dan visual tetap tiga kolom seperti desain sekarang.
- **768–1023 px:** menu dan detail dua kolom; visual berada di bawah dengan panggung tetap.
- **≤ 767 px:** menu horizontal-scroll atau grid 2×2, lalu detail dan visual. Pergantian foto tetap terjadi, tetapi jarak gerak dipendekkan sekitar 45%.

Storyboard: `storyboard.png`.
