# Refactoring: Menghapus Field Body dari Pages

## Tanggal: 2025-12-16

## Motivasi
Sebelumnya, tabel `pages` memiliki field `body` yang digunakan untuk menyimpan konten halaman dalam format HTML. Namun, sekarang kita sudah memiliki sistem **Page Sections** yang lebih powerful dan fleksibel untuk mengelola konten halaman.

Mempertahankan field `body` dan `sections` secara bersamaan:
- ❌ Membingungkan: Ada 2 tempat untuk menyimpan konten
- ❌ Tidak efisien: Duplikasi data
- ❌ Maintenance lebih sulit: Harus maintain 2 sistem konten

## Solusi
**Menghapus field `body` sepenuhnya** dan menggunakan sistem `sections` saja untuk semua konten halaman.

## Perubahan yang Dilakukan

### 1. **Migration Baru**
File: `database/migrations/2025_12_15_222709_remove_body_from_pages_table.php`

```php
public function up(): void
{
    Schema::table('pages', function (Blueprint $table) {
        // Hapus kolom body karena sekarang menggunakan sections
        $table->dropColumn('body');
    });
}
```

### 2. **Model Page**
File: `app/Models/Page.php`

Menghapus `'body'` dari array `$fillable`:
```php
protected $fillable = [
    'parent_id',
    'title',
    'slug',
    // 'body', // ❌ Dihapus
    'status',
    'meta_title',
    'meta_description',
    // ...
];
```

### 3. **PageSeeder**
File: `database/seeders/PageSeeder.php`

Sekarang hanya menyimpan metadata halaman (title, slug, meta_description), **tidak ada konten HTML lagi**:

```php
$pages = [
    [
        'title' => 'Beranda',
        'slug' => 'home',
        'meta_description' => 'Selamat datang di website kami...',
        // ❌ Tidak ada 'body' lagi
    ],
    // ...
];
```

### 4. **MenuItemController**
File: `app/Http/Controllers/Admin/MenuItemController.php`

Menghapus referensi ke field `body`:
- ❌ Tidak select field `body` lagi
- ✅ `has_content` sekarang hanya cek jumlah sections

```php
'pages' => Page::query()
    ->select('id', 'title', 'slug') // Tidak ada 'body'
    ->withCount(['sections as sections_count'])
    // ...
    'has_content' => ($page->sections_count ?? 0) > 0, // Hanya dari sections
```

## Struktur Baru Pages Table

```
+------------------+---------------------+------+-----+---------+
| Field            | Type                | Null | Key | Default |
+------------------+---------------------+------+-----+---------+
| id               | bigint unsigned     | NO   | PRI | NULL    |
| parent_id        | bigint unsigned     | YES  | MUL | NULL    |
| title            | varchar(255)        | NO   |     | NULL    |
| slug             | varchar(160)        | NO   |     | NULL    |
| status           | varchar(20)         | NO   | MUL | draft   |
| meta_title       | varchar(180)        | YES  |     | NULL    |
| meta_description | text                | YES  |     | NULL    |
| meta_keywords    | longtext            | YES  |     | NULL    |
| published_at     | timestamp           | YES  |     | NULL    |
| display_order    | int unsigned        | NO   |     | 0       |
| created_by       | bigint unsigned     | YES  | MUL | NULL    |
| updated_by       | bigint unsigned     | YES  | MUL | NULL    |
| created_at       | timestamp           | YES  |     | NULL    |
| updated_at       | timestamp           | YES  |     | NULL    |
| deleted_at       | timestamp           | YES  |     | NULL    |
+------------------+---------------------+------+-----+---------+
```

**❌ Kolom `body` sudah tidak ada!**

## Workflow Baru untuk Konten Halaman

### Membuat Halaman Baru

1. **Buat Page** (hanya metadata)
   ```php
   Page::create([
       'title' => 'Halaman Baru',
       'slug' => 'halaman-baru',
       'meta_description' => 'Deskripsi halaman...',
   ]);
   ```

2. **Tambahkan Sections** (konten sebenarnya)
   - Login ke admin panel
   - Buka **Kelola Menu**
   - Klik ikon edit pada halaman
   - Klik **Kelola Konten**
   - Tambahkan section dan isi kontennya
   - Simpan

### Keuntungan Sistem Sections

✅ **Lebih Terstruktur**: Konten terbagi dalam section-section yang terorganisir
✅ **Lebih Fleksibel**: Bisa reorder, toggle aktif/nonaktif per section
✅ **Lebih Mudah Dikelola**: Edit konten section by section, tidak perlu scroll panjang
✅ **Support Anchor Links**: Setiap section punya slug untuk direct link (#slug)
✅ **WYSIWYG Editor**: Edit konten dengan rich text editor
✅ **Drag & Drop**: Atur urutan section dengan mudah

## Cara Menjalankan Migration

Jika Anda sudah punya data lama dengan field `body`:

```bash
# Jalankan migration
ddev exec php artisan migrate --force

# Re-seed pages (opsional, jika ingin data fresh)
ddev exec php artisan db:seed --class=PageSeeder --force

# Re-seed page sections (opsional)
ddev exec php artisan db:seed --class=PageSectionSeeder --force
```

## Rollback (Jika Diperlukan)

Jika perlu rollback dan mengembalikan field `body`:

```bash
ddev exec php artisan migrate:rollback --step=1 --force
```

Migration akan otomatis menambahkan kembali kolom `body` sebagai `longText` nullable.

## Testing

### ✅ Verifikasi Perubahan

1. **Cek struktur tabel**:
   ```bash
   ddev exec mysql -udb -pdb -Ddb -e "DESCRIBE pages;"
   ```
   Pastikan kolom `body` tidak ada.

2. **Cek data pages**:
   ```bash
   ddev exec mysql -udb -pdb -Ddb -e "SELECT id, title, slug FROM pages;"
   ```

3. **Cek sections**:
   ```bash
   ddev exec mysql -udb -pdb -Ddb -e "SELECT ps.id, p.slug as page_slug, ps.title, ps.slug as section_slug FROM page_sections ps JOIN pages p ON ps.page_id = p.id ORDER BY p.slug, ps.display_order;"
   ```

### ✅ Test di Admin Panel

1. Login ke admin panel
2. Buka **Kelola Menu**
3. Cek bahwa semua pages terdeteksi punya konten (via sections)
4. Klik **Kelola Konten** pada salah satu page
5. Pastikan bisa:
   - ✅ Edit section
   - ✅ Tambah section baru
   - ✅ Hapus section
   - ✅ Reorder section (drag & drop)
   - ✅ Toggle aktif/nonaktif section
   - ✅ Simpan perubahan

## Kesimpulan

Dengan menghapus field `body`, sistem konten halaman sekarang:
- ✅ Lebih konsisten (hanya 1 sumber konten: sections)
- ✅ Lebih powerful (fitur drag & drop, toggle, anchor links)
- ✅ Lebih mudah di-maintain
- ✅ Lebih efisien (tidak ada duplikasi)

**Semua konten halaman sekarang dikelola melalui Page Sections!** 🎉
