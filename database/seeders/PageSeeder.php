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
        // Clear all existing pages to start fresh
        Page::query()->forceDelete();

        $pages = [
            'home' => [
                'title' => 'Beranda',
                'meta_title' => 'Harmony Strategic Group | Mitra Bisnis Lintas Industri',
                'meta_description' => 'Kemitraan strategis yang membantu perusahaan di berbagai sektor meningkatkan kinerja dan mewujudkan transformasi bisnis.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'about' => [
                'title' => 'Tentang Kami',
                'meta_title' => 'Tentang Harmony Strategic Group',
                'meta_description' => 'Pelajari profil perusahaan, pengalaman lintas industri, dan nilai kolaborasi yang kami pegang.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'service' => [
                'title' => 'Layanan',
                'meta_title' => 'Layanan Konsultasi & Implementasi Bisnis',
                'meta_description' => 'Jelajahi layanan strategi, optimalisasi proses, pengembangan talenta, dan inisiatif transformasi yang kami tawarkan.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'product' => [
                'title' => 'Produk',
                'meta_title' => 'Program & Solusi Harmony Strategic Group',
                'meta_description' => 'Kumpulan program siap pakai untuk meningkatkan efisiensi, kualitas layanan, dan pengalaman pelanggan.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'project' => [
                'title' => 'Proyek',
                'meta_title' => 'Portofolio Proyek Harmony Strategic Group',
                'meta_description' => 'Kisah keberhasilan dan hasil terukur yang kami capai bersama mitra di berbagai sektor.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'career' => [
                'title' => 'Karier',
                'meta_title' => 'Karier di Harmony Strategic Group',
                'meta_description' => 'Temukan kesempatan berkarier dan berkembang bersama tim konsultan lintas industri.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'blog' => [
                'title' => 'Blog',
                'meta_title' => 'Insight Bisnis & Industri',
                'meta_description' => 'Artikel seputar tren industri, strategi operasional, dan pembaruan seputar transformasi bisnis.',
                'status' => 'published',
                'published_at' => now(),
            ],
            'contact' => [
                'title' => 'Kontak',
                'meta_title' => 'Hubungi Harmony Strategic Group',
                'meta_description' => 'Diskusikan tantangan bisnis Anda dan temukan solusi yang relevan bersama tim kami.',
                'status' => 'published',
                'published_at' => now(),
            ],
        ];

        $rootOrder = 0;
        foreach ($pages as $slug => $data) {
            Page::create([
                'slug' => $slug,
                'parent_id' => null,
                'title' => $data['title'],
                'meta_title' => $data['meta_title'],
                'meta_description' => $data['meta_description'],
                'display_order' => $rootOrder++,
                'status' => $data['status'],
                'published_at' => $data['published_at'],
            ]);
        }
    }
}
