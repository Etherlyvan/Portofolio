# Implementation plan — 06. LET'S TALK

## Target

Membangun ulang `Contact.astro` agar mengikuti `concept.png`: sebuah command menu yang terasa seperti interface game, menyatu dengan Experience dan Skills, tetap ringan, responsif, dapat dipakai dengan keyboard, dan tetap berfungsi tanpa JavaScript.

Rasio 16:9 pada mockup dipakai sebagai panduan komposisi desktop. Section web tidak diberi tinggi tetap karena teks dan viewport harus tetap aman. Pada layar lebar, tinggi visual dijaga melalui `min-height` dan proporsi grid.

## File yang disentuh saat implementasi

| File | Perubahan |
| --- | --- |
| `src/components/sections/Contact.astro` | Ganti markup lama dengan struktur command menu dan character stage. |
| `src/styles/contact-persona.css` | CSS khusus section, responsive layout, clip-path, focus, dan animasi. |
| `src/config/assets.ts` | Tambahkan aset cutout Contact bila aset final sudah tersedia. |
| `src/pages/index.astro` | Tidak perlu mengubah urutan; wrapper `chapter-contact` dan `ComicSeam` sudah benar. |
| `src/scripts/contact-persona.ts` | Opsional dan kecil: entrance observer serta selected-state visual. Link tidak bergantung pada script. |
| `public/images/contact-persona/` | Character cutout WebP dan strip konser bila diperlukan. |

## Struktur komponen Astro

```astro
<section id="contact" class="contact-persona" aria-labelledby="contact-title">
  <div class="contact-persona__inner">
    <header class="contact-persona__heading">
      <h2 id="contact-title"><span>06.</span> LET’S TALK</h2>
    </header>

    <div class="contact-persona__prompt">
      <strong>HAVE A PROJECT IN MIND?</strong>
      <span>LET’S BUILD SOMETHING GREAT TOGETHER.</span>
    </div>

    <nav class="contact-persona__commands" aria-label="Contact options">
      <p>CHOOSE YOUR MOVE</p>
      <a class="is-primary" href="mailto:jovanku1@gmail.com">
        <span aria-hidden="true">ikon</span>
        <strong>EMAIL ME</strong>
        <small>jovanku1@gmail.com</small>
      </a>
      <a href="tel:+6281203742584">
        <span aria-hidden="true">ikon</span>
        <strong>CALL ME</strong>
        <small>+62 812-3374-2584</small>
      </a>
      <a href="mailto:jovanku1@gmail.com?subject=Let%27s%20build%20something">
        <strong>START A CONVERSATION</strong>
      </a>
    </nav>

    <div class="contact-persona__socials" aria-label="Social profiles">
      <!-- Hanya render link yang URL-nya sudah terverifikasi. -->
    </div>

    <div class="contact-persona__stage" aria-hidden="true">
      <div class="contact-persona__stadium-strip">…</div>
      <div class="contact-persona__burst">…</div>
      <img class="contact-persona__character" />
      <p class="contact-persona__quote">GOOD IDEAS.<br />BETTER PEOPLE.</p>
      <p class="contact-persona__availability">AVAILABLE FOR<br />THE NEXT BUILD</p>
    </div>
  </div>
</section>
```

## Grid desktop

`contact-persona__inner` memakai grid dua kolom utama:

```css
grid-template-columns: minmax(520px, 1.15fr) minmax(420px, .85fr);
grid-template-areas:
  "heading stage"
  "prompt stage"
  "commands stage"
  "socials stage";
min-height: clamp(720px, 56.25vw, 920px);
```

Kolom kiri menampung informasi dan aksi. Kolom kanan menampung foto sehingga dekorasi tidak mengganggu target klik. Container mengikuti pola section baru dengan `max-width: 1520px`, `margin-inline: auto`, dan padding responsif.

## Sistem visual

- Background hitam menggunakan radial halftone yang sama dengan Skills.
- Judul menggunakan treatment kertas putih, tetapi angka `06.` dibuat lebih dominan dan merah agar section mempunyai siluet sendiri.
- Semua command memakai satu bentuk clip-path yang sama. Variasi datang dari warna dan offset, bukan bentuk acak pada setiap item.
- Cursor putih adalah pseudo-element pada item aktif. Saat hover atau keyboard focus, cursor berpindah ke item terkait.
- Foto utama memakai cutout transparan dengan outline putih dan red offset shadow. Foto tidak digenerasi ulang; wajah berasal dari aset foto Jovan.
- Strip konser dibuat dari foto yang sama atau panel konser berbeda, dipotong menjadi dua bidang miring di belakang karakter.
- Batik hanya menjadi tekstur tipis pada sudut, tidak menjadi sidebar besar yang mengulang section lain.
- `ComicSeam variant={5}` tetap berada di `index.astro`, jadi Contact tidak menggambar seam kedua.

