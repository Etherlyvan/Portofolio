# Memasang widget KARI

Portfolio menyediakan integrasi host opsional. **Widget, karakter dan backend dimiliki project `kari` yang terpisah**; mengaktifkan embed tidak dengan sendirinya menjalankan service KARI atau mengaktifkan inference berbayar. Fitur catatan, reminder, Telegram dan WhatsApp mengikuti status implementasi/configuration backend KARI, bukan kemampuan portfolio ini.

KARI ditampilkan sebagai karakter kecil di kanan bawah dengan bubble dan input ringkas. Source dan dependency KARI tidak disalin ke website host. Kontrak web memakai native custom element dan ES module, sehingga website yang mendukungnya tidak harus memakai Astro, NestJS, atau framework tertentu.

## 1. Mengaktifkan pada portfolio Astro ini

Pengaturan publik berikut dibaca **saat build**:

| Variabel | Default | Fungsi |
|---|---|---|
| `KARI_ENABLED` | `false` | Menyertakan elemen dan loader widget pada layout publik |
| `KARI_WIDGET_URL` | `/kari/embed.js` | URL modul widget |
| `KARI_API_BASE` | `/kari/api` | Prefix API publik KARI |
| `KARI_SITE_ID` | `portfolio` | ID publik website yang didaftarkan pada backend KARI |

URL widget/API boleh berupa path satu origin seperti `/kari/embed.js` atau URL HTTPS eksternal. URL protocol-relative (`//host/path`) dan skema seperti `javascript:` bukan konfigurasi yang didukung. Tidak ada secret di variabel ini. `site-id` adalah identitas integrasi publik, bukan API key, bukti kepemilikan, atau izin mengakses catatan pribadi.

Contoh PowerShell untuk origin yang memakai proxy Nginx:

```powershell
$env:KARI_ENABLED = 'true'
$env:KARI_WIDGET_URL = '/kari/embed.js'
$env:KARI_API_BASE = '/kari/api'
$env:KARI_SITE_ID = 'portfolio'
npm run check
npm run build
```

Komponen `src/components/integrations/KariEmbed.astro` digunakan satu kali oleh `BaseLayout.astro`. Props layout `showKari={false}` dapat mengecualikan halaman tertentu tanpa mengubah konfigurasi seluruh website. Halaman `specialperson.astro` memakai dokumen sendiri dan tidak menyertakan widget. Pengaturan environment runtime pada Nginx tidak mengubah HTML statis; ubah build arguments/configuration lalu rebuild bila flag atau URL berubah.

Untuk development, jalankan backend KARI terlebih dahulu. Opsional, aktifkan proxy Astro untuk prefix `/kari/`:

```powershell
$env:KARI_ENABLED = 'true'
$env:KARI_DEV_PROXY_TARGET = 'http://127.0.0.1:3000'
npm run dev
```

`KARI_DEV_PROXY_TARGET` hanya target proxy development pada mesin pengembang; bukan URL API yang dibaca browser atau secret. Tanpa target ini, dev server tidak otomatis menemukan KARI. Jangan memakai hostname Docker `kari` sebagai URL browser.

## 2. Docker dan reverse proxy satu origin

Compose pada repo portfolio meneruskan konfigurasi build KARI. Contoh setelah `.env` lokal berisi pengaturan publik yang sesuai:

```sh
docker compose up --build -d
docker compose exec portfolio nginx -t
```

Compose tersebut **hanya menjalankan portfolio**. Deployment gabungan dikelola repo KARI dan menghubungkan tiga service: portfolio/Nginx, KARI dan PostgreSQL. KARI serta database tidak membutuhkan port publik; KARI membutuhkan outbound HTTPS untuk provider/kanal yang diaktifkan. Jangan menjalankan deployment standalone dan gabungan bersamaan pada host port yang sama atau menghapus volume database saat update.

```text
Browser -> portfolio/Nginx -> static Astro
                         -> /kari/embed.js dan assets -> kari:3000
                         -> /kari/api/*               -> kari:3000
                                                         -> PostgreSQL privat
                                                         -> provider/kanal terkonfigurasi
```

Nginx menyediakan prefix `/kari/` dan mempertahankannya hingga service KARI. Konfigurasi menggunakan resolusi DNS runtime Docker agar static site tidak bergantung pada keberadaan backend saat startup. API tidak di-cache atau di-retry otomatis; buffering proxy dinonaktifkan agar streaming yang didukung backend dapat diteruskan. Browser tetap memakai URL satu origin, bukan port/database internal Docker. Uji DNS, timeout dan koneksi kembali setelah container KARI dibuat ulang pada deployment nyata.

Untuk hosting widget eksternal, portfolio tidak perlu memakai proxy KARI. Atur kedua URL ke origin HTTPS KARI yang sesuai, misalnya:

