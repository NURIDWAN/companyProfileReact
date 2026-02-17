<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            'home' => [
                [
                    'title' => 'Hero',
                    'slug' => 'hero',
                    'content' => json_encode([
                        '__type' => 'hero_home',
                        'heading' => 'Kemitraan Strategis untuk Pertumbuhan Bisnis Anda',
                        'description' => 'Kami membantu organisasi di berbagai industri mengoptimalkan operasional, meningkatkan nilai layanan, dan mewujudkan inisiatif transformasi bisnis yang berdampak.',
                        'primary_label' => 'Diskusikan Kebutuhan',
                        'primary_link' => '/contact',
                        'secondary_label' => 'Lihat Solusi',
                        'secondary_link' => '/service',
                        'hero_image' => null,
                    ]),
                ],
                [
                    'title' => 'Tentang Ringkas',
                    'slug' => 'about-summary',
                    'content' => json_encode([
                        '__type' => 'about_intro',
                        'heading' => 'Tentang Kami',
                        'description' => 'Sejak 2010 kami bermitra dengan perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, dan retail untuk menghadirkan solusi bisnis terintegrasi.',
                        'highlights' => [
                            'Jejak proyek di lebih dari 15 sektor industri',
                            'Pendekatan berbasis data dan kebutuhan lapangan',
                            'Program implementasi dan pendampingan end-to-end',
                            'Fokus pada hasil bisnis dan keberlanjutan',
                        ],
                        'image' => null,
                    ]),
                ],
                [
                    'title' => 'Layanan Highlight',
                    'slug' => 'service-highlight',
                    'content' => json_encode([
                        '__type' => 'service_overview',
                        'heading' => 'Layanan Unggulan',
                        'description' => 'Temukan layanan yang kami siapkan untuk mendukung pertumbuhan perusahaan, meningkatkan efisiensi, dan menghadirkan pengalaman pelanggan yang unggul.',
                        'highlights' => [
                            'Konsultasi Transformasi Digital',
                            'Pengembangan Aplikasi Kustom',
                            'Implementasi Data & AI',
                            'Operasional dan Managed Services',
                        ],
                    ]),
                ],
                [
                    'title' => 'Mengapa Kami',
                    'slug' => 'why-us',
                    'content' => json_encode([
                        '__type' => 'why_us',
                        'heading' => 'Mengapa Perusahaan Kami',
                        'description' => 'Kami hadir dengan komitmen memberikan nilai terbaik untuk setiap klien.',
                        'items' => [
                            [
                                'icon' => 'shield-check',
                                'title' => 'Konsultasi Bisnis',
                                'description' => 'Strategi bisnis yang tepat untuk pertumbuhan berkelanjutan.',
                            ],
                            [
                                'icon' => 'refresh-cw',
                                'title' => 'Transformasi Digital',
                                'description' => 'Implementasi teknologi untuk efisiensi operasional maksimal.',
                            ],
                            [
                                'icon' => 'trending-up',
                                'title' => 'Peningkatan Produktivitas',
                                'description' => 'Solusi untuk meningkatkan produktivitas tim dan proses bisnis.',
                            ],
                        ],
                    ]),
                ],
                [
                    'title' => 'Testimoni',
                    'slug' => 'testimonials',
                    'content' => json_encode([
                        '__type' => 'testimonials_home',
                        'heading' => 'Kata Mereka',
                        'description' => 'Apa kata klien kami tentang layanan yang kami berikan.',
                        'items' => [
                            [
                                'name' => 'Ahmad Hidayat',
                                'position' => 'CEO PT Maju Jaya',
                                'company' => 'PT Maju Jaya',
                                'avatar' => 'https://ui-avatars.com/api/?name=Ahmad+Hidayat&background=0D8ABC&color=fff',
                                'rating' => 5,
                                'testimonial' => 'Pelayanan yang sangat profesional dan hasil yang memuaskan. Tim sangat responsif dan memahami kebutuhan bisnis kami.',
                            ],
                            [
                                'name' => 'Siti Nurhaliza',
                                'position' => 'Director',
                                'company' => 'CV Berkah Sejahtera',
                                'avatar' => 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=10b981&color=fff',
                                'rating' => 5,
                                'testimonial' => 'Implementasi sistem berjalan lancar dan tepat waktu. Sangat puas dengan dedikasi tim dalam memberikan solusi terbaik.',
                            ],
                            [
                                'name' => 'Budi Santoso',
                                'position' => 'Manager IT',
                                'company' => 'PT Teknologi Nusantara',
                                'avatar' => 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff',
                                'rating' => 5,
                                'testimonial' => 'Kualitas code dan arsitektur sistem yang dibangun sangat baik. Support after sales juga luar biasa responsif.',
                            ],
                        ],
                    ]),
                ],
                [
                    'title' => 'Statistik',
                    'slug' => 'metrics',
                    'content' => json_encode([
                        '__type' => 'metrics_home',
                        'items' => [
                            ['value' => '100+', 'label' => 'Klien Puas'],
                            ['value' => '90', 'label' => 'Proyek Selesai'],
                            ['value' => '65%', 'label' => 'Efisiensi Meningkat'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Artikel Terbaru',
                    'slug' => 'blog-preview',
                    'content' => json_encode([
                        '__type' => 'blog_preview',
                        'heading' => 'Artikel Terbaru',
                        'description' => 'Baca artikel dan insight terbaru dari tim kami.',
                        'link_text' => 'Lihat Semua Artikel',
                        'link_url' => '/blog',
                    ]),
                ],
                [
                    'title' => 'CTA - Home',
                    'slug' => 'cta-home',
                    'content' => json_encode([
                        '__type' => 'cta_home',
                        'heading' => 'Siap untuk Memulai?',
                        'description' => 'Hubungi tim kami untuk mendiskusikan kebutuhan bisnis Anda dan temukan solusi terbaik bersama kami.',
                        'button_label' => 'Hubungi Kami',
                        'button_link' => '/contact',
                    ]),
                ],
            ],
            'about' => [
                [
                    'title' => 'Overview',
                    'slug' => 'overview',
                    'content' => json_encode([
                        '__type' => 'about_overview',
                        'badge' => 'Tentang Perusahaan',
                        'heading' => 'Mitra Terpercaya untuk Transformasi Bisnis',
                        'title' => 'Tentang Kami',
                        'paragraphs' => [
                            'Kami adalah perusahaan konsultan teknologi dan manajemen yang berdedikasi untuk membantu organisasi mencapai potensi penuh mereka.',
                            'Dengan pengalaman lebih dari satu dekade, kami telah bekerjasama dengan berbagai klien dari startup hingga perusahaan multinasional.',
                        ],
                        'stats' => [
                            ['value' => '10+', 'label' => 'Tahun Pengalaman'],
                            ['value' => '50+', 'label' => 'Klien Semuanya'],
                            ['value' => '100+', 'label' => 'Proyek Selesai'],
                        ],
                        'highlights' => [
                            ['icon' => 'zap', 'title' => 'Inovasi', 'description' => 'Selalu mencari cara baru yang lebih baik.'],
                            ['icon' => 'shield', 'title' => 'Kepercayaan', 'description' => 'Menjaga integritas dalam setiap kerjasama.'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Visi & Misi',
                    'slug' => 'visi-misi',
                    'content' => json_encode([
                        '__type' => 'about_vision',
                        'badge' => 'Arah Kami',
                        'title' => 'Visi & Misi',
                        'vision_title' => 'Visi Kami',
                        'vision_text' => 'Menjadi mitra transformasi digital terdepan di Asia Tenggara, memberdayakan bisnis untuk tumbuh berkelanjutan melalui teknologi.',
                        'mission_title' => 'Misi Kami',
                        'mission_text' => 'Menyediakan solusi teknologi inovatif yang praktis, membangun talenta digital terbaik, dan menciptakan dampak positif bagi ekosistem bisnis.',
                    ]),
                ],
                [
                    'title' => 'Nilai Perusahaan',
                    'slug' => 'values',
                    'content' => json_encode([
                        '__type' => 'about_values',
                        'items' => [
                            ['icon' => 'users', 'title' => 'Kolaborasi', 'description' => 'Bekerja bersama untuk hasil terbaik.'],
                            ['icon' => 'star', 'title' => 'Keunggulan', 'description' => 'Selalu memberikan kualitas terbaik.'],
                            ['icon' => 'heart', 'title' => 'Kepedulian', 'description' => 'Peduli pada klien, tim, dan masyarakat.'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Statistik',
                    'slug' => 'statistics',
                    'content' => json_encode([
                        '__type' => 'about_statistics',
                        'badge' => 'Pencapaian',
                        'title' => 'Dampak Kami',
                        'description' => 'Angka yang mencerminkan dedikasi dan hasil kerja keras kami.',
                        'primary' => [
                            ['value' => '98%', 'label' => 'Kepuasan Klien'],
                            ['value' => '200%', 'label' => 'Rata-rata ROI Klien'],
                        ],
                        'secondary' => [
                            ['value' => '24/7', 'label' => 'Dukungan Teknis'],
                            ['value' => '15', 'label' => 'Penghargaan Industri'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Tim',
                    'slug' => 'team',
                    'content' => json_encode([
                        '__type' => 'about_team',
                        'badge' => 'Tim Kami',
                        'title' => 'Bertemu Para Ahli',
                        'description' => 'Dipimpin oleh individu yang bersemangat dan berpengalaman di bidangnya.',
                        'members' => [
                            [
                                'name' => 'Budi Santoso',
                                'role' => 'CEO',
                                'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
                                'description' => 'Visioner teknologi dengan 15 tahun pengalaman.',
                            ],
                            [
                                'name' => 'Siti Aminah',
                                'role' => 'CTO',
                                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
                                'description' => 'Arsitek sistem yang ahli dalam skalabilitas.',
                            ],
                        ],
                    ]),
                ],
                [
                    'title' => 'CTA About',
                    'slug' => 'cta',
                    'content' => json_encode([
                        '__type' => 'about_cta',
                        'badge' => 'Karir',
                        'heading' => 'Bergabung Bersama Kami',
                        'description' => 'Jadilah bagian dari tim yang dinamis dan inovatif.',
                        'primary_label' => 'Lihat Lowongan',
                        'primary_link' => '/career',
                        'contacts' => [
                            ['icon' => 'mail', 'title' => 'Email', 'detail' => 'career@example.com'],
                        ],
                    ]),
                ],
            ],
            'service' => [
                [
                    'title' => 'Hero Service',
                    'slug' => 'hero-service',
                    'content' => json_encode([
                        '__type' => 'service_hero',
                        'heading' => 'Solusi Digital Komprehensif',
                        'highlight' => 'Keahlian Kami',
                        'description' => 'Dari pengembangan web hingga AI, kami menyediakan layanan end-to-end untuk kebutuhan digital Anda.',
                        'primary_label' => 'Minta Penawaran',
                        'primary_link' => '/contact',
                        'secondary_label' => 'Portofolio',
                        'secondary_link' => '/project',
                        'hero_image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
                    ]),
                ],
                [
                    'title' => 'Ringkasan Layanan',
                    'slug' => 'summary',
                    'content' => json_encode([
                        '__type' => 'service_summary',
                        'badge' => 'Layanan Kami',
                        'heading' => 'Apa yang Kami Tawarkan',
                        'description' => 'Kami menawarkan berbagai layanan teknologi untuk mempercepat pertumbuhan bisnis Anda.',
                    ]),
                ],
                [
                    'title' => 'Penawaran',
                    'slug' => 'offerings',
                    'content' => json_encode([
                        '__type' => 'service_offerings',
                        'badge' => 'Keahlian',
                        'heading' => 'Bidang Fokus',
                        'description' => 'Spesialisasi kami mencakup berbagai domain teknologi.',
                        'items' => [
                            ['title' => 'Web Development', 'description' => 'Membangun website responsif dan modern.', 'icon' => 'layout'],
                            ['title' => 'Mobile Apps', 'description' => 'Aplikasi native untuk iOS dan Android.', 'icon' => 'smartphone'],
                            ['title' => 'Cloud Infrastructure', 'description' => 'Skalabilitas dan keamanan di cloud.', 'icon' => 'cloud'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Tech Stack',
                    'slug' => 'tech-stack',
                    'content' => json_encode([
                        '__type' => 'service_tech_stack',
                        'badge' => 'Teknologi',
                        'heading' => 'Stack Modern',
                        'description' => 'Kami menggunakan alat terbaik untuk hasil terbaik.',
                        'categories' => [
                            ['name' => 'Frontend', 'items' => ['React', 'Vue', 'Tailwind']],
                            ['name' => 'Backend', 'items' => ['Laravel', 'Node.js', 'Go']],
                        ],
                    ]),
                ],
                [
                    'title' => 'Proses Kerja',
                    'slug' => 'process',
                    'content' => json_encode([
                        '__type' => 'service_process',
                        'badge' => 'Alur Kerja',
                        'heading' => 'Bagaimana Kami Bekerja',
                        'description' => 'Metodologi agile untuk pengiriman cepat dan berkualitas.',
                        'steps' => [
                            ['title' => 'Discovery', 'description' => 'Memahami kebutuhan bisnis.'],
                            ['title' => 'Design', 'description' => 'Merancang solusi visual dan arsitektur.'],
                            ['title' => 'Development', 'description' => 'Menulis kode berkualitas tinggi.'],
                            ['title' => 'Launch', 'description' => 'Deployment dan monitoring.'],
                        ],
                    ]),
                ],
                [
                    'title' => 'Keunggulan',
                    'slug' => 'advantages',
                    'content' => json_encode([
                        '__type' => 'service_advantages',
                        'badge' => 'Mengapa Kami',
                        'heading' => 'Nilai Tambah',
                        'description' => 'Apa yang membedakan kami dari kompetitor.',
                        'items' => [
                            ['title' => 'Tim Berpengalaman', 'description' => 'Ahli di bidangnya masing-masing.'],
                            ['title' => 'Komitmen pada Kualitas', 'description' => 'Standar tinggi tanpa kompromi.'],
                        ],
                    ]),
                ],
                [
                    'title' => 'FAQ',
                    'slug' => 'faq',
                    'content' => json_encode([
                        '__type' => 'service_faqs',
                        'heading' => 'Pertanyaan Umum',
                        'description' => 'Jawaban untuk pertanyaan yang sering diajukan.',
                        'items' => [
                            ['question' => 'Berapa lama waktu pengerjaan?', 'answer' => 'Tergantung kompleksitas proyek, biasanya 1-3 bulan.'],
                            ['question' => 'Apakah ada garansi?', 'answer' => 'Ya, kami memberikan garansi maintenance selama 3 bulan.'],
                        ],
                    ]),
                ],
            ],
            'product' => [
                [
                    'title' => 'Hero Product',
                    'slug' => 'hero-product',
                    'content' => json_encode([
                        '__type' => 'product_hero',
                        'badge' => 'Produk',
                        'heading' => 'Produk Digital Unggulan',
                        'description' => 'Solusi siap pakai untuk mempercepat operasional bisnis Anda.',
                    ]),
                ],
                [
                    'title' => 'Stats Product',
                    'slug' => 'stats-product',
                    'content' => json_encode([
                        '__type' => 'product_stats',
                        'labels' => [
                            'products' => 'Produk Aktif',
                            'clients' => 'Pengguna Puas',
                            'rating' => 'Rating Rata-rata',
                            'awards' => 'Penghargaan',
                        ],
                        'awards' => 5,
                    ]),
                ],
                [
                    'title' => 'CTA Product',
                    'slug' => 'cta-product',
                    'content' => json_encode([
                        '__type' => 'product_cta',
                        'badge' => 'Tertarik?',
                        'heading' => 'Mulai Gunakan Produk Kami',
                        'description' => 'Hubungi sales kami untuk demo dan informasi harga.',
                        'primary_label' => 'Hubungi Sales',
                        'primary_link' => '/contact',
                        'contacts' => [
                            ['icon' => 'phone', 'title' => 'Telepon', 'detail' => '+62 21 555 1234'],
                        ],
                    ]),
                ],
            ],
            'project' => [
                [
                    'title' => 'Hero Project',
                    'slug' => 'hero-project',
                    'content' => json_encode([
                        '__type' => 'project_hero',
                        'badge' => 'Portofolio',
                        'heading' => 'Karya Terbaik Kami',
                        'description' => 'Lihat bagaimana kami membantu klien mencapai tujuan mereka melalui teknologi.',
                    ]),
                ],
            ],
            'career' => [
                [
                    'title' => 'Hero Career',
                    'slug' => 'hero-career',
                    'content' => json_encode([
                        '__type' => 'career_hero',
                        'badge' => 'Karir',
                        'heading' => 'Berkembang Bersama Kami',
                        'description' => 'Temukan peluang karir yang menantang dan lingkungan kerja yang mendukung.',
                    ]),
                ],
            ],
            'blog' => [
                [
                    'title' => 'Hero Blog',
                    'slug' => 'hero-blog',
                    'content' => json_encode([
                        '__type' => 'blog_hero',
                        'badge' => 'Wawasan',
                        'heading' => 'Artikel & Berita Terbaru',
                        'description' => 'Ikuti perkembangan teknologi dan tren bisnis terkini bersama kami.',
                    ]),
                ],
            ],
            'contact' => [
                [
                    'title' => 'Hero Contact',
                    'slug' => 'hero-contact',
                    'content' => json_encode([
                        '__type' => 'contact_hero',
                        'heading' => 'Kontak Kami',
                        'description' => 'Mitra strategis untuk pertumbuhan bisnis lintas industri.',
                        'background_image' => null,
                    ]),
                ],
                [
                    'title' => 'Contact Info',
                    'slug' => 'contact-info',
                    'content' => json_encode([
                        '__type' => 'contact_info',
                        'address' => 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta, 10110',
                        'phone' => '+62 21 555 8890',
                        'email' => 'hello@harmonygroup.id',
                        'operating_hours' => 'Senin - Jumat: 08:00 - 17:00',
                        'map_embed' => null,
                    ]),
                ],
            ],
        ];

        foreach ($sections as $slug => $sectionList) {
            $page = Page::where('slug', $slug)->first();
            if (! $page) {
                continue;
            }

            foreach ($sectionList as $order => $section) {
                // Ensure content is properly JSON encoded if it's an array,
                // but we already json_encoded it in the array definition for clarity.
                // However, the previous code might expect it to strictly be a string or array.
                // In my definition above, 'content' is ALREADY a string (result of json_encode).
                // So we just use it directly.

                PageSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'slug' => $section['slug'],
                    ],
                    [
                        'title' => $section['title'],
                        'content' => $section['content'],
                        'display_order' => $order,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
