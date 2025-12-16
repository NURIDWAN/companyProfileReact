<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PageSeeder extends Seeder
{
    /**
     * Seed pages yang benar-benar ada di menu.
     * Konten halaman sekarang menggunakan sistem Section.
     */
    public function run(): void
    {
        $pages = [
            // Halaman utama yang ada di menu
            [
                'title' => 'Beranda',
                'slug' => 'home',
                'meta_description' => 'Selamat datang di website kami. Kami siap melayani Anda dengan sepenuh hati.',
            ],
            [
                'title' => 'Tentang Kami',
                'slug' => 'about',
                'meta_description' => 'Kami adalah organisasi yang berkomitmen untuk memberikan layanan terbaik.',
            ],
            [
                'title' => 'Layanan',
                'slug' => 'service',
                'meta_description' => 'Temukan berbagai layanan unggulan yang kami tawarkan untuk memenuhi kebutuhan Anda.',
            ],
            [
                'title' => 'Produk',
                'slug' => 'product',
                'meta_description' => 'Jelajahi produk-produk unggulan yang kami tawarkan.',
            ],
            [
                'title' => 'Proyek',
                'slug' => 'project',
                'meta_description' => 'Lihat berbagai proyek yang telah kami kerjakan dengan sukses.',
            ],
            [
                'title' => 'Karier',
                'slug' => 'career',
                'meta_description' => 'Temukan peluang karier dan berkembang bersama tim kami.',
            ],
            [
                'title' => 'Blog',
                'slug' => 'blog',
                'meta_description' => 'Baca artikel, berita, dan pengumuman terbaru dari kami.',
            ],
            [
                'title' => 'Kontak',
                'slug' => 'contact',
                'meta_description' => 'Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.',
            ],
        ];

        foreach ($pages as $index => $data) {
            Page::firstOrCreate(
                ['slug' => $data['slug'], 'parent_id' => null],
                array_merge($data, [
                    'display_order' => $index,
                    'meta_title' => $data['title'],
                ])
            );
        }
    }
}
