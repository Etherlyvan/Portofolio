# Skills Persona v5 — analisis dan kontrak implementasi

Status: perencanaan saja. Website belum diubah. Referensi visual: concept.png.

## 1. Temuan dari kode saat ini

- Skills.astro memakai kelas skills-concept, skills-layout, skill-tile dan skills-art yang diatur di comic.css, projects-skills.css serta chapter-continuity.css. Aturan terakhir mengunci panel kanan 245px, tinggi 330px dan memakai frame foto. Menambahkan CSS baru pada kelas itu akan kembali menghasilkan konflik cascade.
- chapter-skills:before masih memasang kota yang sama pada kedua sisi. Ini bertentangan dengan konsep karakter besar dan burst merah di kanan.
- Data berisi 15 teknologi. Ikon lokal SVG sudah tersedia; SkillIcon.astro menggunakan mask satu warna. Mockup menggambar beberapa logo multicolor, sehingga kode dengan aset saat ini tidak akan identik pada detail tersebut. Gunakan SVG aktual, bukan logo hasil generasi AI. Python tetap satu warna kecuali aset multicolor resmi disiapkan.
- Filter generik di interactions.ts hanya menyembunyikan item dan mengubah aria-pressed kategori. Belum ada selectedSkill, deskripsi, atau navigasi antartile.
- index.astro sudah memberi satu ComicSeam sesudah Skills. Jangan menambah divider lagi di dalam Skills.
- Portrait aktif assets.manga[2] mempunyai background konser. Konsep memakai cutout dengan outline putih; CSS tidak bisa menghilangkan background foto itu secara akurat.

## 2. Target visual yang dapat dikodekan

| Elemen konsep | Implementasi | Batas akurasi |
| --- | --- | --- |
| Judul 04. SKILLS, paper tag | h2 dan CSS clip-path, italic condensed type | Font asli mockup tidak diketahui; pakai stack condensed proyek, ukur ulang terhadap reference |
| Tabs kategori | Native button, active red polygon, border bawah putih | Label tidak dirotasi ekstrem; tetap terbaca |
| 15 tile polygon | Grid 5 × 3, nested polygon untuk border tipis | Bukan border kotak yang dipotong sehingga tepi diagonal kehilangan garis |
| React dipilih | State awal React, paper fill, red slash SVG | State logis sama dengan state visual |
| Panel informasi bawah | Judul skill dan deskripsi faktual dari data | Tidak menambah angka level, HP, bintang, atau persentase kemahiran |
| Karakter kanan | WebP alpha dari foto crossed-arms, img object-fit:contain | Identitas perlu diperiksa visual setelah extraction; background removal bisa memengaruhi detail tepi |
| Outline putih karakter | SVG filter alpha dilation atau drop-shadow berlapis | Filter hanya pada gambar, bukan seluruh panel/text |
| Burst merah, shards | SVG inline sebagai dekorasi absolute | SVG non-interactive, aria-hidden, tidak menjadi layout spacer |
| Ornamen batik pinggir | Aset batik yang sudah ada, opacity rendah | Hanya motif pinggir; tidak menutupi icon/label |
| Sobekan penghubung | ComicSeam existing, satu per boundary | Tidak menjanjikan setiap retakan raster identik dengan mockup |

## 3. Struktur file

- Ubah Skills.astro menjadi section dengan kelas baru skills-persona. Tidak lagi memakai skills-concept, skill-tile, skills-art atau MangaPlaceholder untuk section ini.
- Tambah ui/SkillTile.astro: button type=button, ikon, label; data-skill dan data-category dipertahankan untuk filter serta pemeriksaan yang ada.
- Tambah comic/SkillsCharacterStage.astro: karakter, SVG burst dan tiga caption. Seluruh dekorasi aria-hidden; foto diberi alt kosong karena biodata personal sudah ada pada halaman.
- Tambah styles/skills-persona.css: hanya selector .skills-persona serta modifier .chapter-skills--persona.
- Tambah scripts/skills-persona.ts: seleksi, detail dan keyboard. Tidak menambah React island atau dependensi animasi.
- Tambah id dan description pada data/skills.ts; category/color/nama yang ada dipertahankan. Description menyebut kegunaan teknologi, bukan klaim pengalaman baru.
- Daftarkan aset alpha pada config/assets.ts melalui assets.skills.person, tanpa mengganti assets.manga[2] global. Hero dan panel lain tidak ikut berubah.
- Beri wrapper Skills di index.astro modifier chapter-skills--persona. Ganti aturan art untuk modifier tersebut; jangan menghapus art Projects/Gallery/Contact.

