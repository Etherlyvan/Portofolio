# Replace the portfolio’s images

## Cara paling mudah: timpa file gambar

Website sekarang memakai 17 **file WebP lokal** di `public/images/`. Semua gambar awal adalah ilustrasi AI fiktif/konseptual yang dibuat menggunakan built-in imagegen, bukan foto pribadi atau screenshot proyek asli.

Untuk mengganti dengan foto kamu:

1. Siapkan gambar dengan rasio sesuai tabel di bawah.
2. Ekspor sebagai WebP, lalu timpa file di `public/images/` memakai **nama yang sama**.
3. Saat `npm run dev` berjalan, refresh browser. Untuk Docker, jalankan ulang `docker compose up --build -d`.

Tidak perlu mengubah `assets.ts` atau komponen layout jika nama/path tetap sama. Jika menggunakan nama lain atau PNG/JPG, cukup ubah path di `src/config/assets.ts`. Mengubah ekstensi file menjadi `.webp` saja tidak mengonversi format; gunakan aplikasi editor atau konverter gambar.

Contoh: timpa `public/images/about-person.webp` dengan foto formalmu. Untuk hero, gunakan WebP/PNG transparan agar efek cutout tetap rapi. Kamu juga bisa memakai gambar unduhan yang izin penggunaannya sesuai kebutuhan; simpan lokal dengan nama yang cocok.

Paket seluruh gambar tersedia di `placeholder-images.zip` dalam folder proyek. Daftar ukuran, asal gambar, dan prompt lengkap terdapat di `PLACEHOLDER_ASSETS.json`.

## Panduan ukuran dan path

Every image location uses `PortfolioImage.astro`: a null path produces a comic SVG placeholder; a local path produces an actual image. The supplied reference is a composition guide and is not embedded into the site.

1. Put your image in `public/images/` (create the directories if needed), replacing the existing WebP when keeping its name.
2. If using a different name, change its value in `src/config/assets.ts` to a root-relative path such as `/images/hero-person.webp`. Keep `null` available as a fallback to the SVG placeholder.
3. Rebuild or let the development server refresh. Layout components do not need edits.

| Placement | Asset key | Recommended file | Aspect ratio |
| --- | --- | --- | --- |
| Hero portrait | `assets.hero.person` | `hero-person.webp`, transparent WebP or PNG | 3:4 |
| Hero background manga | `assets.hero.manga` | `hero-manga.webp` or transparent PNG | 3:4 |
| About portrait | `assets.about.person` | `about-person.webp` | 4:5 |
| Contact portrait | `assets.contact.person` | `contact-person.webp` | 4:5 |
| Batikpedia | `assets.projects.batikpedia` | `projects/batikpedia.webp` | 16:10 |
| Genbatik | `assets.projects.genbatik` | `projects/genbatik.webp` | 16:10 |
| RAHO ERP | `assets.projects.rahoErp` | `projects/raho-erp.webp` | 16:10 |
| Gallery | `assets.gallery[0]` through `[5]` | `gallery/gallery-01.webp` through `gallery-06.webp` | 4:3 or 3:2 |
| Decorative manga | `assets.manga[0]` through `[3]` | `manga/manga-01.webp` through `manga-04.webp` | Tall panels, about 3:4 |

Decorative manga panels appear in the hero left edge, experience, skills, and contact. Hero background art has its own separate slot.

Example:

```ts
hero: {
  person: '/images/hero-person.webp',
  manga: '/images/hero-manga.webp',
},
about: { person: '/images/about-person.webp' },
```

Keep `null` for any image you do not have yet. Do not use empty strings. All paths start with `/images/`, not `/public/images/`. File names are case-sensitive on Linux/Docker.

Use compressed WebP or AVIF for opaque pictures and transparent WebP/PNG for a cutout portrait. About/contact frames use `object-fit: cover`, so leave some breathing room around the subject. A hero image should keep its subject within the irregular outline and transparent edges. Aim for 800–1200 pixels tall for portraits, 800–1000 pixels wide for projects, and 600–900 pixels wide for gallery images. Try to keep each image under 150 KB, with the hero under 200 KB. Provide artwork you have permission to use.

Text placeholders disappear automatically when a path is provided. Image alt text is already attached to every content image; gallery alt text comes from its captions. Edit gallery captions in `src/data/gallery.ts` for your actual photographs. Decorative manga is hidden from assistive technology.

## Aset wajah Jovan — 8 Oktober 2026
Delapan aset karakter (hero, About, Contact, dan lima panel manga) kini dibuat dari foto Jovan dengan gaya konsep komik yang disetujui. Gambar proyek dan galeri tetap ilustrasi konsep. Prompt lengkap tersedia di PLACEHOLDER_ASSETS.json. Ganti file WebP dengan nama yang sama untuk mengganti gambar.
