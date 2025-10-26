<?php

return [
    'default_language' => 'id',
    'languages' => [
        [
            'code' => 'id',
            'label' => 'ID',
            'name' => 'Bahasa Indonesia',
            'flag' => '🇮🇩',
        ],
        [
            'code' => 'en',
            'label' => 'EN',
            'name' => 'English',
            'flag' => '🇬🇧',
        ],
    ],
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
            'labels' => ['id' => 'Tentang Kami', 'en' => 'About'],
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
            'labels' => ['id' => 'Karier', 'en' => 'Career'],
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
    'seo' => [
        'home' => [
            'title' => 'Nusantara Digital Solution | Konsultan Transformasi Digital Indonesia',
            'description' => 'Kemitraan teknologi untuk membantu instansi pemerintah dan enterprise menjalankan transformasi digital yang berdampak.',
            'keywords' => ['transformasi digital', 'konsultan teknologi', 'layanan IT'],
        ],
        'about' => [
            'title' => 'Tentang Nusantara Digital Solution',
            'description' => 'Kenali tim dan nilai yang kami pegang dalam menghadirkan solusi digital end-to-end.',
            'keywords' => ['tentang kami', 'konsultan IT Indonesia'],
        ],
        'service' => [
            'title' => 'Layanan Konsultasi & Implementasi Teknologi',
            'description' => 'Layanan strategi, desain produk, pengembangan aplikasi, hingga pengelolaan adopsi digital.',
            'keywords' => ['layanan IT', 'konsultan digital', 'implementasi teknologi'],
        ],
        'product' => [
            'title' => 'Produk Digital Nusantara Digital Solution',
            'description' => 'Katalog solusi siap pakai untuk otomasi bisnis, kolaborasi tim, dan analitik data.',
            'keywords' => ['produk digital', 'software perusahaan'],
        ],
        'project' => [
            'title' => 'Portofolio Proyek Digital',
            'description' => 'Studi kasus implementasi teknologi yang berhasil meningkatkan kinerja mitra kami.',
            'keywords' => ['portofolio proyek', 'implementasi teknologi'],
        ],
        'career' => [
            'title' => 'Karier di Nusantara Digital Solution',
            'description' => 'Raih kesempatan tumbuh bersama tim ahli teknologi dan produk digital.',
            'keywords' => ['karier teknologi', 'lowongan IT'],
        ],
        'blog' => [
            'title' => 'Blog & Insight Teknologi',
            'description' => 'Artikel seputar tren teknologi, pengembangan produk, dan praktik terbaik transformasi digital.',
            'keywords' => ['blog teknologi', 'insight digital'],
        ],
        'contact' => [
            'title' => 'Hubungi Tim Nusantara Digital Solution',
            'description' => 'Diskusikan kebutuhan transformasi digital Anda dengan konsultan kami.',
            'keywords' => ['kontak', 'konsultasi teknologi'],
        ],
        'product_detail' => [
            'title' => 'Detail Produk Digital',
            'description' => 'Pelajari fitur lengkap produk digital kami.',
            'keywords' => ['detail produk', 'solusi software'],
        ],
        'project_detail' => [
            'title' => 'Detail Proyek Digital',
            'description' => 'Ringkasan hasil dan proses proyek digital kami.',
            'keywords' => ['detail proyek', 'studi kasus teknologi'],
        ],
        'career_detail' => [
            'title' => 'Detail Lowongan Karier',
            'description' => 'Informasi lengkap kebutuhan dan kualifikasi posisi yang dibuka.',
            'keywords' => ['detail karier', 'lowongan teknologi'],
        ],
        'blog_detail' => [
            'title' => 'Artikel Blog',
            'description' => 'Insight terbaru dari praktisi teknologi Nusantara Digital Solution.',
            'keywords' => ['artikel teknologi', 'transformasi digital'],
        ],
    ],
    'footer' => [
        'company' => [
            'name' => 'Nusantara Digital Solution',
            'tagline' => 'Mitra transformasi digital sektor publik dan enterprise.',
            'description' => 'Kami merancang strategi, pengalaman pengguna, serta implementasi teknologi yang berkelanjutan.',
        ],
        'contacts' => [
            'email' => 'halo@nusantaradigital.id',
            'phone' => '+62 811 1234 567',
            'address' => 'Jl. H. R. Rasuna Said Kav. 6, Jakarta Selatan, DKI Jakarta 12940',
        ],
        'socials' => [
            'linkedin' => 'https://www.linkedin.com/company/nusantara-digital',
            'instagram' => 'https://www.instagram.com/nusantaradigital.id',
            'youtube' => 'https://www.youtube.com/@nusantaradigital',
        ],
        'columns' => [
            [
                'title' => 'Perusahaan',
                'links' => [
                    ['label' => 'Tentang', 'href' => '/about'],
                    ['label' => 'Karier', 'href' => '/career'],
                    ['label' => 'Kontak', 'href' => '/contact'],
                ],
            ],
            [
                'title' => 'Layanan',
                'links' => [
                    ['label' => 'Konsultasi Digital', 'href' => '/service'],
                    ['label' => 'Implementasi Produk', 'href' => '/product'],
                    ['label' => 'Portofolio Proyek', 'href' => '/project'],
                ],
            ],
            [
                'title' => 'Insight',
                'links' => [
                    ['label' => 'Blog', 'href' => '/blog'],
                    ['label' => 'Studi Kasus', 'href' => '/project'],
                    ['label' => 'Hubungi Kami', 'href' => '/contact'],
                ],
            ],
        ],
        'legal' => [
            'privacy' => '/privacy-policy',
            'terms' => '/terms-of-service',
        ],
        'cta' => [
            'label' => 'Diskusikan Proyek Anda',
            'href' => '/contact',
        ],
    ],
];
