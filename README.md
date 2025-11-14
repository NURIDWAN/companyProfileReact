# Company Profile — Laravel 12 + React (Inertia)

> Aplikasi company profile modern berbasis Laravel 12 (backend) dan React 19 + Inertia.js (frontend) dengan Vite sebagai bundler. Fokus utama aplikasi ini adalah menghadirkan landing page perusahaan lengkap dengan hero interaktif, halaman layanan, portfolio, blog, hingga CTA multi-kanal.

---

## Persyaratan Sistem
- PHP **8.2+** dengan ekstensi standar Laravel (BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML).
- Composer **2.6+**.
- Node.js **18.18+ / 20+** dan npm 10.
- MySQL 8 / MariaDB 10.6 / PostgreSQL 13 (atau SQLite untuk dev cepat).
- Redis (opsional) bila ingin menggunakan queue/cache terpisah.

---

## Langkah Cepat Instalasi
```bash
git clone <repo-url> company-profile
cd company-profile
cp .env.example .env
composer install
npm install
php artisan key:generate
# konfigurasi DB, MAIL, AWS/S3, RECAPTCHA, dsb di .env
php artisan migrate --seed
php artisan storage:link
npm run dev            # Vite dev server (frontend)
php artisan serve      # http://127.0.0.1:8000
```

### Script yang Tersedia
| Perintah | Deskripsi |
| --- | --- |
| `composer dev` | Menjalankan PHP dev server, queue listener, dan Vite secara paralel. |
| `composer dev:ssr` | Mode SSR: build server bundle lalu jalankan server, queue, log stream dan Inertia SSR. |
| `composer test` | Membersihkan cache konfigurasi lalu menjalankan `php artisan test`. |
| `npm run dev` | Vite dev server dengan HMR. |
| `npm run build` / `npm run build:ssr` | Build asset SPA atau sekaligus bundle SSR. |
| `npm run lint` | ESLint dengan auto-fix. |
| `npm run format` / `npm run format:check` | Prettier + plugin Tailwind untuk konsistensi styling. |
| `npm run types` | Cek TypeScript tanpa emit file. |

---

## Fitur Utama
- **Navigasi Lengkap**: Produk, Beranda, Layanan, Tentang Kami, Karier, Proyek, Blog, Kontak, Galeri.
- **Hero Section Dinamis**: CTA “Konsultasi Gratis” & “Lihat Portfolio”, statistik layanan/klien/pengalaman.
- **Tentang Kami**: Sejarah perusahaan, deskripsi layanan, core values.
- **Layanan Unggulan**: Web, Mobile, ERP + tautan detail layanan.
- **Proyek / Portfolio**: Grid proyek unggulan lengkap dengan gambar, kategori, status live.
- **Testimoni Klien**: Quote, rating, nama, dan jabatan.
- **Keunggulan Kami**: Menyoroti tim, teknologi, support, keamanan, kemitraan.
- **Blog & Insight**: Artikel terbaru beserta metadata (kategori, durasi baca, tanggal, views).
- **AI Blog Generator**: Draf artikel otomatis via Gemini langsung dari panel admin.
- **Call to Action**: Hubungi via telepon, email, WhatsApp + statistik tambahan.
- **Footer Lengkap**: Logo, quick links, alamat kantor, sosmed, dan legal links.

---

## Panduan Pengguna per Fitur

### 1. Manajemen Produk
1. Masuk ke **Admin → Produk**.
2. Klik **Tambah Produk** untuk membuat entri baru; unggah cover/thumbnail atau pakai URL eksternal.
3. Isi fitur produk per baris (otomatis dipisah menjadi bullet) dan tambahkan variasi harga di bagian *Variasi Harga*.
4. Simpan; jika Anda mengunggah gambar baru saat edit, file lama otomatis dibersihkan.

### 2. Portofolio Proyek
1. Buka **Admin → Proyek**.
2. Gunakan form untuk menyimpan detail klien, ringkasan, status dan tanggal mulai/selesai.
3. Kosongkan kolom cover lalu simpan jika ingin menghapus gambar lama (akan dihapus dari storage).

### 3. Blog & Gemini Generator
1. Masuk **Admin → Blog → Tulis Artikel**.
2. Isi konten manual atau gunakan kartu **Generate Konten Otomatis (Gemini)**:
   - Tuliskan topik, tone, audiens, CTA, dan kata kunci, lalu tekan **Generate**.
   - Draft akan mengisi judul, slug, ringkasan, body, outline, dan kata kunci; lakukan edit sebelum simpan.
3. Tandai **Publikasikan** untuk menerbitkan artikel; tanggal publish otomatis diisi jika dikosongkan.

