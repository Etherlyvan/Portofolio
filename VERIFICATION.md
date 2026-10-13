# Verification

## Hero redesign — 8 October 2026

Implemented the approved hero concept as static Astro markup with a dedicated `hero.css` stylesheet. Includes staggered paper name labels, contour-following SVG portrait outline, red manga backdrop, monochrome edge collages, an inline SVG cityscape, location stickers, and a diagonal torn-paper divider. Existing configured image paths remain replaceable. No client JavaScript or production dependencies were added.

Responsive browser checks at 320, 375, 600, 768, 1024, 1440, and 1920 pixels passed: heading stays in the viewport, no horizontal page overflow, both hero calls to action are clickable and navigate to their respective sections, mobile menu still works, and no console errors were reported. Screenshots and results are in `.verification/hero-*.png` and `.verification/hero-results.json`.

## Image placeholder update — 8 October 2026

All 17 image locations now use generated local WebP illustrations. The hero has a preserved alpha channel. Total image size is 1,692,102 bytes; below-hero content remains lazy-loaded. Browser checks at 320, 375, 768, and 1440 pixels verified 17 rendered images, no SVG image fallback, no horizontal overflow, and no console errors. All 17 image URLs returned HTTP 200 with `image/webp` content type. Astro type checks and static/Docker builds passed. The downloadable image bundle is `placeholder-images.zip`; full prompts and dimensions are in `PLACEHOLDER_ASSETS.json`.

The Lighthouse scores below refer to the original SVG-placeholder version, before this image update; no fresh Lighthouse score is claimed for this update.

## Original verification

Verified on 6 October 2026 with Astro 7.3.5 and installed Chrome.

- Astro type check: 30 files, zero errors, warnings, or hints.
- Production static build: home, blog landing, and 404 routes.
- Browser widths: 320, 375, 768, 1024, and 1440 pixels. No horizontal page overflow.
- Project filters: AI displays Genbatik; reset displays all three projects.
- Skill filters: Tools displays Docker and Git; All restores all 15 skills.
- Gallery: pagination selects the last image and returns to the first correctly.
- Mobile menu: opens and closes with Escape. Desktop hides the toggle.
- JavaScript disabled: navigation, all projects, all skills, and blog remain available.
- Console errors: none during automated browser verification.
- Lighthouse mobile audit against production static preview: Performance 99, Accessibility 100, Best Practices 100, SEO 100. Scores vary with browser, machine, final images, and hosting.
- Multi-stage Docker build succeeded. Compose starts the container; Nginx configuration check succeeds. The final image has no Node executable or `/app` source directory.

The default Compose port is 8080. Another application already occupied it on this machine, so the verification container uses 8088. Its site is available at http://localhost:8088.

Photos and manga are intentionally placeholders, as requested. CV and social profile destinations were not supplied and remain explicitly unavailable. Set the deployment `SITE_URL` before building for public canonical metadata.

Raw audit output and screenshots are in the ignored `.verification/` directory. Browser verification tools were temporary and are not declared project dependencies.

## Pembaruan wajah Jovan — 8 Oktober 2026
Delapan gambar karakter diperbarui menggunakan built-in imagegen berdasarkan foto pengguna. Hero mempertahankan alpha transparan; semua aset dioptimalkan ke WebP. Prompt dan metadata tercatat di PLACEHOLDER_ASSETS.json.
Validasi berhasil: Astro check (0 error/warning), static build, Docker rebuild, serta browser pada lebar 320–1920 px di localhost:8088. Tidak ada overflow horizontal atau console error; tombol hero dapat diklik.

Pembaruan variasi wajah: delapan aset dibuat ulang berdasarkan dua foto tambahan (profil kiri dan pandangan ke atas), dengan variasi sudut kamera, ekspresi, dan arah mata. Prompt terbaru tersimpan di PLACEHOLDER_ASSETS.json.

Koreksi kemiripan: hanya hero-person.webp dan about-person.webp dibuat ulang dari foto frontal berlatar hijau. Ekspresi netral dan proporsi wajah mengikuti foto asli; pakaian bomber dan blazer dipertahankan.

## Implementasi konsep About dan Experience
Panel About memakai layout dua kolom, portrait kertas miring, kolase tepi, dan quote. Experience memakai portrait duotone merah dan timeline tiga pengalaman dengan tanggal di kanan. Astro check dan Docker static build berhasil tanpa error/warning. Browser localhost:8088 diperiksa pada 320,375,768,1024,1440,1920px: semua gambar decoded, tidak ada overflow horizontal atau pageerror. CV tetap tersedia berdasarkan permintaan karena file CV belum diberikan.

## Konsep v2 diterapkan
AboutExperience.astro menggantikan dua panel terpisah. Desktop menggunakan artwork konsep yang dibersihkan dari body text dan dikompres WebP; judul serta quote dekoratif berada di artwork dengan padanan accessible HTML. Teks utama, kontak, CV, dan pengalaman adalah HTML terpisah dengan koordinat proporsional. Mobile menggunakan susunan vertikal. Docker check/build berhasil tanpa error/warning; 320,375,768,1024,1487,1920px lulus overflow, tiga pengalaman, tautan email, image decode, dan pageerror checks. Screenshot desktop diperiksa berdampingan dengan konsep. CV belum tersedia sebagai unduhan.

## Implementasi dominan HTML/CSS
Gambar konsep utuh tidak lagi dipakai di layout. AboutExperience memakai CSS grid mengikuti tinggi konten, heading HTML, detail kontak HTML, quote/bingkai CSS, timeline CSS dan SVG torn dividers. Hanya portrait dan city-collage.webp menjadi gambar. Pemeriksaan enam lebar layar berhasil; jarak Hero ke About dan Experience ke Projects tidak memiliki celah positif (>1px). Posisi quote mobile diberi ruang terpisah agar tidak menutup bullet. Docker check/build berhasil tanpa error/warning.

## Projects dan Skills Astro — 9 Oktober 2026
Komponen Projects/Skills diperbarui dengan CSS grid, kartu seragam, tags teknologi, filter, kolase tepi dan panel manga. SkillIcon.astro menggunakan 15 SVG lokal Simple Icons (lisensi dan sumber di public/images/skills). Build/check Docker berhasil tanpa error/warning. Semua kategori proyek dan skill, reset proyek, enam lebar 320–1920px, dan konten tanpa JavaScript berhasil diverifikasi. Tidak ada overflow horizontal/pageerror.
