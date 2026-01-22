<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedMainMenu();
        $this->seedFooterMenu();
    }

    /**
     * Seed menu utama (navbar)
     */
    private function seedMainMenu(): void
    {
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
            $this->createMenuItem($item, 'main', null, $order);
        }
    }

    /**
     * Seed menu footer
     */
    private function seedFooterMenu(): void
    {
        // Struktur footer dengan grup/kolom
        $footerGroups = [
            [
                'title' => 'Perusahaan',
                'children' => [
                    ['title' => 'Tentang Kami', 'path' => '/about'],
                    ['title' => 'Visi & Misi', 'path' => '/about#visi-misi'],
                    ['title' => 'Tim Kami', 'path' => '/about#tim'],
                    ['title' => 'Karier', 'path' => '/career'],
                ],
            ],
            [
                'title' => 'Layanan',
                'children' => [
                    ['title' => 'Layanan Kami', 'path' => '/service'],
                    ['title' => 'Produk', 'path' => '/product'],
                    ['title' => 'Proyek', 'path' => '/project'],
                ],
            ],
            [
                'title' => 'Sumber Daya',
                'children' => [
                    ['title' => 'Blog', 'path' => '/blog'],
                    ['title' => 'FAQ', 'path' => '/faq'],
                    ['title' => 'Dokumentasi', 'path' => '/docs'],
                ],
            ],
            [
                'title' => 'Hubungi Kami',
                'children' => [
                    ['title' => 'Kontak', 'path' => '/contact'],
                    ['title' => 'Lokasi', 'path' => '/contact#lokasi'],
                    ['title' => 'Dukungan', 'path' => '/contact#dukungan'],
                ],
            ],
        ];

        foreach ($footerGroups as $groupOrder => $group) {
            // Buat parent menu (grup/kolom)
            $parentMenu = MenuItem::firstOrCreate(
                [
                    'title' => $group['title'],
                    'position' => 'footer',
                    'parent_id' => null,
                ],
                [
                    'type' => 'internal',
                    'target' => null,
                    'page_id' => null,
                    'display_order' => $groupOrder,
                    'is_active' => true,
                ]
            );

            // Buat child menu items
            if (! empty($group['children'])) {
                foreach ($group['children'] as $childOrder => $child) {
                    $page = $this->findPageByPath($child['path']);

                    MenuItem::firstOrCreate(
                        [
                            'title' => $child['title'],
                            'position' => 'footer',
                            'parent_id' => $parentMenu->id,
                        ],
                        [
                            'type' => $page ? 'page' : 'internal',
                            'target' => $child['path'],
                            'page_id' => $page?->id,
                            'display_order' => $childOrder,
                            'is_active' => true,
                        ]
                    );
                }
            }
        }

        // Tambahkan juga menu footer standalone (tanpa grup) untuk legal links
        $legalLinks = [
            ['title' => 'Kebijakan Privasi', 'path' => '/privacy-policy'],
            ['title' => 'Syarat & Ketentuan', 'path' => '/terms-of-service'],
        ];

        // Buat grup Legal
        $legalGroup = MenuItem::firstOrCreate(
            [
                'title' => 'Legal',
                'position' => 'footer',
                'parent_id' => null,
            ],
            [
                'type' => 'internal',
                'target' => null,
                'page_id' => null,
                'display_order' => 99,
                'is_active' => true,
            ]
        );

        foreach ($legalLinks as $order => $link) {
            $page = $this->findPageByPath($link['path']);

            MenuItem::firstOrCreate(
                [
                    'title' => $link['title'],
                    'position' => 'footer',
                    'parent_id' => $legalGroup->id,
                ],
                [
                    'type' => $page ? 'page' : 'internal',
                    'target' => $link['path'],
                    'page_id' => $page?->id,
                    'display_order' => $order,
                    'is_active' => true,
                ]
            );
        }
    }

    /**
     * Buat menu item dengan children
     */
    private function createMenuItem(array $item, string $position, ?int $parentId, int $order): int
    {
        $page = isset($item['slug']) ? Page::where('slug', $item['slug'])->first() : null;
        $target = null;

        if ($page) {
            $target = '/'.ltrim($page->slug, '/');
        } elseif (isset($item['path'])) {
            $target = $item['path'];
        } elseif (isset($item['slug'])) {
            $target = '/'.ltrim($item['slug'], '/');
        }

        if (! $target) {
            return 0;
        }

        $menu = MenuItem::firstOrCreate(
            [
                'title' => $item['title'],
                'position' => $position,
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
        if (! empty($item['children'])) {
            foreach ($item['children'] as $childOrder => $child) {
                $anchor = $child['anchor'] ?? Str::slug($child['title']);
                $childTarget = $target.'#'.$anchor;

                MenuItem::firstOrCreate(
                    [
                        'title' => $child['title'],
                        'position' => $position,
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

    /**
     * Cari halaman berdasarkan path
     */
    private function findPageByPath(string $path): ?Page
    {
        // Hapus anchor jika ada
        $cleanPath = explode('#', $path)[0];
        $slug = ltrim($cleanPath, '/');

        if (empty($slug)) {
            return null;
        }

        return Page::where('slug', $slug)->first();
    }
}
