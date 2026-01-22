<?php

/**
 * Landing Page Configuration
 *
 * Konfigurasi halaman bawaan (built-in pages) untuk company profile.
 * Digunakan oleh middleware EnsureLandingPageEnabled untuk mengontrol
 * akses ke halaman berdasarkan status menu_items di database.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Navigation / Built-in Pages
    |--------------------------------------------------------------------------
    |
    | Daftar halaman bawaan yang dapat diaktifkan/dinonaktifkan melalui
    | admin panel Menu Website. Setiap halaman memiliki:
    |
    | - key: Identifier unik untuk halaman (digunakan oleh middleware)
    | - href: URL path halaman
    | - labels: Label multi-bahasa untuk navigasi
    | - default_order: Urutan default di navigasi
    | - default_active: Status aktif default jika belum ada di database
    |
    */

    'navigation' => [
        [
            'key' => 'home',
            'href' => '/',
            'labels' => ['id' => 'Beranda', 'en' => 'Home'],
            'default_order' => 1,
            'default_active' => true,
        ],
        [
            'key' => 'about',
            'href' => '/about',
            'labels' => ['id' => 'Tentang Kami', 'en' => 'About Us'],
            'default_order' => 2,
            'default_active' => true,
        ],
        [
            'key' => 'service',
            'href' => '/service',
            'labels' => ['id' => 'Layanan', 'en' => 'Services'],
            'default_order' => 3,
            'default_active' => true,
        ],
        [
            'key' => 'product',
            'href' => '/product',
            'labels' => ['id' => 'Produk', 'en' => 'Products'],
            'default_order' => 4,
            'default_active' => true,
        ],
        [
            'key' => 'project',
            'href' => '/project',
            'labels' => ['id' => 'Proyek', 'en' => 'Projects'],
            'default_order' => 5,
            'default_active' => true,
        ],
        [
            'key' => 'career',
            'href' => '/career',
            'labels' => ['id' => 'Karir', 'en' => 'Career'],
            'default_order' => 6,
            'default_active' => true,
        ],
        [
            'key' => 'blog',
            'href' => '/blog',
            'labels' => ['id' => 'Blog', 'en' => 'Blog'],
            'default_order' => 7,
            'default_active' => true,
        ],
        [
            'key' => 'contact',
            'href' => '/contact',
            'labels' => ['id' => 'Kontak', 'en' => 'Contact'],
            'default_order' => 8,
            'default_active' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Footer Configuration
    |--------------------------------------------------------------------------
    |
    | Konfigurasi default untuk footer website.
    |
    */

    'footer' => [
        'cta' => [
            'title' => 'Siap Memulai?',
            'description' => 'Hubungi kami untuk konsultasi gratis',
            'button_text' => 'Hubungi Kami',
            'button_link' => '/contact',
        ],
        'legal' => [
            'copyright' => 'Hak Cipta',
            'privacy_policy' => null,
            'terms_of_service' => null,
        ],
    ],

];
