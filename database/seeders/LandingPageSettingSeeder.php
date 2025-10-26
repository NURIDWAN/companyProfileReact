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
                'heading' => 'Inovasi Digital untuk Mendorong Pertumbuhan Bisnis Anda',
                'subheading' => 'Kami mengubah tantangan menjadi peluang melalui solusi teknologi yang cerdas dan strategi yang terbukti berhasil. Mari bangun masa depan bersama.',
                'primary_label' => 'Mulai Konsultasi',
                'primary_link' => '/contact',
                'secondary_label' => 'Pelajari Layanan',
                'secondary_link' => '/service',
                'image' => null,
            ],
            'landing.about' => [
                'title' => 'Tentang Nusantara Digital Solution',
                'description' => 'Sejak 2015 kami mendampingi mitra pemerintah dan korporasi dalam transformasi digital bermakna. Tim lintas disiplin kami membantu merancang produk digital, mengelola implementasi, hingga memastikan adopsi berjalan efektif.',
                'highlights' => [
                    'Tim profesional dengan pengalaman >10 tahun',
                    'Eksekusi proyek tepat waktu dan terukur',
                    'Standar keamanan dan kualitas enterprise',
                    'Support operasional dan pelatihan berkelanjutan',
                ],
                'image' => null,
            ],
            'landing.final_cta' => [
                'heading' => 'Siap Mengambil Langkah Selanjutnya?',
                'description' => 'Mari diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda. Hubungi kami hari ini untuk sesi konsultasi tanpa biaya.',
                'button_label' => 'Hubungi Kami',
                'button_link' => '/contact',
            ],
            'landing.metrics' => [
                ['value' => '100+', 'label' => 'Klien Dipercaya'],
                ['value' => '25+', 'label' => 'Solusi Produk'],
                ['value' => '4.8/5', 'label' => 'Rating Pelanggan'],
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
