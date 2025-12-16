<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use App\Models\Page;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        // Hanya buat menu untuk halaman yang benar-benar ada.
        $structure = [
            [
                'title' => 'Beranda',
                'slug' => 'home',
                'path' => '/',
                'children' => [
                    ['title' => 'Hero', 'anchor' => 'hero'],
                    ['title' => 'Tentang Ringkas', 'anchor' => 'about-summary'],
                    ['title' => 'Layanan Highlight', 'anchor' => 'service-highlight'],
                ],
            ],
            [
                'title' => 'Tentang Kami',
                'slug' => 'about',
                'path' => '/about',
                'children' => [
                    ['title' => 'Profil', 'anchor' => 'profil'],
                    ['title' => 'Sambutan', 'anchor' => 'sambutan'],
                    ['title' => 'Struktur Organisasi', 'anchor' => 'struktur-organisasi'],
                    ['title' => 'Visi & Misi', 'anchor' => 'visi-misi'],
                    ['title' => 'Akreditasi Institusi', 'anchor' => 'akreditasi-institusi'],
                ],
            ],
            [
                'title' => 'Layanan',
                'slug' => 'service',
                'path' => '/service',
                'children' => [
                    ['title' => 'Pendampingan Akreditasi', 'anchor' => 'pendampingan-akreditasi'],
                    ['title' => 'Permohonan Data', 'anchor' => 'permohonan-data'],
                    ['title' => 'Konsultasi Mutu', 'anchor' => 'konsultasi-mutu'],
                    ['title' => 'Pengaduan', 'anchor' => 'pengaduan'],
                    ['title' => 'Kritik & Saran', 'anchor' => 'kritik-saran'],
                ],
            ],
            [
                'title' => 'Produk',
                'slug' => 'product',
                'path' => '/product',
                'children' => [
                    ['title' => 'Produk Unggulan', 'anchor' => 'unggulan'],
                    ['title' => 'Kategori Produk', 'anchor' => 'kategori'],
                    ['title' => 'Demo / Trial', 'anchor' => 'demo'],
                ],
            ],
            [
                'title' => 'Proyek',
                'slug' => 'project',
                'path' => '/project',
                'children' => [
                    ['title' => 'Proyek Berjalan', 'anchor' => 'berjalan'],
                    ['title' => 'Proyek Selesai', 'anchor' => 'selesai'],
                    ['title' => 'Klien & Mitra', 'anchor' => 'klien'],
                ],
            ],
            [
                'title' => 'Karier',
                'slug' => 'career',
                'path' => '/career',
                'children' => [
                    ['title' => 'Lowongan Aktif', 'anchor' => 'lowongan'],
                    ['title' => 'Budaya & Nilai', 'anchor' => 'budaya'],
                    ['title' => 'Proses Rekrutmen', 'anchor' => 'proses'],
                    ['title' => 'FAQ Karier', 'anchor' => 'faq-karier'],
                ],
            ],
            [
                'title' => 'Blog',
                'slug' => 'blog',
                'path' => '/blog',
                'children' => [
                    ['title' => 'Artikel Terbaru', 'anchor' => 'terbaru'],
                    ['title' => 'Kategori Berita', 'anchor' => 'berita'],
                    ['title' => 'Pengumuman', 'anchor' => 'pengumuman'],
                ],
            ],
            [
                'title' => 'Kontak',
                'slug' => 'contact',
                'path' => '/contact',
                'children' => [
                    ['title' => 'Formulir Kontak', 'anchor' => 'form'],
                    ['title' => 'Lokasi & Peta', 'anchor' => 'lokasi'],
                    ['title' => 'Kontak Darurat', 'anchor' => 'darurat'],
                ],
            ],
        ];

        foreach ($structure as $order => $item) {
            $parentId = $this->createFromPage($item, null, $order);
        }
    }

    private function createFromPage(array $item, ?int $parentId, int $order): int
    {
        $page = isset($item['slug']) ? Page::where('slug', $item['slug'])->first() : null;
        $target = null;

        if ($page) {
            $target = '/' . ltrim($page->slug, '/');
        } elseif (isset($item['path'])) {
            $target = $item['path'];
        } elseif (isset($item['slug'])) {
            $target = '/' . ltrim($item['slug'], '/');
        }

        if (!$target) {
            return 0; // tidak ada target, jangan buat
        }

        $menu = MenuItem::firstOrCreate(
            [
                'title' => $item['title'],
                'position' => 'main',
                'parent_id' => $parentId,
            ],
            [
                'type' => $page ? 'page' : 'internal',
                'target' => $target,
                'page_id' => $page?->id,
                'display_order' => $order,
                'is_active' => true,
            ]
        );

        // Buat anak sebagai section (anchor) jika ada
        if (!empty($item['children'])) {
            foreach ($item['children'] as $childOrder => $child) {
                $anchor = $child['anchor'] ?? \Str::slug($child['title']);
                $childTarget = $target . '#' . $anchor;

                MenuItem::firstOrCreate(
                    [
                        'title' => $child['title'],
                        'position' => 'main',
                        'parent_id' => $menu->id,
                    ],
                    [
                        'type' => 'internal',
                        'target' => $childTarget,
                        'page_id' => $page?->id,
                        'display_order' => $childOrder,
                        'is_active' => true,
                    ]
                );
            }
        }

        return $menu->id;
    }
}
