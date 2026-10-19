# Hero motion concept — Persona-style entrance

Storyboard: `storyboard.png` (1672×941, 16:9).

Tujuan animasi adalah membuat Hero terasa seperti opening menu game: cepat, tajam, berlapis, lalu berhenti dalam komposisi yang sudah ada. Foto, wajah, teks, dan posisi akhir tidak didesain ulang.

## Timeline

| Waktu | Aksi |
| --- | --- |
| 0–180ms | Red slash menyapu diagonal. Background halftone dan siluet kota muncul melalui clip-path. |
| 140–430ms | Kartu foto manga kiri dan kanan masuk dari arah berlawanan dengan overshoot kecil. |
| 300–760ms | `HEY, I’M`, `JOVAN`, `PRABOWO`, dan `KUNCORO` tersusun bertahap seperti potongan kertas. |
| 620–1080ms | Portrait utama naik dari bawah. White outline muncul bersama satu impact flash merah/putih. Portrait manga merah masuk 70ms lebih awal sebagai shadow layer. |
| 900–1250ms | Role strip dan deskripsi masuk dari kiri dengan jarak pendek. |
| 1120–1500ms | CTA, location tags, dan quote masuk terakhir. `VIEW MY WORK` menjadi pilihan visual pertama. |
| 1500–1650ms | Semua elemen melakukan overshoot 2–4px lalu berhenti pada posisi final. |

## Karakter gerak

- Kurva utama: `cubic-bezier(.16, 1, .3, 1)` agar gerakan cepat di awal dan mengunci di akhir.
- Gerak memakai `transform`, `opacity`, dan `clip-path`; tidak mengubah layout.
- Maksimum rotasi 8°, maksimum overshoot 6px.
- Impact flash hanya sekali dan kurang dari 100ms.
- Setelah selesai tidak ada partikel atau flashing berulang.
- Idle opsional hanya pada portrait utama: naik-turun maksimal 3px selama 5–6 detik. Idle dimatikan pada layar kecil dan reduced motion.
- Hover/focus CTA memakai cursor nudge dan red-paper snap selama sekitar 120ms.

## Konsep pengkodean

### Markup

Tambahkan atribut data ke grup yang sudah ada, tanpa menduplikasi konten:

```astro
<section class="hero-redesign" data-hero-motion>
  <div class="hero-motion-wipe" aria-hidden="true"></div>
  <div class="hero-edge-collage" data-hero-layer="panels">…</div>
  <div class="hero-name-block" data-hero-layer="name">…</div>
  <p class="hero-profession" data-hero-layer="role">…</p>
  <p class="hero-intro" data-hero-layer="intro">…</p>
  <div class="hero-actions" data-hero-layer="actions">…</div>
  <div class="hero-red-portrait" data-hero-layer="shadow">…</div>
  <div class="hero-cutout" data-hero-layer="character">…</div>
</section>
```

### CSS

Animasi ditempatkan di `src/styles/hero-motion.css` agar `hero.css` tetap menangani layout. State final tetap menjadi CSS default. Initial state hanya aktif ketika `<html>` memiliki class `hero-motion-enabled`, sehingga tanpa JavaScript semua konten langsung terlihat.

Setiap layer memakai custom property untuk delay:

```css
[data-hero-layer]{--hero-delay:0ms}
.hero-motion-enabled .hero-redesign:not(.hero-motion--entered) [data-hero-layer]{opacity:0}
.hero-motion--entered [data-hero-layer]{animation-delay:var(--hero-delay)}
```

Nama tidak dianimasikan per huruf. `JOVAN`, `PRABOWO`, dan `KUNCORO` bergerak sebagai tiga blok agar performa stabil dan screen reader tidak menerima teks terpecah.

### JavaScript

`src/scripts/hero-motion.ts` hanya mengatur state:

1. Tambahkan `hero-motion-enabled` sebelum animasi dimulai.
2. Pada dua `requestAnimationFrame`, tambahkan `.hero-motion--entered`.
3. Setelah 1650ms tambahkan `.hero-motion--settled` dan hapus will-change.
4. Pada `pageshow` dari bfcache, tampilkan state settled tanpa memutar ulang.
5. Tidak ada scroll listener kontinu dan tidak ada library animasi.

## Responsif

- Desktop menjalankan seluruh sequence.
- Tablet memakai timing sama dengan perpindahan lebih pendek.
- Mobile menghilangkan impact flash besar dan mengurangi translasi sekitar 40% agar tidak memperparah layout vertikal.
- Portrait pada mobile tetap memakai posisi final yang sekarang; animasi tidak boleh mengubah ukuran atau crop.
- Animasi hanya diputar saat Hero berada dekat viewport pertama.

## Aksesibilitas dan performa

- `prefers-reduced-motion: reduce` langsung menampilkan state final tanpa wipe, overshoot, atau idle.
- Tidak ada audio autoplay.
- Tidak ada elemen dekoratif yang menerima focus.
- Tombol tetap anchor asli dan focus outline dipertahankan.
- Gambar tidak digandakan dan tidak difilter selama animasi.
- `will-change` hanya aktif selama sequence berlangsung.
- Target durasi total 1,65 detik; tidak boleh menunda interaksi CTA.

## Verifikasi saat diterapkan

- Screenshot state awal, 0.35s, 0.85s, dan state final.
- Pastikan state final pixel-aligned dengan Hero sekarang.
- Uji 320, 375, 768, 1024, 1440, dan 1920px.
- Uji reload, bfcache/back navigation, no-JS, keyboard focus, dan reduced motion.
- Periksa CLS: target 0 karena hanya transform/opacity yang berubah.
- `astro check` dan production build harus bersih.
