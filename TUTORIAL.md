# Tutorial Lengkap: Setup Local & Deploy ke cPanel

> Panduan rinci untuk menjalankan aplikasi Company Profile (Laravel 12 + React 19 + Inertia.js) di local development dan deploy ke cPanel hosting.

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Persyaratan Sistem](#2-persyaratan-sistem)
3. [Setup di Local Development](#3-setup-di-local-development)
4. [Deploy ke cPanel (Manual via SSH)](#4-deploy-ke-cpanel-manual-via-ssh)
5. [Deploy Otomatis via GitHub Actions](#5-deploy-otomatis-via-github-actions)
6. [Troubleshooting Umum](#6-troubleshooting-umum)

---

## 1. Pendahuluan

Aplikasi ini adalah **Company Profile** modern yang dibangun dengan:

| Komponen | Teknologi                             |
| -------- | ------------------------------------- |
| Backend  | Laravel 12                            |
| Frontend | React 19 + TypeScript                 |
| Routing  | Inertia.js (SPA tanpa API terpisah)   |
| Styling  | Tailwind CSS 4                        |
| Bundler  | Vite 7                                |
| Database | MySQL / MariaDB / PostgreSQL / SQLite |

### Fitur Utama:

- Landing page dinamis dengan hero, layanan, portfolio, testimoni
- Blog dengan AI generator (OpenRouter/Gemini)
- Panel admin lengkap
- Multi-bahasa (Indonesia & English)
- SEO friendly

---

## 2. Persyaratan Sistem

### 2.1 Local Development

| Software      | Versi Minimum   | Cara Cek          |
| ------------- | --------------- | ----------------- |
| PHP           | 8.2+            | `php -v`          |
| Composer      | 2.6+            | `composer -V`     |
| Node.js       | 18.18+ atau 20+ | `node -v`         |
| npm           | 10+             | `npm -v`          |
| MySQL/MariaDB | 8+ / 10.6+      | `mysql --version` |

**Ekstensi PHP yang diperlukan:**

```
BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, PDO_MySQL, Tokenizer, XML, cURL
```

Cek ekstensi PHP:

```bash
php -m | grep -E "bcmath|ctype|fileinfo|json|mbstring|openssl|pdo|tokenizer|xml|curl"
```

### 2.2 cPanel Hosting

| Kebutuhan  | Keterangan                             |
| ---------- | -------------------------------------- |
| PHP        | 8.2+ (pilih via MultiPHP Manager)      |
| MySQL      | 8+ atau MariaDB 10.6+                  |
| Node.js    | Via "Setup Node.js App" atau akses SSH |
| SSH Access | **WAJIB** untuk install dependencies   |
| Disk Space | Minimal 500MB                          |

---

## 3. Setup di Local Development

### 3.1 Clone Repository

```bash
# Clone dari GitHub
git clone https://github.com/alvaerasolution-alt/hondaCiledugCompany.git company-profile

# Masuk ke direktori project
cd company-profile
```

### 3.2 Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3.3 Konfigurasi Environment

```bash
# Salin file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3.4 Edit File .env

Buka file `.env` dengan text editor dan sesuaikan:

```env
# ================================
# KONFIGURASI APLIKASI
# ================================
APP_NAME="Nama Perusahaan Anda"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# ================================
# KONFIGURASI DATABASE
# ================================
# Opsi 1: SQLite (paling mudah untuk development)
DB_CONNECTION=sqlite

# Opsi 2: MySQL/MariaDB
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=nama_database
# DB_USERNAME=root
# DB_PASSWORD=password_anda

# ================================
# KONFIGURASI LAINNYA
# ================================
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
```

### 3.5 Setup Database

**Jika menggunakan SQLite:**

```bash
# Buat file database SQLite
touch database/database.sqlite

# Jalankan migrasi
php artisan migrate
```

**Jika menggunakan MySQL/MariaDB:**

```bash
# Buat database di MySQL terlebih dahulu
mysql -u root -p -e "CREATE DATABASE nama_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Jalankan migrasi
php artisan migrate
```

### 3.6 Seed Data Awal (Opsional)

```bash
# Isi database dengan data contoh
php artisan db:seed
```

> **Catatan:** Seeder akan membuat akun admin default:
>
> - Email: `admin@example.id`
> - Password: `password`
>
> **GANTI KREDENSIAL INI** sebelum production!

### 3.7 Link Storage

```bash
# Buat symbolic link untuk akses file publik
php artisan storage:link
```

### 3.8 Menjalankan Aplikasi

**Cara 1: Jalankan semua service sekaligus (RECOMMENDED)**

```bash
composer dev
```

Perintah ini akan menjalankan:

- PHP development server (http://127.0.0.1:8000)
- Queue listener (untuk background jobs)
- Vite dev server (untuk hot reload frontend)

**Cara 2: Jalankan terpisah (di terminal berbeda)**

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev

# Terminal 3: Queue listener (opsional, untuk fitur email/AI)
php artisan queue:listen
```

### 3.9 Akses Aplikasi

- **Landing Page:** http://localhost:8000
- **Admin Panel:** http://localhost:8000/login

---

## 4. Deploy ke cPanel (Manual via SSH)

### 4.1 Persiapan Struktur Folder

Struktur folder yang direkomendasikan di cPanel:

```
/home/username/
├── domains/
│   └── namadomain.com/
│       ├── laravel/          ← Kode Laravel (di LUAR public_html)
│       │   ├── app/
│       │   ├── bootstrap/
│       │   ├── config/
│       │   ├── database/
│       │   ├── resources/
│       │   ├── routes/
│       │   ├── storage/
│       │   ├── vendor/
│       │   ├── node_modules/
│       │   ├── .env
│       │   └── ...
│       │
│       └── public_html/      ← Document root (hanya file publik)
│           ├── build/        ← Asset hasil compile Vite
│           ├── storage/      ← Symlink ke laravel/storage/app/public
│           ├── index.php     ← Entry point (custom)
│           ├── robots.txt
│           └── favicon.ico
```

> **PENTING:** Folder `laravel/` harus berada di LUAR `public_html` untuk keamanan. File `.env`, `vendor/`, dan kode PHP tidak boleh bisa diakses publik!

### 4.2 Login SSH ke Server

```bash
ssh username@namadomain.com -p 65002
# atau
ssh username@IP_SERVER -p 65002
```

> Port SSH bisa berbeda tergantung hosting. Cek di cPanel > SSH Access.

### 4.3 Buat Struktur Folder

```bash
# Masuk ke direktori domain
cd ~/domains/namadomain.com

# Buat folder laravel
mkdir -p laravel
cd laravel
```

### 4.4 Clone atau Upload Project

**Opsi A: Clone dari GitHub (Recommended)**

```bash
git clone https://github.com/username/repo-anda.git .
```

**Opsi B: Upload via File Manager/FTP**

1. Compress project menjadi `.zip`
2. Upload ke `~/domains/namadomain.com/laravel/`
3. Extract via SSH:
    ```bash
    unzip nama-file.zip
    ```

### 4.5 Setup Environment Production

```bash
# Salin template production
cp .deploy/.env.production .env

# Edit file .env
nano .env
```

**Konfigurasi yang WAJIB diubah:**

```env
APP_NAME="Nama Perusahaan"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://namadomain.com

# Database - SESUAIKAN dengan info dari cPanel > MySQL Databases
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=username_namadb      # Format: cpaneluser_namadb
DB_USERNAME=username_userdb      # Format: cpaneluser_userdb
DB_PASSWORD=password_database_anda

# Session domain (untuk subdomain gunakan titik di depan)
SESSION_DOMAIN=.namadomain.com
```

### 4.6 Buat Database di cPanel

1. Login ke **cPanel**
2. Buka **MySQL Databases**
3. **Create New Database:** Masukkan nama (misal: `companydb`)
4. **Add New User:** Buat user dengan password kuat
5. **Add User to Database:** Berikan privilege **ALL PRIVILEGES**
6. Catat nama database dan user (format: `cpaneluser_namadb`)

### 4.7 Install PHP Dependencies

```bash
# Set environment variable agar Composer bisa berjalan
export COMPOSER_ALLOW_SUPERUSER=1

# Install dependencies (tanpa dev dependencies)
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
```

### 4.8 Setup Node.js dan Build Assets

**Cek apakah Node.js tersedia:**

```bash
node -v
npm -v
```

**Jika Node.js belum ada, setup via nvm:**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20
```

**Install dan build:**

```bash
# Install dependencies
npm install

# Build untuk production
npm run build
```

### 4.9 Copy File Publik ke public_html

```bash
# Sync folder public ke public_html
rsync -av --delete \
  --exclude='.htaccess' \
  --exclude='storage' \
  ~/domains/namadomain.com/laravel/public/ \
  ~/domains/namadomain.com/public_html/

# Copy custom index.php untuk production
cp ~/domains/namadomain.com/laravel/.deploy/index.php \
   ~/domains/namadomain.com/public_html/index.php
```

### 4.10 Setup Symlink Storage

```bash
# Buat symlink untuk akses file upload
ln -sfn ~/domains/namadomain.com/laravel/storage/app/public \
        ~/domains/namadomain.com/public_html/storage
```

### 4.11 Set Permissions

```bash
cd ~/domains/namadomain.com/laravel

# Set permission untuk storage dan cache
chmod -R 775 storage bootstrap/cache
chown -R $USER:$USER storage bootstrap/cache
```

### 4.12 Jalankan Migrasi Database

```bash
cd ~/domains/namadomain.com/laravel

# Jalankan migrasi
php artisan migrate --force

# (Opsional) Seed data awal
php artisan db:seed --force
```

### 4.13 Optimize Laravel

```bash
# Bersihkan cache lama
php artisan optimize:clear

# Cache konfigurasi untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Link storage
php artisan storage:link
```

### 4.14 Verifikasi Deployment

1. Buka browser dan akses `https://namadomain.com`
2. Cek halaman login admin: `https://namadomain.com/login`
3. Pastikan gambar/asset muncul dengan benar

---

## 5. Deploy Otomatis via GitHub Actions

Project ini sudah dikonfigurasi untuk auto-deploy ke hosting setiap kali ada push ke branch `main`.

### 5.1 Setup GitHub Secrets

Buka repository di GitHub > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

Tambahkan secrets berikut:

| Secret Name    | Value                   | Contoh                                 |
| -------------- | ----------------------- | -------------------------------------- |
| `SSH_HOST`     | Hostname atau IP server | `namadomain.com` atau `123.45.67.89`   |
| `SSH_USERNAME` | Username cPanel/SSH     | `u123456789`                           |
| `SSH_PASSWORD` | Password cPanel/SSH     | `passwordanda123`                      |
| `SSH_PORT`     | Port SSH                | `65002` (atau `22` tergantung hosting) |

### 5.2 Cara Kerja Workflow

File workflow ada di `.github/workflows/deploy.yml`:

```yaml
on:
    push:
        branches: ['main'] # Trigger saat push ke main
    workflow_dispatch: # Bisa trigger manual dari GitHub
```

**Langkah yang dijalankan:**

1. Connect ke server via SSH
2. Pull kode terbaru dari GitHub
3. Install Composer dependencies
4. Install npm dependencies & build
5. Sync file publik ke public_html
6. Optimize Laravel (cache config, route, view)
7. Jalankan migrasi database

### 5.3 Trigger Deployment

**Otomatis:** Push/merge ke branch `main`

```bash
git add .
git commit -m "feat: tambah fitur baru"
git push origin main
```

**Manual:**

1. Buka GitHub repository
2. Klik tab **Actions**
3. Pilih workflow **Deploy Production**
4. Klik **Run workflow**

### 5.4 Monitor Deployment

1. Buka tab **Actions** di GitHub
2. Klik workflow run yang sedang berjalan
3. Lihat log untuk setiap step
4. Jika gagal, baca error message untuk troubleshoot

---

## 6. Troubleshooting Umum

### 6.1 Error 500 / Halaman Blank

**Penyebab umum:**

- File `.env` tidak ada atau salah konfigurasi
- Permission folder `storage/` atau `bootstrap/cache/` tidak benar
- APP_KEY belum di-generate

**Solusi:**

```bash
cd ~/domains/namadomain.com/laravel

# Cek apakah .env ada
ls -la .env

# Cek permission
ls -la storage/
ls -la bootstrap/cache/

# Fix permission
chmod -R 775 storage bootstrap/cache

# Generate key jika belum
php artisan key:generate

# Clear cache
php artisan optimize:clear
```

**Cek log error:**

```bash
tail -100 storage/logs/laravel.log
```

### 6.2 Asset/CSS/JS Tidak Muncul

**Penyebab:**

- Build belum dijalankan
- File build tidak tercopy ke public_html
- Path asset salah

**Solusi:**

```bash
# Rebuild assets
npm run build

# Copy ulang ke public_html
rsync -av --delete \
  --exclude='.htaccess' \
  --exclude='storage' \
  ~/domains/namadomain.com/laravel/public/ \
  ~/domains/namadomain.com/public_html/
```

**Cek manifest:**

```bash
cat ~/domains/namadomain.com/public_html/build/manifest.json
```

### 6.3 Gambar Upload Tidak Muncul

**Penyebab:**

- Symlink storage tidak ada atau salah

**Solusi:**

```bash
# Hapus symlink lama jika ada
rm ~/domains/namadomain.com/public_html/storage

# Buat symlink baru
ln -sfn ~/domains/namadomain.com/laravel/storage/app/public \
        ~/domains/namadomain.com/public_html/storage

# Verifikasi
ls -la ~/domains/namadomain.com/public_html/storage
```

### 6.4 Database Connection Error

**Error:** `SQLSTATE[HY000] [2002] Connection refused`

**Penyebab:**

- Kredensial database salah
- Database belum dibuat
- User tidak punya akses ke database

**Solusi:**

1. Cek kredensial di `.env`
2. Pastikan database ada di cPanel > MySQL Databases
3. Pastikan user sudah ditambahkan ke database dengan ALL PRIVILEGES

**Test koneksi:**

```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

### 6.5 Permission Denied saat Upload

**Penyebab:**

- Folder `storage/app/public` tidak writable

**Solusi:**

```bash
chmod -R 775 ~/domains/namadomain.com/laravel/storage
```

### 6.6 Composer/npm Command Not Found

**Untuk Composer:**

```bash
# Download Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# Gunakan dengan php
php composer.phar install
```

**Untuk npm/Node.js:**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node
nvm install 20
nvm use 20
```

### 6.7 Mixed Content Warning (HTTP/HTTPS)

**Penyebab:**

- APP_URL di `.env` menggunakan http, bukan https

**Solusi:**

```bash
# Edit .env
nano .env

# Ubah:
APP_URL=https://namadomain.com

# Clear cache
php artisan config:cache
```

### 6.8 GitHub Actions Timeout

**Penyebab:**

- `npm install` atau `npm run build` terlalu lama
- Koneksi SSH terputus

**Solusi:**

- Pastikan `command_timeout` di workflow cukup besar (default 30m)
- Coba jalankan manual via SSH untuk debug

---

## 7. Perintah Berguna

### Development

```bash
# Jalankan semua service
composer dev

# Jalankan test
php artisan test

# Check code style
npm run lint
./vendor/bin/pint

# Format code
npm run format
```

### Production

```bash
# Maintenance mode ON
php artisan down

# Maintenance mode OFF
php artisan up

# Clear semua cache
php artisan optimize:clear

# Cache ulang
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Cek log terbaru
tail -f storage/logs/laravel.log

# Jalankan queue manual
php artisan queue:work --tries=3
```

### Database

```bash
# Fresh migrate (HAPUS SEMUA DATA!)
php artisan migrate:fresh --seed

# Rollback migration terakhir
php artisan migrate:rollback

# Cek status migrasi
php artisan migrate:status
```

---

## 8. Kontak & Support

Jika mengalami kendala yang tidak tercakup di tutorial ini:

1. Buat **Issue** di repository GitHub
2. Sertakan:
    - Langkah yang sudah dilakukan
    - Error message lengkap
    - Screenshot jika perlu
    - Versi PHP, Node.js, dan Composer

---

**Terakhir diupdate:** Februari 2026