## 4. Kerangka markup

```astro
<section id="skills" class="skills-persona" aria-labelledby="skills-title">
  <div class="skills-persona__inner">
    <div class="skills-persona__content">
      <header><!-- h2 04. SKILLS; subheading --></header>
      <div data-filter-group="skills" aria-label="Filter skills" hidden>
        <!-- category buttons -->
      </div>
      <div class="skills-persona__grid" role="group" aria-label="Technologies">
        <!-- SkillTile buttons generated from skills data -->
      </div>
      <div class="skills-persona__detail" aria-live="polite" aria-atomic="true">
        <!-- selected label, category, factual description -->
      </div>
      <p id="skill-status" class="sr-only" aria-live="polite"></p>
    </div>
    <SkillsCharacterStage />
  </div>
</section>
```

ComicSeam tetap berada pada wrapper index. Heading/filter/grid/detail berada pada kolom yang sama seperti mockup. Portrait tidak masuk ke grid tile.

## 5. Geometri dan layer

- Desktop besar: inner max-width 1440px; padding horizontal 40px. Grid utama sekitar 68%, character stage 32%; gunakan minmax(0,...) agar konten tidak mendorong viewport. Heading dan tabs membentang hanya pada kolom konten.
- Tile: lima kolom sama lebar, gap 10px, min-height sekitar 116–132px; ikon 44–56px, label 15–18px. Ukuran final diukur dari screenshot, bukan dipatok satu tinggi halaman.
- Karakter: stage stretch sepanjang tinggi konten; gambar absolute bottom:0, height:100%, width:100%, object-fit:contain, object-position:center bottom. Bursts berada di bawah karakter. Captions berada di sisi luar dan tidak menutup wajah/lengan.
- Layer lokal: latar 0, burst 1, karakter 2, grid/teks 3, seam wrapper di atasnya. isolation:isolate pada section; jangan memakai z-index negatif lintas section.
- Tile border: outer polygon off-white; inner polygon inset 1px; selected inner paper dengan red accent. Gunakan satu custom property --tile-cut untuk kedua bentuk.
- 1024–1279px: kolom konten sekitar 72%, karakter 28%; kurangi label/caption tanpa memperkecil hit target di bawah 44px.
- 768–1023px: konten full width, portrait stage di bawah atau strip samping terpisah jika ruang cukup; grid lima kolom hanya jika label masih muat, selain itu tiga kolom. Breakpoint ditentukan oleh screenshot.
- <768px: satu kolom halaman, grid tiga kolom, tabs membungkus. Portrait stage 260–320px di bawah detail, jangan menumpuk karakter di atas tile. Heading clamp(), target pointer minimum 44px.
- Tinggi otomatis. CSS art tidak menghasilkan ruang kosong sebelum/ sesudah section.

## 6. State dan interaksi

```ts
type SkillCategory = 'all' | 'frontend' | 'backend' | 'ai' | 'tools' | 'other';
let selectedId = 'react';
// visibleSkills berasal dari filter aktif.
// select(id): update aria-pressed tile, detail textContent, dan state animasi.
// setelah filter: pertahankan selectedId bila masih terlihat;
// jika tersembunyi: pilih item pertama yang terlihat.
// jika kosong: kosongkan selectedId dan tampilkan empty state.
```

