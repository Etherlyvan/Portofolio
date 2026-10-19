# 06. LET'S TALK — Persona contact concept

Konsep ini mengubah section kontak menjadi layar pilihan aksi yang terasa seperti menu game, tetapi seluruh strukturnya tetap realistis dibangun dengan Astro dan CSS. Kanvas utama memakai rasio 16:9 (1672×941), sama dengan konsep 04 Skills.

## Struktur visual

1. Judul `06. LET’S TALK` menjadi anchor besar di kiri atas.
2. Prompt `HAVE A PROJECT IN MIND?` tampil sebagai dialogue card dari kertas sobek.
3. Email, telepon, dan CTA menjadi tiga command menu bersudut. Email aktif memakai merah dan cursor arrow putih.
4. LinkedIn, GitHub, dan Discord menjadi shortcut kecil di bawah menu utama.
5. Foto konser menjadi character card utama di kanan dengan cutout putih, red offset shadow, dan panel suasana stadion di belakang.
6. Caption `GOOD IDEAS. BETTER PEOPLE.` berfungsi seperti speech card.

## Arah implementasi Astro

- Menu memakai anchor asli agar email dan telepon langsung berfungsi.
- Bentuk miring memakai `clip-path`; tekstur memakai pseudo-element dan background halftone yang sudah ada.
- Cursor menu, speed lines, dan red offset dibangun dengan CSS.
- Foto tetap berasal dari aset Jovan yang sudah tersedia. Tidak perlu membuat ulang wajah.
- Animasi masuk berupa stagger singkat: label → dialogue → command menu → character card.
- Hover/focus menggeser cursor dan bayangan menu. Reduced motion menonaktifkan perpindahan besar.
- Pada mobile, urutan menjadi judul → dialogue → command menu → foto agar CTA tetap cepat dijangkau.

Mockup utama: `concept.png`. Versi ultra-wide pertama disimpan sebagai `concept-ultrawide-v1.png`.
