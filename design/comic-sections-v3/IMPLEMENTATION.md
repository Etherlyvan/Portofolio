# Implementasi Astro comic v3

Keenam section sekarang berada dalam satu portfolio-chapters. ComicSeam.astro menggambar sobekan SVG secara absolute sehingga tidak menambah spacer. chapter-continuity.css menjadi aturan bersama grid, art, frame dan responsive layout. About/Experience memakai seam internal; Projects/Skills/Gallery/Contact masing-masing memakai satu wrapper chapter.

Art transparan disimpan di public/images/comic-v3: batik-workbench-cut-v1.webp dan circuit-travel-cut-v1.webp. Thumbnail berwarna project-batikpedia.webp, project-genbatik.webp, project-raho.webp serta gallery-01.webp sampai gallery-05.webp dibuat dengan built-in image_gen; prompt dan sumber tercatat di ../comic-v3-color-assets.json. Semuanya ilustrasi placeholder, bukan screenshot aplikasi aktual atau bukti perjalanan pribadi. Versi lama tetap tersedia. Path aktif terpusat di src/config/assets.ts.

Judul, biodata, timeline, kartu, tabs, skill grid, caption, tombol dan kontak adalah HTML/CSS Astro; mockup bukan latar bitmap. Foto wajah existing dipertahankan. Lebar konten utama 1200px pada desktop besar, grid mobile satu kolom dan skill tiga kolom. Gallery menampilkan lima foto desktop lalu scroll ke foto keenam.

Validasi: npm run check (0 error/warning), npm run build; screenshot dan ukuran seam pada 375/768/1440/1920px; filter Projects/Skills; tidak ada horizontal overflow. Screenshot di .verification/comic-v3-*.png. Preview lokal port 4325.
