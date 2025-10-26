<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class ServicePageSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'service.hero' => [
                'heading' => 'Solusi Digital Inovatif untuk',
                'subheading' => 'Kami membantu bisnis bertransformasi secara digital dengan layanan pengembangan web, aplikasi mobile, dan desain UI/UX kelas dunia.',
                'highlight' => 'Masa Depan Bisnis Anda',
                'primary_label' => 'Lihat Layanan Kami',
                'primary_link' => '/service',
                'secondary_label' => 'Hubungi Kami',
                'secondary_link' => '/contact',
                'background_image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
            ],
            'service.summary' => [
                'badge' => 'Portofolio Layanan',
                'heading' => 'Solusi yang Kami Tawarkan',
                'description' => 'Rangkaian layanan teknologi terintegrasi untuk membantu organisasi tumbuh dengan percaya diri.',
            ],
            'service.offerings' => [
                'badge' => 'Layanan Kami',
                'heading' => 'Apa yang Kami Tawarkan',
                'description' => 'Solusi lengkap untuk memenuhi semua kebutuhan digital dan teknologi perusahaan Anda.',
                'items' => [],
            ],
            'service.tech_stack' => [
                'heading' => 'Teknologi yang Kami Gunakan',
                'description' => 'Kami mengandalkan teknologi modern dan teruji untuk hasil terbaik.',
                'items' => [
                    ['name' => 'Laravel', 'logo' => 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg'],
                    ['name' => 'React', 'logo' => 'https://cdn.worldvectorlogo.com/logos/react-2.svg'],
                    ['name' => 'Next.js', 'logo' => 'https://cdn.worldvectorlogo.com/logos/next-js.svg'],
                    ['name' => 'Vue.js', 'logo' => 'https://cdn.worldvectorlogo.com/logos/vue-9.svg'],
                    ['name' => 'Node.js', 'logo' => 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'],
                    ['name' => 'Tailwind CSS', 'logo' => 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg'],
                    ['name' => 'Figma', 'logo' => 'https://cdn.worldvectorlogo.com/logos/figma-1.svg'],
                    ['name' => 'AWS', 'logo' => 'https://cdn.worldvectorlogo.com/logos/aws-logo.svg'],
                ],
            ],
            'service.process' => [
                'badge' => 'Metodologi Kami',
                'heading' => 'Proses Kerja Kami',
                'description' => null,
                'items' => [
                    [
                        'step' => '01',
                        'title' => 'Konsultasi & Analisis',
                        'description' => 'Memformulasikan kebutuhan dan tujuan bisnis Anda secara mendalam.',
                        'icon' => 'Search',
                    ],
                    [
                        'step' => '02',
                        'title' => 'Perencanaan & Desain',
                        'description' => 'Merancang solusi yang tepat dengan arsitektur dan desain optimal.',
                        'icon' => 'LayoutTemplate',
                    ],
                    [
                        'step' => '03',
                        'title' => 'Development & Testing',
                        'description' => 'Pengembangan dengan quality assurance dan testing menyeluruh.',
                        'icon' => 'Code',
                    ],
                    [
                        'step' => '04',
                        'title' => 'Deployment & Support',
                        'description' => 'Go-live dan dukungan berkelanjutan untuk kesuksesan jangka panjang.',
                        'icon' => 'Rocket',
                    ],
                ],
            ],
            'service.advantages' => [
                'badge' => 'Keunggulan Kami',
                'heading' => 'Mengapa Memilih Kami?',
                'description' => null,
                'items' => [
                    [
                        'title' => 'Tim Berpengalaman',
                        'description' => 'Didukung oleh tim profesional dengan pengalaman lebih dari 10 tahun di industri teknologi.',
                        'icon' => 'Users',
                    ],
                    [
                        'title' => 'Teknologi Terdepan',
                        'description' => 'Menggunakan framework modern seperti Laravel, React, dan Next.js untuk produk yang up-to-date.',
                        'icon' => 'Layers',
                    ],
                    [
                        'title' => 'Support 24/7',
                        'description' => 'Dukungan teknis dan maintenance berkelanjutan dengan response time yang cepat.',
                        'icon' => 'LifeBuoy',
                    ],
                    [
                        'title' => 'Keamanan Terjamin',
                        'description' => 'Implementasi standar keamanan tertinggi untuk melindungi data dan aplikasi Anda.',
                        'icon' => 'Shield',
                    ],
                ],
            ],
            'service.faqs' => [
                'badge' => 'Butuh Bantuan?',
                'heading' => 'Pertanyaan Umum',
                'description' => 'Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.',
                'items' => [
                    [
                        'question' => 'Berapa lama waktu yang dibutuhkan untuk membuat sebuah proyek?',
                        'answer' => 'Waktu pengerjaan bergantung pada kompleksitas dan skala proyek. Proyek sederhana memakan waktu 4-6 minggu sementara proyek kompleks bisa beberapa bulan.',
                    ],
                    [
                        'question' => 'Apakah saya bisa melihat progres pengerjaan proyek?',
                        'answer' => 'Kami menerapkan proses kerja transparan dengan akses ke project management tool sehingga Anda dapat memantau progres dan memberikan feedback.',
                    ],
                    [
                        'question' => 'Bagaimana dengan support setelah proyek selesai?',
                        'answer' => 'Kami menyediakan paket maintenance dan support berkelanjutan untuk memastikan aplikasi berjalan lancar setelah peluncuran.',
                    ],
                    [
                        'question' => 'Berapa biaya untuk layanan Anda?',
                        'answer' => 'Biaya ditentukan oleh ruang lingkup, fitur, dan teknologi. Setelah analisis awal kami akan memberikan penawaran harga yang transparan.',
                    ],
                ],
            ],
        ];

        foreach ($settings as $key => $value) {
            CompanySetting::updateOrCreate(
                ['key' => $key],
                ['group' => 'service', 'value' => $value]
            );
        }
    }
}
