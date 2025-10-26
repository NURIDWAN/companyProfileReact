<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::query()->truncate();

        $services = [
            [
                'name' => 'Konsultasi Transformasi Digital',
                'slug' => 'konsultasi-transformasi-digital',
                'icon' => 'monitor-smartphone',
                'excerpt' => 'Pendampingan strategi digital end-to-end untuk mempercepat inovasi bisnis.',
                'description' => 'Kami membantu organisasi merancang peta jalan transformasi digital mulai dari assessment, desain solusi, implementasi hingga change management.',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Pengembangan Aplikasi Kustom',
                'slug' => 'pengembangan-aplikasi-kustom',
                'icon' => 'code-2',
                'excerpt' => 'Membangun aplikasi web dan mobile yang scalable dan aman.',
                'description' => 'Tim kami merancang dan mengembangkan aplikasi kustom menggunakan teknologi modern seperti Laravel, React, dan Node.js dengan praktik clean code.',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Implementasi Data & AI',
                'slug' => 'implementasi-data-ai',
                'icon' => 'brain-circuit',
                'excerpt' => 'Membantu organisasi memanfaatkan data untuk insight dan otomatisasi.',
                'description' => 'Mulai dari integrasi data warehouse, dashboard analitik, hingga machine learning untuk otomasi proses bisnis.',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Operasional dan Managed Services',
                'slug' => 'operasional-managed-services',
                'icon' => 'life-buoy',
                'excerpt' => 'Layanan DevOps, pemeliharaan aplikasi, dan dukungan 24/7.',
                'description' => 'Kami memastikan aplikasi tetap andal dengan monitoring proaktif, SLA yang jelas, dan dukungan teknis berkelanjutan.',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
