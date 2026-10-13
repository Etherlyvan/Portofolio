# Konsep komik v3 — rencana Astro sebelum implementasi

Mockup: concept.png. Ini panduan visual, bukan gambar latar seluruh website. Semua teks, navigasi kategori, timeline, kartu, ikon, dan tombol dibuat dengan HTML/CSS/JS Astro. Teks serta wajah hasil mockup tetap memakai data dan foto asli dari proyek saat implementasi.

## Persona dan susunan

Software engineer Indonesia: pembangun aplikasi, budaya batik, dan rasa ingin tahu lewat perjalanan. Palet #080808, #ff002b, #f7f7f5; foto proyek dan perjalanan boleh berwarna agar tidak monoton. Judul condensed tebal; paragraf sans serif normal. Kepala dan badan mengikuti proporsi foto asli.

| Section | Layout kode | Art/aset terpisah |
| --- | --- | --- |
| About Me | Dua kolom: biodata kiri, portrait kanan; label putih miring ringan | about-person.webp + city-collage.webp, bingkai polygon CSS |
| Experience | Portrait duotone kecil kiri, timeline tiga pekerjaan kanan; tanggal sejajar | manga/manga-02.webp; kota diteruskan dari About dengan posisi latar stabil |
| Projects | Tiga kartu sama tinggi, tabs kategori, gambar 16:9; badan kartu putih | projects/*.webp + batik-workbench-cut-v1.webp pada gutter |
| Skills | Grid 5 x 3 dan panel coder kanan, filter kategori | skills/*.svg, manga/manga-03.webp + circuit-travel-cut-v1.webp |
| Gallery | Carousel lima foto terlihat desktop, satu–dua mobile | gallery/*.webp; ujung travel dari circuit-travel-cut-v1.webp |
| Let's Talk | Tautan kontak kiri, portrait landscape kanan | contact-person.webp; aksen kamera dari art travel |

## Kontrak sambungan: potongan komik tetap ada

- Satu wrapper kontinu mencakup keenam section, tanpa margin/gap vertikal antar-section. Hapus penumpukan aturan override lama saat implementasi.
- Grid konten desktop max-width 1200px, satu ukuran gutter kiri/kanan bagi semua section. Seni di gutter tidak mengubah tinggi layout.
- Setiap section memiliki satu seam SVG pada batas bawah. Seam menumpang 20–32px pada section berikutnya dengan z-index di atas art; jangan tambahkan spacer atau pembatas kedua pada batas yang sama.
- Bentuk sobekan boleh berbeda, tetapi titik masuk/keluar pada gutter kiri dan kanan mengikuti posisi art yang sama. Pakai clip-path pada layer art, bukan seluruh section yang memotong konten.
- Strip art transparan ditempatkan absolute dengan object-fit:contain, bukan diregangkan 100% tinggi. Art dapat diteruskan lintas pasangan section melalui layer wrapper agar ujungnya tidak mengambang.
- Rotasi hanya label, frame, dan catatan (sekitar 3–6 derajat). Kartu dan isi timeline tetap rapi. Aksen merah dan halftone dibuat CSS/SVG.
- Mobile: grid satu kolom, skill tiga kolom; art pinggir dikurangi opasitas dan luasnya. Teks tidak tertutup art, tidak ada scroll horizontal.

## Aset siap pakai

Folder assets berisi dua cutout baru PNG asli dan WebP dengan alpha, serta salinan portrait, thumbnail proyek, gallery, manga, dan ikon proyek yang sudah tersedia. Aset existing tidak diganti. Mockup memiliki thumbnail berwarna sebagai arah visual; thumbnail existing masih varian merah–hitam, sehingga belum identik dengan mockup. Foto perjalanan yang tersedia adalah placeholder, bukan bukti tempat yang pernah dikunjungi pengguna.

Untuk implementasi nanti: pindahkan hanya aset yang dipilih ke public/images/comic-v3, lalu daftarkan pada src/config/assets.ts. Jangan bake teks atau kartu ke bitmap. Jangan buat link CV/sosial yang belum terverifikasi.

## Verifikasi saat implementasi

Screenshot setiap seam pada 375, 768, 1440 dan 1920px. Pastikan art menyentuh seam kiri/kanan tanpa pita hitam kosong, tidak berulang sebagai wallpaper, judul/foto tidak terpotong, dan semua filter serta carousel tetap bekerja. Tinggi section mengikuti konten, bukan screenshot fixed height.

Generasi menggunakan built-in image_gen. Prompt lengkap ada di ../comic-sections-v3-prompts.json. Website belum diubah pada tahap konsep ini.
