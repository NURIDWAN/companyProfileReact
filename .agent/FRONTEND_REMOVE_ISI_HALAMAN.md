# Update: Menghapus Field "Isi Halaman" dari Form Pages

## Tanggal: 2025-12-16

## Perubahan Frontend

### File yang Diupdate
`resources/js/pages/admin/pages/Form.tsx`

### Perubahan Detail

#### 1. **Type PagePayload**
Menghapus field `body`:
```tsx
type PagePayload = {
    id: number;
    parent_id?: number | null;
    title: string;
    slug: string;
    // body?: string | null; ❌ DIHAPUS
    status: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string[] | null;
    published_at?: string | null;
    display_order?: number | null;
    sections?: SectionPayload[];
};
```

#### 2. **Form State**
Menghapus `body` dari useForm:
```tsx
const form = useForm({
    parent_id: page?.parent_id ?? null,
    title: page?.title ?? "",
    slug: page?.slug ?? "",
    // body: page?.body ?? "", ❌ DIHAPUS
    meta_title: page?.meta_title ?? "",
    // ...
});
```

#### 3. **UI Field "Isi Halaman"**
**SEBELUM:**
```tsx
<div className="md:col-span-2 grid gap-3">
    <Label>Isi Halaman</Label>
    <RichTextEditor value={data.body} onChange={(value) => setData("body", value)} />
    <InputError message={errors.body} />
</div>
```

**SESUDAH:**
Field ini **DIHAPUS SEPENUHNYA** ❌

#### 4. **Preview Dialog**
Dialog preview yang menampilkan `body` juga dihapus:
```tsx
// ❌ DIHAPUS
<Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
    <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
    </DialogContent>
</Dialog>
```

#### 5. **Unused Imports**
Menghapus import yang tidak terpakai:
```tsx
// ❌ DIHAPUS
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sanitizeRichText } from "@/utils/sanitize-html";
```

## Form Sekarang

### Field yang Masih Ada:

**Metadata Halaman:**
- ✅ Judul
- ✅ Slug URL
- ✅ Halaman Induk (dropdown)
- ✅ Status (checkbox "Terbitkan halaman")
- ✅ Tanggal Publish (opsional)
- ✅ Urutan

**SEO:**
- ✅ Meta Title
- ✅ Meta Description
- ✅ Meta Keywords

**Konten (via Sections):**
- ✅ Sections (Anchor) - List sections dengan:
  - Title section
  - Slug (anchor)
  - Urutan
  - Tipe section (dropdown)
  - Konten (berbeda tergantung tipe)
  - Tombol: Tambah Section, Up/Down, Delete

### Field yang Dihapus:

❌ **Isi Halaman** (Rich Text Editor)
❌ **Preview Button**
❌ **Preview Dialog**

## Workflow Baru Menambah/Edit Halaman

### 1. Di Form Halaman (admin/pages/create atau admin/pages/{id}/edit)

**Isi metadata:**
- Judul halaman
- Slug URL
- Status publish
- Meta SEO

**Tambahkan Sections:**
- Klik "Tambah Section"
- Pilih tipe section:
  - **Plain**: HTML biasa (menggunakan Rich Text Editor)
  - **Hero - Home**: Field khusus hero (heading, description, buttons, image)
  - **About - Intro**: Field about (heading, description, highlights, image)
  - **Service Overview**: Field layanan
  - dll.

### 2. Atau dari Menu Management (admin/menus)

- Klik icon edit (✏️) di samping page
- Klik "Kelola Konten"
- Langsung edit sections dengan drag & drop interface yang lebih powerful

## Keuntungan

✅ **Konsisten**: Satu cara untuk mengelola konten (sections)
✅ **Lebih Powerful**: Sections mendukung berbagai tipe konten (hero, about, service, dll)
✅ **Lebih Flexible**: Bisa reorder, toggle aktif/nonaktif per section
✅ **Better UX**: Drag & drop interface di menu management
✅ **Anchor Links**: Setiap section punya anchor untuk direct linking

## Screenshot

**BEFORE:**
```
┌─────────────────────────────────────┐
│ Judul: [Tentang Kami]               │
│ Slug: [tentang-kami]                │
│ Status: ☑ Terbitkan                 │
│ Urutan: [0]                         │
│                                     │
│ Isi Halaman:                        │ ❌ DIHAPUS
│ ┌─────────────────────────────────┐ │
│ │ [Rich Text Editor]              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Sections (Anchor):                  │
│ ...                                 │
└─────────────────────────────────────┘
```

**AFTER:**
```
┌─────────────────────────────────────┐
│ Judul: [Tentang Kami]               │
│ Slug: [tentang-kami]                │
│ Status: ☑ Terbitkan                 │
│ Urutan: [0]                         │
│                                     │
│ Meta Title: [....]                  │
│ Meta Description: [...]             │
│ Meta Keywords: [...]                │
│                                     │
│ Sections (Anchor):                  │ ✅ KONTEN DI SINI
│ ┌─────────────────────────────────┐ │
│ │ ☑ [Profil] [profil] ⋮ ╳        │ │
│ │ Tipe: Plain                     │ │
│ │ [Rich Text Editor]              │ │
│ ├─────────────────────────────────┤ │
│ │ ☑ [Sambutan] [sambutan] ⋮ ╳    │ │
│ │ Tipe: Plain                     │ │
│ │ [Rich Text Editor]              │ │
│ └─────────────────────────────────┘ │
│ [+ Tambah Section]                  │
└─────────────────────────────────────┘
```

## Testing

### ✅ Build Berhasil
```bash
ddev exec npm run build
# ✓ built in 37.00s
```

### ✅ Test Manual
1. Login ke admin panel
2. Buka **Halaman** → **Tambah Halaman Baru**
3. Verifikasi:
   - ✅ Field "Isi Halaman" sudah tidak ada
   - ✅ Bisa tambah section
   - ✅ Bisa edit section dengan tipe yang berbeda
   - ✅ Form submit berhasil tanpa field `body`
4. Buka **Edit Halaman**
5. Verifikasi:
   - ✅ Sections yang sudah ada ditampilkan
   - ✅ Bisa edit, hapus, reorder sections
   - ✅ Save berhasil

### ✅ Test via Menu Management
1. Buka **Kelola Menu**
2. Klik icon edit di samping page
3. Klik **Kelola Konten**
4. Verifikasi:
   - ✅ Interface drag & drop berfungsi
   - ✅ Bisa edit konten dengan rich text editor
   - ✅ Simpan berhasil

## Migrasi Data Lama

Jika ada data lama dengan field `body` yang terisi, data tersebut sudah **dihapus dari database** (kolom body sudah di-drop).

Jika ingin memigrasikan konten lama ke sections:
1. Buat script migration manual (PHP artisan command)
2. Ambil data lama dari backup
3. Convert body HTML ke section pertama dengan tipe "plain"

**Catatan:** Karena seeder sudah tidak mengisi `body`, semua data baru akan langsung menggunakan sections.

## Kesimpulan

✅ Field "Isi Halaman" telah dihapus sepenuhnya dari frontend
✅ Semua konten sekarang dikelola melalui Sections
✅ Form lebih clean dan fokus pada metadata + sections
✅ UX lebih baik dengan sistem sections yang powerful
