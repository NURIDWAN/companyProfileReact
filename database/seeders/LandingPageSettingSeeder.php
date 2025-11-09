<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class LandingPageSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'landing.hero' => [
                'heading' => [
                    'id' => 'Kemitraan Strategis untuk Pertumbuhan Bisnis Anda',
                    'en' => 'Strategic Partnership for Your Business Growth',
                ],
                'subheading' => [
                    'id' => 'Kami membantu organisasi di berbagai industri mengoptimalkan operasional, meningkatkan nilai layanan, dan mewujudkan inisiatif transformasi bisnis yang berdampak.',
                    'en' => 'We support organisations across industries in optimising operations, elevating customer value, and realising impactful business transformation initiatives.',
                ],
                'primary_label' => ['id' => 'Diskusikan Kebutuhan', 'en' => 'Discuss Your Needs'],
                'primary_link' => ['id' => '/contact', 'en' => '/contact'],
                'secondary_label' => ['id' => 'Lihat Solusi', 'en' => 'Explore Solutions'],
                'secondary_link' => ['id' => '/service', 'en' => '/service'],
                'image' => null,
            ],
            'landing.about' => [
                'title' => [
                    'id' => 'Tentang Harmony Strategic Group',
                    'en' => 'About Harmony Strategic Group',
                ],
                'description' => [
                    'id' => 'Sejak 2010 kami bermitra dengan perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, dan retail untuk menghadirkan solusi bisnis terintegrasi. Tim kami menggabungkan keahlian strategi, operasional, dan perubahan organisasi untuk memberikan hasil yang terukur.',
                    'en' => 'Since 2010 we have partnered with public and private enterprises across manufacturing, services, healthcare, energy, and retail to deliver integrated business solutions. Our team blends strategy, operations, and change management expertise to drive measurable impact.',
                ],
                'highlights' => [
                    'id' => [
                        'Jejak proyek di lebih dari 15 sektor industri',
                        'Pendekatan berbasis data dan kebutuhan lapangan',
                        'Program implementasi dan pendampingan end-to-end',
                        'Fokus pada hasil bisnis dan keberlanjutan kemitraan',
                    ],
                    'en' => [
                        'Project footprint across 15+ industry sectors',
                        'Data-driven and on-the-ground approach',
                        'End-to-end implementation and enablement programs',
                        'Commitment to business outcomes and lasting partnerships',
                    ],
                ],
                'image' => null,
            ],
            'landing.final_cta' => [
                'heading' => [
                    'id' => 'Siap Mengambil Langkah Selanjutnya?',
                    'en' => 'Ready for the Next Step?',
                ],
                'description' => [
                    'id' => 'Mari diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda. Hubungi kami hari ini untuk sesi konsultasi tanpa biaya.',
                    'en' => 'Let’s discuss how we can help you achieve your business goals. Contact us today for a complimentary consultation.',
                ],
                'button_label' => ['id' => 'Hubungi Kami', 'en' => 'Contact Us'],
                'button_link' => ['id' => '/contact', 'en' => '/contact'],
            ],
            'landing.metrics' => [
                [
                    'value' => ['id' => '150+', 'en' => '150+'],
                    'label' => ['id' => 'Organisasi Terlayani', 'en' => 'Organisations Served'],
                ],
                [
                    'value' => ['id' => '20', 'en' => '20'],
                    'label' => ['id' => 'Provinsi dan Negara Operasi', 'en' => 'Regions of Operation'],
                ],
                [
                    'value' => ['id' => '92%', 'en' => '92%'],
                    'label' => ['id' => 'Rasio Proyek Berulang', 'en' => 'Repeat Engagement Rate'],
                ],
            ],
            'product.cta' => [
                'badge' => [
                    'id' => 'Butuh Solusi?',
                    'en' => 'Need a tailored solution?',
                ],
                'heading' => [
                    'id' => 'Butuh Solusi yang Disesuaikan?',
                    'en' => 'Need a tailored solution?',
                ],
                'description' => [
                    'id' => 'Jika kebutuhan Anda spesifik, tim kami siap merancang program dan layanan yang sesuai dengan karakteristik industri serta target bisnis perusahaan.',
                    'en' => 'When requirements are unique, our team can design programmes and services that reflect your industry context and business goals.',
                ],
                'primary_label' => ['id' => 'Hubungi Kami', 'en' => 'Contact Us'],
                'primary_link' => ['id' => '/contact', 'en' => '/contact'],
                'secondary_label' => ['id' => 'Lihat Layanan', 'en' => 'View Services'],
                'secondary_link' => ['id' => '/service', 'en' => '/service'],
                'contacts' => [
                    [
                        'icon' => 'phone',
                        'title' => ['id' => 'Telepon', 'en' => 'Phone'],
                        'detail' => ['id' => '+62 877 1696 7890', 'en' => '+62 877 1696 7890'],
                    ],
                    [
                        'icon' => 'mail',
                        'title' => ['id' => 'Email', 'en' => 'Email'],
                        'detail' => ['id' => 'info@example.com', 'en' => 'info@example.com'],
                    ],
                    [
                        'icon' => 'clock',
                        'title' => ['id' => 'Jam Kerja', 'en' => 'Working Hours'],
                        'detail' => ['id' => 'Senin - Jumat, 09:00 - 18:00', 'en' => 'Monday - Friday, 09:00 - 18:00'],
                    ],
                ],
            ],
            'product.stats' => [
                'labels' => [
                    'products' => ['id' => 'Program Unggulan', 'en' => 'Flagship Programmes'],
                    'clients' => ['id' => 'Klien Puas', 'en' => 'Satisfied Clients'],
                    'rating' => ['id' => 'Rating Kemitraan', 'en' => 'Partnership Rating'],
                    'awards' => ['id' => 'Penghargaan', 'en' => 'Awards'],
                ],
                'awards' => 18,
            ],
            'product.hero' => [
                'badge' => [
                    'id' => 'Produk Strategis',
                    'en' => 'Strategic Products',
                ],
                'heading' => [
                    'id' => 'Solusi produk siap pakai untuk transformasi bisnis',
                    'en' => 'Ready-to-ship product solutions for business transformation',
                ],
                'description' => [
                    'id' => 'Temukan rangkaian produk digital yang membantu mempercepat efisiensi operasional dan pengalaman pelanggan di berbagai industri.',
                    'en' => 'Explore modular digital products that accelerate operational efficiency and customer experience across industries.',
                ],
            ],
            'project.hero' => [
                'badge' => [
                    'id' => 'Portofolio Proyek',
                    'en' => 'Project Portfolio',
                ],
                'heading' => [
                    'id' => 'Studi kasus implementasi lintas sektor',
                    'en' => 'Cross-industry implementation case studies',
                ],
                'description' => [
                    'id' => 'Ikuti perjalanan transformasi yang kami lakukan bersama klien di sektor publik, swasta, dan BUMN mulai dari inisiasi hingga keberlanjutan.',
                    'en' => 'See how we partner with public and private sector clients from discovery through sustained transformation.',
                ],
            ],
            'career.hero' => [
                'badge' => [
                    'id' => 'Life at Harmony',
                    'en' => 'Life at Harmony',
                ],
                'heading' => [
                    'id' => 'Bangun karier berdampak bersama tim lintas disiplin',
                    'en' => 'Shape an impactful career with a multi-disciplinary team',
                ],
                'description' => [
                    'id' => 'Kami membuka kesempatan bagi talenta yang siap memimpin perubahan dan berkembang melalui coaching, pembelajaran, dan lingkungan kerja hibrida.',
                    'en' => 'We welcome talents ready to drive change with access to coaching, learning, and a flexible hybrid work environment.',
                ],
            ],
            'blog.hero' => [
                'badge' => [
                    'id' => 'Insight',
                    'en' => 'Insights',
                ],
                'heading' => [
                    'id' => 'Insight Bisnis & Industri',
                    'en' => 'Business & Industry Insights',
                ],
                'description' => [
                    'id' => 'Artikel, studi kasus, dan tips praktis untuk mengelola perubahan dan mengembangkan bisnis.',
                    'en' => 'Articles, case studies, and practical guidance to manage change and grow your organisation.',
                ],
            ],
        ];

        foreach ($settings as $key => $value) {
            CompanySetting::updateOrCreate(
                ['key' => $key],
                ['group' => 'landing', 'value' => $value]
            );
        }
    }
}