- Filter kategori tetap memakai handler generik. Tambahkan satu CustomEvent skills:filtered setelah filter Skills selesai, dengan category dan item count. Modul Skills mendengarkan event itu untuk merekonsiliasi selection. Hindari dua handler kategori yang masing-masing melakukan hide/show.
- Skill dipilih melalui klik, focus dari keyboard, atau tombol panah. Native buttons, aria-pressed untuk selection; bukan role=tab karena skill tidak berpindah antar-tabpanel.
- Pointer hover hanya preview highlight; tidak mengubah deskripsi atau menghasilkan announcement terus-menerus. selected tile tetap jelas setelah mouse keluar.
- Arrow kiri/kanan berpindah satu item terlihat; atas/bawah berpindah sejumlah kolom grid yang benar-benar dirender. Home/End ke pertama/terakhir. Enter/Space tetap perilaku native button. Item hidden tidak mendapat fokus.
- Semua tile masih dapat dijangkau dengan Tab. Jangan memakai roving tabindex sebelum ada kebutuhan dan pengujian yang mendukungnya.
- Setelah filtering, fokus tetap pada tombol kategori. Selection baru tidak memaksa scroll/fokus pindah.
- Tanpa JavaScript: semua skill tampil; filter disembunyikan; detail awal React tetap bisa dibaca. Tile button tidak terlihat seperti tautan proyek.

## 7. Motion yang sesuai konsep

- Section reveal sekali saat masuk viewport: judul masuk 180–250ms; tile stagger 20–25ms, total di bawah 500ms; karakter masuk 300–400ms. Konten default visible agar no-JS aman.
- Hover: red/paper accent snap 100–140ms, translateY maksimal 3px; tidak membuat halaman bergeser.
- Selection: detail label bergeser 6–10px dan fade 120–180ms; satu animasi finite. Ganti teks via textContent, bukan HTML injection.
- Tidak ada shake terus-menerus, parallax mengikuti mouse, flash berulang, atau audio autoplay.
- prefers-reduced-motion mematikan semua pergerakan; highlight dan selection tetap bekerja.

## 8. Aset sebelum implementasi

1. Buat cutout transparent dari public/images/manga/arms-crossed-panel-v1.webp, cukup head-to-waist; pertahankan tangan menyilang dan wajah, hapus hanya background. Simpan WebP dengan alpha secara non-destructive di images/skills-persona/.
2. Periksa wajah, proporsi, jari, tepi rambut, dan alpha di latar merah serta hitam. Tidak menambahkan jam tangan/atribut baru.
3. Gunakan batik-ink-border.webp existing untuk motif pinggir; jangan memakai kolase kopi/kamera.
4. Ikon memakai images/skills/*.svg existing. Next.js/Three.js harus gelap ketika tile aktif putih sehingga tetap terbaca.

## 9. Urutan implementasi dan bukti selesai

1. Siapkan dan cek aset cutout.
2. Ubah markup dan kelas Skills, lalu bersihkan selector legacy khusus Skills pada chapter-continuity.css/projects-skills.css. Jangan menumpuk override baru tanpa mencabut aturan yang digantikan.
3. Samakan geometri desktop dengan concept.png: heading, grid, right stage dan detail strip.
4. Tambahkan state/filter integration, keyboard dan reduced motion.
5. Screenshot pada 320, 375, 768, 1024, 1440, 1920px. Bandingkan posisi dan proporsi dengan mockup; toleransi utama struktur/proportion, bukan exact raster pixels.
6. Verifikasi count filter: all15 / frontend5 / backend6 / ai1 / tools2 / other1. React → Backend harus memilih Python; kembali All mempertahankan Python; pemilihan manual memperbarui panel detail.
7. Cek tidak ada overflow horizontal; portrait tidak menutup tile atau seam; Projects→Skills→Gallery tidak mempunyai gap/double divider; Hero, menu dan Contact tetap memakai foto terbaru.
8. Cek keyboard setelah filtering, no-JS, reduced-motion, gambar decode, Astro check dan build. Tes harus mencakup perilaku nyata, bukan meniru detail implementasi.

## 10. Batas janji

Konsep dapat diwujudkan dekat pada komposisi, warna, hierarki dan interaksi. Foto cutout dan texture raster tidak dijanjikan identik pixel-for-pixel dengan gambar AI. Caption/skill descriptions tetap data faktual. Tahap ini hanya membuat rencana; belum menyiapkan aset baru atau mengubah kode live.