```powershell
$env:KARI_ENABLED = 'true'
$env:KARI_WIDGET_URL = 'https://kari.example.com/kari/embed.js'
$env:KARI_API_BASE = 'https://kari.example.com/kari/api'
$env:KARI_SITE_ID = 'portfolio'
npm run build
```

Domain `.example.com` pada contoh adalah placeholder; ganti dengan hosting KARI milikmu. Backend harus mendaftarkan `site-id` dan origin website yang diizinkan terlebih dahulu.

## 3. Memasang pada website lain

Website host tidak perlu memakai stack backend yang sama dengan KARI. Sediakan endpoint KARI yang reachable melalui HTTPS, lalu pasang custom element dan modulnya satu kali, biasanya sebelum `</body>`.

### HTML biasa atau template server

```html
<kari-widget
  api-base="https://kari.example.com/kari/api"
  site-id="my-website"
  position="bottom-right"
></kari-widget>
<script type="module" src="https://kari.example.com/kari/embed.js"></script>
```

Daftarkan `my-website` dan origin website, misalnya `https://website.example.com`, pada backend KARI. Ubah URL serta ID contoh sesuai deployment aktual. ID situs hanya memilih konfigurasi/konteks publik yang server izinkan; pengunjung tidak boleh menentukan provider key, system prompt, pemilik atau hak akses melalui atribut.

| Atribut | Kontrak |
|---|---|
| `api-base` | Prefix API KARI untuk deployment yang dipilih |
| `site-id` | ID integrasi publik yang dikenali server |
| `position` | Posisi awal; gunakan `bottom-right` untuk tampilan default |

Jangan mengasumsikan atribut/method lain sebelum didokumentasikan oleh release KARI. Sprite, CSS dan chunk widget harus berasal dari release yang kompatibel dengan API. Shadow DOM membantu memisahkan styling dari website host; script widget tetap kode tepercaya yang berjalan pada halaman host, bukan sandbox keamanan.

### Astro lain

Gunakan elemen HTML yang sama, tetapi tandai script agar Astro tidak mencoba memasukkan source KARI ke bundle lokal:

```astro
<kari-widget api-base="https://kari.example.com/kari/api" site-id="my-website" position="bottom-right"></kari-widget>
<script is:inline type="module" src="https://kari.example.com/kari/embed.js"></script>
```

