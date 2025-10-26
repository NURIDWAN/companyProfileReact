<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $author = User::first() ?? User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);

        BlogPost::query()->truncate();

        $posts = [
            [
                'title' => 'Membangun Platform Pemerintahan Digital yang Andal',
                'slug' => 'membangun-platform-pemerintahan-digital',
                'excerpt' => 'Belajar dari implementasi portal layanan publik terpadu yang kami kembangkan bersama pemerintah daerah.',
                'body' => 'Transformasi digital di sektor publik membutuhkan pendekatan kolaboratif antara tim teknis, domain expert, dan warga. Artikel ini mengulas tahapan discovery, pengembangan, hingga change management.',
                'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Studi Kasus: Modernisasi Infrastruktur Data untuk Korporasi',
                'slug' => 'modernisasi-infrastruktur-data',
                'excerpt' => 'Bagaimana kami membantu perusahaan energi melakukan konsolidasi data realtime untuk analisis operasional.',
                'body' => 'Modernisasi data bukan sekadar memindahkan data ke cloud. Dibutuhkan strategi governance, orkestrasi pipeline, dan enablement tim internal agar manfaatnya optimal.',
                'cover_image' => 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(12),
            ],
            [
                'title' => 'Checklist Kesiapan Transformasi Digital untuk UMKM',
                'slug' => 'checklist-transformasi-digital-umkm',
                'excerpt' => 'Panduan praktis langkah awal digitalisasi yang telah kami validasi bersama ratusan UMKM.',
                'body' => 'Artikel ini membahas aspek proses bisnis, people, teknologi, dan pendanaan yang perlu disiapkan sebelum mengadopsi solusi digital.',
                'cover_image' => 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(20),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create([
                'author_id' => $author->id,
                ...$post,
            ]);
        }
    }
}
