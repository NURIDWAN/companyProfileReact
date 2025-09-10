# Company Profile — Laravel 12 + React (Inertia)

> Aplikasi company profile menggunakan Laravel 12 sebagai backend dan React dengan Inertia.js sebagai frontend. Meniru struktur dan fitur dari situs comprof-laravel02.hancode.my.id.

---

## Fitur Utama
- **Navigasi Lengkap**: Produk, Beranda, Layanan, Tentang Kami, Karier, Proyek, Blog, Kontak, Galeri.
- **Hero Section Dinamis**: Judul, tagline, CTA “Konsultasi Gratis” & “Lihat Portfolio”, serta statistik (Layanan, Proyek, Klien, Pengalaman).
- **Tentang Kami**: Sejarah perusahaan (sejak 2015), deskripsi layanan, core values.
- **Layanan Unggulan**: Tiga layanan utama—Web, Mobile, ERP—plus link ke halaman detail layanan.
- **Proyek / Portfolio**: Tampilkan proyek unggulan dengan gambar, judul, kategori, tahun atau label “Live Site”, tombol “Lihat Detail”.
- **Testimoni Klien**: Quote, rating, nama & jabatan klien.
- **Keunggulan Kami**: Highlights seperti tim, teknologi, support, keamanan, hasil, dan partnership.
- **Blog & Insight**: Artikel terbaru dengan metadata (kategori, durasi baca, tanggal, views) dan tombol “Baca”.
- **Call to Action**: Ajak pengunjung untuk konsultasi atau lihat layanan, plus kontak via telepon, email, WhatsApp, dan statistik tambahan.
- **Footer Lengkap**: Logo, quick links, alamat kantor, kontak, media sosial, dan legal links.

---

## Teknologi & Arsitektur
- **Backend**: Laravel 12, Blade + Inertia.js (server-side render + API).
- **Frontend**: React + Inertia.js + Vite.
- **Database**: MySQL/MariaDB (SQLite untuk dev).
- **Storage**: lokal atau S3 (upload gambar).
- **Autentikasi**: Laravel Breeze (React-Inertia) atau Jetstream.
- **Mail**: Notifikasi kontak via email (opsional).

---

## Instalasi (Local)
```bash
git clone <repo-url>
cd <project-folder>
composer install
cp .env.example .env
npm install
php artisan key:generate
# Setting .env sesuai kebutuhan (DB, MAIL, S3, dsb.)
php artisan migrate --seed
npm run dev      # development (Vite dev server)
php artisan serve # akses di http://127.0.0.1:8000


## Pengaturan Inertia + React

* Jika belum terpasang, gunakan Laravel Breeze Inertia React untuk starter:

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
npm install && npm run dev
php artisan migrate
```

* Struktur komponen React berada di `resources/js/Pages` (setiap route Inertia -> Page React)
* Gunakan `Link` dari `@inertiajs/inertia-react` untuk navigasi tanpa reload

## Upload file & Storage

* Konfigurasi `FILESYSTEM_DRIVER` di `.env` (local atau s3)
* Gunakan `Storage::disk('public')->putFile()` untuk menyimpan gambar
* Jika pakai local, jalankan `php artisan storage:link` untuk publikasi storage

## Otentikasi & Role Admin

* Gunakan Breeze atau Jetstream untuk otentikasi cepat
* Tambahkan middleware `is_admin` atau role-based check untuk akses panel admin

## Deployment (ringkasan)

1. Siapkan server (Ubuntu / Debian) dengan PHP, Composer, Node.js
2. Pull repo dan install composer & npm dependencies
3. Set `.env` produksi, migrasi, seed jika perlu
4. Build assets: `npm run build`
5. Atur webserver (Nginx/Apache) pointing ke folder `public`
6. Gunakan supervisor / systemd untuk queue worker jika ada job/background
7. Gunakan HTTPS (Let's Encrypt)

## Testing

* Jalankan unit & feature test:

```bash
php artisan test
```

* Untuk testing frontend, bisa tambahkan testing setup dengan React Testing Library jika perlu

## Tips & Best Practice

* Gunakan model binding dan resource controllers untuk CRUD yang rapi
* Validasi input baik di frontend (informational) dan backend (authoritative)
* Simpan file sensitif (kunci, credential) hanya di `.env`
* Otomatiskan deploy dengan CI/CD (GitHub Actions / GitLab CI)

## Kontribusi

* Fork repository, buat branch fitur (`feature/your-feature`), lalu buat PR ke branch `develop` atau `main` sesuai alur project
* Pastikan menulis test untuk perubahan signifikan

## License

Lisensi proyek (sesuaikan): `MIT` atau lisensi lain yang diinginkan.

## Kontak

* Nama Maintainer: \[Nama Anda]
* Email: [your.email@example.com](mailto:your.email@example.com)
* Website: [https://your-company.example](https://your-company.example)

---

Jika Anda ingin, saya bisa:

* Menyesuaikan README dengan perintah/paket spesifik yang Anda gunakan (mis. `laravel-permission`, `spatie/laravel-medialibrary`, dsb.)
* Menambahkan contoh `docker-compose` untuk pengembangan
* Membuat badge CI/CD atau contoh GitHub Actions
