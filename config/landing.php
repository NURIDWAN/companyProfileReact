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
        [
            'code' => 'fr',
            'label' => 'FR',
            'name' => 'Français',
            'flag' => '🇫🇷',
        ],
        [
            'code' => 'de',
            'label' => 'DE',
            'name' => 'Deutsch',
            'flag' => '🇩🇪',
        ],
        [
            'code' => 'es',
            'label' => 'ES',
            'name' => 'Español',
            'flag' => '🇪🇸',
        ],
    ],
    'home_sections' => [
        'hero' => true,
        'about' => true,
        'services' => true,
        'testimonials' => true,
        'team' => true,
        'articles' => true,
        'final_cta' => true,
        'metrics' => true,
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
            'title' => 'Harmony Strategic Group | Mitra Bisnis Lintas Industri',
            'description' => 'Kemitraan strategis yang membantu perusahaan di berbagai sektor meningkatkan kinerja dan mewujudkan transformasi bisnis.',
            'keywords' => ['konsultan bisnis', 'pengembangan organisasi', 'transformasi industri'],
        ],
        'about' => [
            'title' => 'Tentang Harmony Strategic Group',
            'description' => 'Pelajari profil perusahaan, pengalaman lintas industri, dan nilai kolaborasi yang kami pegang.',
            'keywords' => ['tentang perusahaan', 'konsultan manajemen', 'kemitraan bisnis'],
        ],
        'service' => [
            'title' => 'Layanan Konsultasi & Implementasi Bisnis',
            'description' => 'Jelajahi layanan strategi, optimalisasi proses, pengembangan talenta, dan inisiatif transformasi yang kami tawarkan.',
            'keywords' => ['layanan bisnis', 'optimalisasi proses', 'transformasi organisasi'],
        ],
        'product' => [
            'title' => 'Program & Solusi Harmony Strategic Group',
            'description' => 'Kumpulan program siap pakai untuk meningkatkan efisiensi, kualitas layanan, dan pengalaman pelanggan.',
            'keywords' => ['program bisnis', 'solusi industri', 'layanan konsultasi'],
        ],
        'project' => [
            'title' => 'Portofolio Proyek Harmony Strategic Group',
            'description' => 'Kisah keberhasilan dan hasil terukur yang kami capai bersama mitra di berbagai sektor.',
            'keywords' => ['portofolio proyek', 'studi kasus bisnis', 'transformasi organisasi'],
        ],
        'career' => [
            'title' => 'Karier di Harmony Strategic Group',
            'description' => 'Temukan kesempatan berkarier dan berkembang bersama tim konsultan lintas industri.',
            'keywords' => ['karier konsultan', 'lowongan profesional', 'peluang kerja'],
        ],
        'blog' => [
            'title' => 'Insight Bisnis & Industri',
            'description' => 'Artikel seputar tren industri, strategi operasional, dan pembaruan seputar transformasi bisnis.',
            'keywords' => ['blog bisnis', 'insight industri', 'strategi perusahaan'],
        ],
        'contact' => [
            'title' => 'Hubungi Harmony Strategic Group',
            'description' => 'Diskusikan tantangan bisnis Anda dan temukan solusi yang relevan bersama tim kami.',
            'keywords' => ['kontak konsultan', 'hubungi kami', 'kemitraan bisnis'],
        ],
        'product_detail' => [
            'title' => 'Detail Program & Solusi',
            'description' => 'Informasi lengkap mengenai program dan solusi yang disesuaikan dengan kebutuhan industri Anda.',
            'keywords' => ['detail solusi bisnis', 'program layanan', 'peningkatan operasi'],
        ],
        'project_detail' => [
            'title' => 'Detail Studi Kasus Proyek',
            'description' => 'Ringkasan pendekatan, hasil, dan pembelajaran dari proyek yang telah kami selesaikan.',
            'keywords' => ['detail proyek', 'studi kasus bisnis', 'hasil kemitraan'],
        ],
        'career_detail' => [
            'title' => 'Detail Lowongan Karier',
            'description' => 'Informasi lengkap mengenai tanggung jawab, kualifikasi, dan benefit posisi yang tersedia.',
            'keywords' => ['detail lowongan', 'karier profesional', 'kesempatan kerja'],
        ],
        'blog_detail' => [
            'title' => 'Artikel Insight',
            'description' => 'Wawasan terbaru dari praktisi dan konsultan Harmony Strategic Group.',
            'keywords' => ['artikel bisnis', 'insight industri', 'transformasi organisasi'],
        ],
    ],
    'footer' => [
        'company' => [
            'name' => 'Harmony Strategic Group',
            'tagline' => 'Partner kepercayaan untuk pertumbuhan bisnis lintas industri.',
            'description' => 'Kami merancang strategi, menguatkan proses operasional, dan mengawal implementasi program perubahan secara berkelanjutan.',
        ],
        'contacts' => [
            'email' => 'hello@harmonygroup.id',
            'phone' => '+62 811 7788 990',
            'address' => 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110',
        ],
        'socials' => [
            'linkedin' => 'https://www.linkedin.com/company/harmony-strategic-group',
            'instagram' => 'https://www.instagram.com/harmonystrategic',
            'youtube' => 'https://www.youtube.com/@harmonystrategic',
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
                    ['label' => 'Konsultasi Bisnis', 'href' => '/service'],
                    ['label' => 'Program & Solusi', 'href' => '/product'],
                    ['label' => 'Studi Kasus', 'href' => '/project'],
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