### 4. Testimoni Klien
1. Akses **Admin → Testimoni**.
2. Isi nama, jabatan, perusahaan, rating, dan quote.
3. Unggah avatar atau beri URL; kosongkan kolom avatar saat edit untuk menghapus gambar lama.
4. Gunakan toggle **Aktif** untuk mengatur apakah testimoni tampil di landing.

### 5. Tim Manajemen
1. Buka **Admin → Tim**.
2. Atur urutan tampil dengan kolom **Urutan Tampil** (angka kecil = posisi lebih atas).
3. Lengkapi bio singkat dan tautan LinkedIn agar tampil di halaman Tentang Kami & blok showcase beranda.

### 6. Lowongan Karier
1. Masuk **Admin → Karier** (Job Positions).
2. Isi judul, departemen, lokasi, tipe kerja, rentang gaji, serta daftar persyaratan (dipisah baris).
3. Tandai **Aktif** agar lowongan tampil di halaman karier publik dan form lamaran.

### 7. Pengaturan Konten Landing
1. Gunakan **Admin → Setting Konten** untuk:
   - Mengaktifkan/menonaktifkan bagian beranda (hero, layanan, testimoni, tim, dsb.).
   - Mengedit hero beranda, ringkasan tentang, CTA akhir, statistik, serta konten hero produk/proyek/karier/blog.
2. Setiap teks mendukung multi-bahasa; pilih bahasa default lalu isi lokalisasi via tab.

### 8. Kontak & Lokasi Kantor
1. Masuk **Admin → Setting Konten → Informasi Perusahaan**.
2. Pada bagian **Kontak**, isi telepon, email, WhatsApp, serta:
   - **Judul lokasi**: label yang akan muncul di halaman kontak (mis. “Lokasi Kantor”).
   - **URL embed Google Maps**: salin nilai `src` dari iframe Maps untuk menampilkan peta.
3. Simpan; halaman kontak langsung memakai label & embed baru, sementara footer tetap memakai alamat.

### 9. Upload Media & Storage
1. Sebelum mengunggah, pastikan `php artisan storage:link` sudah dijalankan.
2. Semua input gambar membatasi ukuran (2–5 MB). Jika ukuran melebihi batas, validasi akan menolak.
3. File lama otomatis dihapus ketika Anda mengganti gambar cover/thumbnail/avatar.

### 10. Workflow Admin
1. Gunakan notifikasi flash (toast) sebagai penanda berhasil/gagal.
2. Jika validasi gagal, kolom akan menampilkan pesan spesifik; tidak perlu reload.
3. Pastikan menjalankan **php artisan queue:listen** bila fitur tertentu (email/AI) membutuhkan antrian.

---

## Teknologi & Arsitektur
- **Backend**: Laravel 12 + Inertia server adapter, queue menggunakan `php artisan queue:listen`.
- **Frontend**: React 19 + @inertiajs/react, Tailwind CSS 4, Radix UI, Lucide Icons, Framer Motion.
- **Asset Pipeline**: Vite 7 dengan Laravel Vite Plugin, dukungan SSR (`resources/js/ssr.tsx`).
- **Database**: MySQL/MariaDB default, SQLite siap pakai untuk dev (lihat `database/database.sqlite`).
- **Storage**: Disk `public` atau S3; jalankan `php artisan storage:link` setelah deploy.
- **Autentikasi**: Starter memakai Laravel Breeze (React-Inertia). Registrasi publik bisa dinonaktifkan.
- **Mail & Notifikasi**: Gunakan driver SMTP default Laravel untuk form kontak/karier.

---

## Struktur Proyek Singkat
```
resources/
  js/
    app.tsx          # entri utama Inertia + React
    pages/           # halaman publik (Beranda, Layanan, Proyek, Blog, dsb.)
    components/      # UI kit, elemen navigasi, slider, dsb.
    layouts/         # layout utama dengan header/footer
    hooks/, lib/, utils/, types/  # helper frontend
    ssr.tsx          # handler Inertia SSR
  views/app.blade.php # shell Blade untuk injeksi Inertia
```
Komponen backend utama berada pada `app/`, konfigurasi ada di `config/`, dan seeder awal tersedia di `database/seeders`.

---