## Link dan data

- Email utama: `mailto:jovanku1@gmail.com`.
- Telepon: `tel:+6281203742584`.
- CTA ketiga memakai email dengan subject yang sudah diisi, bukan tombol mati.
- Social shortcut berasal dari `links` di `src/config/assets.ts`.
- Social dengan nilai `null` tidak dirender. URL tidak akan ditebak atau dibuat palsu.

## Interaksi

Interaksi utama memakai CSS:

- `:hover` dan `:focus-visible` mengaktifkan warna merah, cursor, dan offset shadow.
- `:active` memberi pergeseran singkat 2–3px seperti menu ditekan.
- Fokus keyboard tetap memakai outline kuning terang agar tidak hilang di atas merah.

JavaScript hanya digunakan bila entrance animation diperlukan:

1. `IntersectionObserver` menambahkan `.contact-persona--entered` satu kali.
2. Heading, prompt, command, lalu character masuk secara stagger 80–120ms.
3. Pointer/focus dapat menambah `.is-current`, tetapi link tetap bekerja jika script gagal.
4. Tidak ada audio autoplay, cursor replacement global, atau animasi partikel tanpa batas.

## Breakpoint

### Desktop ≥ 1280px

- Dua kolom 58/42.
- Character memenuhi hampir seluruh tinggi section.
- Tiga command bertumpuk dengan tinggi 92–108px.
- Quote menumpuk di atas stadium strip, bukan di atas wajah.

### Tablet 768–1279px

- Dua kolom lebih seimbang atau stage pindah ke baris bawah pada lebar sekitar 1024px.
- Command tetap lebar penuh pada kolom konten.
- Foto diperkecil tanpa memotong kepala dan tangan.

### Mobile < 768px

- Urutan: heading → prompt → commands → socials → character stage.
- `min-height` dilepas; tinggi mengikuti isi.
- Target sentuh minimal 48px.
- Nomor telepon tidak terpotong dan tidak menyebabkan overflow.
- Character stage setinggi sekitar 330–400px.
- Caption ditempatkan di area kosong foto, tidak menutup wajah.

## Aksesibilitas

- Section memakai `aria-labelledby` yang mengarah ke heading asli.
- Daftar command memakai `nav` dengan label yang jelas.
- Icon dekoratif memakai `aria-hidden="true"`; isi link tetap terbaca lengkap.
- Foto dekoratif memakai alt kosong bila informasi identitas sudah muncul pada halaman. Jika foto menjadi konten, alt singkat: `Jovan at a concert venue`.
- Focus state mempunyai kontras tinggi dan tidak hanya mengandalkan perubahan warna.
- `prefers-reduced-motion: reduce` menghapus translate, stagger, dan transition.
- DOM tetap masuk akal tanpa CSS dan seluruh link tetap aktif tanpa JavaScript.

## Aset

Untuk mendekati mockup diperlukan:

1. `jovan-contact-cutout.webp`: cutout transparan dari foto Contact yang sudah dipilih, tanpa mengubah wajah, tubuh, aksesori, atau pose.
2. `concert-strip.webp`: crop horizontal suasana stadion; dapat berasal dari foto yang sama selama tidak terlihat seperti portrait kedua.

Sebelum aset cutout selesai, implementasi dapat memakai foto sekarang di dalam frame miring. Tahap final baru mengganti frame dengan cutout transparan.

## Urutan implementasi

1. Siapkan aset cutout dan crop konser.
2. Buat markup baru di `Contact.astro` dengan seluruh link berfungsi.
3. Tambahkan `contact-persona.css` dan selesaikan layout desktop.
4. Tambahkan responsive tablet/mobile tanpa fixed height.
5. Tambahkan focus, hover, reduced motion, dan progressive entrance.
6. Hapus dependency lama yang tidak lagi dipakai oleh Contact: `ComicLabel`, `PhotoFrame`, dan `MangaPlaceholder`.
7. Jalankan `astro check` dan `astro build`.
8. Uji pada 320, 375, 768, 1024, 1440, dan 1920px.
9. Periksa horizontal overflow, keyboard navigation, mailto/tel, reduced motion, dan kesinambungan seam dari Gallery ke Contact serta Contact ke Footer.

## Kriteria selesai

- Secara visual mengikuti `concept.png` pada desktop tanpa menggunakan mockup sebagai background.
- Tidak ada elemen “Coming soon” yang terlihat sebagai kontrol mati.
- Email, telepon, dan CTA ketiga berfungsi.
- Tidak ada horizontal scrollbar pada semua breakpoint pengujian.
- Foto tidak terdistorsi dan wajah tidak tertutup caption.
- Animasi berhenti setelah entrance selesai.
- `astro check` menghasilkan 0 error dan 0 warning.
- Build production selesai tanpa error.