`is:inline` adalah directive Astro, bukan atribut yang diperlukan pada HTML biasa. Tidak perlu import file dari checkout repo KARI atau memasang dependency backend pada Astro. [Dokumentasi script Astro](https://docs.astro.build/en/guides/client-side-scripts/) menjelaskan pemrosesan script tersebut.

### React dan website yang memakai router client

Muat modul sekali melalui dokumen/root layout atau fasilitas script framework yang dipakai. Render custom element pada client dan jangan memuat ulang script pada setiap navigasi. Jika TypeScript/versi React meminta deklarasi tipe custom element, tambahkan deklarasi host yang sesuai; tidak perlu mengganti widget menjadi komponen React. API lifecycle/mount/unmount mengikuti release widget, bukan asumsi tentang globals atau fungsi init yang belum tersedia.

### WordPress atau CMS

Pasang elemen lewat template/block HTML yang mengizinkan custom element dan enqueue modul melalui mekanisme script theme/plugin yang sesuai versi CMS. Jangan mengandalkan editor yang menghapus tag script atau menyisipkan modul berulang pada setiap block. Tidak perlu menaruh provider key atau token bot pada CMS/browser.

### Domain, browser dan CSP

- KARI backend harus mengizinkan **origin yang persis sesuai** untuk setiap `site-id`, termasuk skema dan port development. Jangan membuka CORS wildcard untuk endpoint kredensial. CORS/origin checks bukan autentikasi pemilik atau pengganti rate limit dan budget.
- Hosting modul lintas domain membutuhkan MIME JavaScript dan CORS yang benar pada response asset; API juga membutuhkan konfigurasi CORS/preflight yang sesuai. Allowlist CSP website harus mengizinkan origin loader/chunks, asset gambar dan koneksi API yang dipakai.
- Cookie pihak ketiga dapat diblokir browser. Deployment lintas domain tidak boleh bergantung pada cookie itu untuk chat publik; backend/widget harus menyediakan sesi pengunjung terisolasi, misalnya token pengunjung singkat yang diterbitkan server dan disimpan hanya pada memori instance widget. Token publik tersebut tidak boleh memberikan hak pemilik.
- Mode pribadi membutuhkan autentikasi server yang dirancang khusus; tidak otomatis aktif di semua website yang memasang widget atau saat seseorang mengetik "aku Jovan". Jangan meneruskan cookie/riwayat pemilik ke domain website pihak lain.
- Verifikasi dukungan ES modules/custom elements, kebijakan CMS dan CSP pada website sasaran. Istilah "universal" berarti widget tidak bergantung pada framework host, bukan menjamin bisa melewati pembatasan setiap browser/CMS.

## 4. Penggunaan widget

Setelah widget/backend yang sesuai tersedia dan konfigurasi host aktif:

1. Klik atau fokuskan KARI untuk membuka bubble dan input. Tulis pesan lalu kirim; jawaban tetap berada dekat karakter, tanpa window chat besar.
2. Gerak acak terjadi jarang saat idle dan hanya pada anchor yang aman. Posisi tetap saat input/bubble dipakai atau respons berlangsung. Pada mobile/reduced motion, gerak acak default mati.
3. Perintah posisi diproses lokal, tanpa inference:

   | Perintah | Hasil |
   |---|---|
   | `Kari, pindah ke kiri` | Memilih anchor aman di kiri |
   | `Ke kanan bawah` | Kembali ke posisi awal yang aman |
   | `Pindah tempat` / `minggir` | Memilih anchor aman lain |
   | `Tetap di sini` | Mengunci posisi dan menghentikan gerak acak |

4. Minimize/Escape menutup bubble/input dan mengembalikan fokus ke launcher. Hide harus menyisakan kontrol buka kembali yang dapat diakses. Menyembunyikan karakter tidak membatalkan reminder yang sudah tersimpan pada backend.

Persona, animasi dan kemampuan catatan/reminder mengikuti release KARI. Public visitor hanya mendapat konteks situs publik; aksi pemilik, data pribadi serta pengiriman kanal tidak dapat dibuka lewat atribut atau perintah gerak.

## 5. Konteks portfolio dan batas repository

`/kari-knowledge.json` adalah artifact publik hasil ekspor field portfolio yang diizinkan. KARI dapat memakai artifact versi/hash tersebut sebagai konteks situs `portfolio`; website lain harus menyediakan konteks publiknya sendiri, bukan otomatis memakai informasi Jovan. Jangan crawl/mount seluruh checkout atau menyertakan `specialperson`, environment files, prompt internal maupun catatan pribadi.

Secret LLM/Telegram/WhatsApp dan connection string database hanya dimiliki backend KARI. Source maskot, bubble, CSS dan database tetap pada repo KARI. Portfolio cukup memiliki konfigurasi embed serta data publik; tidak menambahkan NestJS/Prisma/renderer animasi ke dependency website.

## 6. Verifikasi, update dan troubleshooting

Jalankan `npm run check` dan `npm run build` untuk perubahan portfolio. Verifikasi embed default nonaktif, halaman private tidak memuatnya, konteks publik tidak berisi data personal, serta website tetap bisa dipakai ketika KARI tidak tersedia. Uji loader/asset tidak perlu memanggil model. Pengujian inference atau pengiriman pesan sungguhan dapat berbiaya dan mengikuti konfigurasi serta budget backend.

| Gejala | Yang diperiksa |
|---|---|
| KARI tidak muncul | Flag saat build, layout halaman, status loader, registrasi custom element, CSP |
| Loader menerima 404/HTML | Service KARI belum berjalan atau `/kari/` masih ditangani route static |
| API 502/503 | Network/port service, DNS Docker, backend readiness; website tetap harus tersedia |
| API lintas domain ditolak | `site-id`, origin allowlist, preflight dan konfigurasi sesi pengunjung |
| Sesi berbeda/putus pada domain lain | Jangan bergantung pada third-party cookie; cek kontrak token pengunjung publik |
| Respons datang sekaligus | Buffering pada Nginx/edge dan dukungan streaming backend/model |
| Animasi tidak bergerak | Reduced motion, preferensi gerak, tab tersembunyi atau asset gagal |
| Tidak mau berpindah | Input aktif, posisi terkunci, mobile/reduced motion atau tidak ada anchor aman |
| Widget lama setelah update | Cache loader dan kesesuaian chunk/asset berhash dengan API |

Untuk menonaktifkan tampilan, build ulang dengan `KARI_ENABLED=false`. Menonaktifkan embed tidak mematikan backend atau membatalkan reminder; pembatalan dilakukan melalui operasi KARI yang diizinkan. Jangan menghapus volume database sebagai cara memperbarui/menyembunyikan widget.

Update KARI yang kompatibel dilakukan lewat image/hosting KARI tanpa menyalin source ke portfolio. Perubahan kontrak mayor memerlukan penyesuaian embed dan pengujian ulang. Build/release produksi sebaiknya memakai versi image/asset terpin, bukan script dari sumber yang tidak dipercaya. Rencana lokal `AI_*.md` tetap diabaikan Git; panduan project ini sengaja ditrack dan tidak bergantung pada berkas rencana tersebut.