## Konfigurasi `.env` Penting
- `APP_NAME`, `APP_URL`, `APP_ENV`, `APP_DEBUG`.
- `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.
- `FILESYSTEM_DISK` (`public` atau `s3`), `AWS_*` bila memakai S3.
- `MAIL_MAILER`, `MAIL_HOST`, `MAIL_FROM_ADDRESS`.
- `RECAPTCHA_ENABLED`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, serta pasangan `VITE_RECAPTCHA_*`.
- `QUEUE_CONNECTION=database/redis` bila memakai worker; aktifkan supervisor/systemd di produksi.

Setelah mengubah nilai `.env`, jalankan `php artisan config:clear && php artisan config:cache` agar perubahan dibaca ulang.

---

## Google reCAPTCHA v2
- Daftarkan kredensial **reCAPTCHA v2 (checkbox)**.
- Isi `RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` dan mirror nilainya ke variabel `VITE_RECAPTCHA_SITE_KEY`.
- Toggle `RECAPTCHA_ENABLED` & `VITE_RECAPTCHA_ENABLED` ke `false` jika ingin mematikannya sementara (misalnya di localhost).
- Restart Vite (`npm run dev`) setiap kali kunci diganti agar script baru termuat.


## Gemini Blog Generator
- Aktifkan Gemini API di Google AI Studio lalu isi `.env` dengan `GEMINI_API_KEY=<key>`, `GEMINI_MODEL=gemini-2.0-flash` (atau model lain yang tersedia), dan bila perlu override `GEMINI_API_ENDPOINT` / `GEMINI_API_VERSION`.
- Jalankan `php artisan config:clear` agar konfigurasi terbaca saat key diganti.
- Buka panel **Admin → Blog → Tulis Artikel** dan gunakan kartu "Generate Konten Otomatis (Gemini)" untuk mendeskripsikan topik, audiens, tone, CTA, serta keyword.
- Draft (judul, slug, ringkasan, konten HTML, outline, dan keyword) akan otomatis mengisi form artikel dan tetap bisa disunting sebelum disimpan/publish.
- Semua request dicatat melalui log Laravel; pastikan quota API memadai agar tombol generate tidak gagal.

---

## Akun & Akses Admin
- Registrasi dan reset password publik dinonaktifkan demi keamanan; akun diberikan oleh tim internal.
- Seeder default membuat akun `admin@example.id / password`. Ganti kredensial ini sebelum produksi.
- Untuk menambah akun: gunakan Seeder/Tinker atau modul manajemen pengguna setelah login.

---

## Upload File & Storage
- Set `FILESYSTEM_DISK=public` (lokal) atau `s3`.
- Gunakan helper `Storage::disk('public')->putFile()` untuk menyimpan gambar.
- Jalankan `php artisan storage:link` agar `public/storage` tersedia.
- Bila menggunakan CDN/S3, isi `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, dan `AWS_BUCKET`.

---

## Quality Assurance
```bash
php artisan test        # Unit & feature test Laravel / Pest
npm run lint            # ESLint React + Hooks
npm run types           # Pastikan deklarasi TS valid
npm run format:check    # Cek format dengan Prettier
```
Tambahkan React Testing Library / Playwright bila butuh uji antarmuka yang lebih kaya.

---

## Deployment Checklist
1. Siapkan server Ubuntu/Debian dengan PHP-FPM 8.2+, Nginx/Apache, Node.js 20, Supervisor.
2. Pull kode, jalankan `composer install --no-dev` dan `npm ci && npm run build`.
3. Salin `.env` produksi dan set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://domain`.
4. Jalankan `php artisan migrate --force` dan seed bila diperlukan.
5. Link storage, set permission `storage/` & `bootstrap/cache`.
6. Konfigurasi queue worker (`supervisorctl reread && update`).
7. Aktifkan HTTPS (Let's Encrypt / Cloudflare) dan caching level Nginx sesuai kebutuhan.

---

## Tips & Best Practice
- Gunakan route model binding + FormRequest untuk validasi konsisten.
- Validasi tetap dilakukan di backend walau sudah ada validasi interaktif di React.
- Simpan kredensial sensitif hanya di `.env` / secret manager.
- Gunakan CI/CD (GitHub Actions/GitLab CI) untuk lint + test otomatis sebelum merge.

---

## Kontribusi
- Fork repo, buat branch fitur (`feature/nama-fitur`), lalu ajukan PR ke `develop`/`main`.
- Sertakan unit test/feature test untuk perubahan signifikan dan pastikan `npm run lint` lulus.

---

## License
Gunakan lisensi yang sesuai kebutuhan (default `MIT`, bisa diganti jika organisasi mewajibkan).

---

## Kontak
- Nama Maintainer: \[Nama Anda]
- Email: [your.email@example.com](mailto:your.email@example.com)
- Website: [https://your-company.example](https://your-company.example)

---

Butuh penyesuaian tambahan? Silakan buat issue/PR untuk menambahkan paket tertentu, contoh `docker-compose`, atau workflow CI/CD.
