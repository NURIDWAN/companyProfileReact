<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::query()->truncate();

        $projects = [
            [
                'name' => 'Portal Investasi Daerah',
                'slug' => 'portal-investasi-daerah',
                'client_name' => 'Pemprov Jawa Barat',
                'summary' => 'Portal satu pintu untuk promosi investasi dan monitoring realisasi.',
                'description' => 'Menghadirkan katalog peluang investasi, dashboard monitoring, dan integrasi OSS dengan autentikasi tunggal.',
                'started_at' => Carbon::parse('2023-04-01'),
                'completed_at' => Carbon::parse('2023-12-15'),
                'status' => 'completed',
            ],
            [
                'name' => 'Platform Distribusi Farmasi',
                'slug' => 'platform-distribusi-farmasi',
                'client_name' => 'PT Sehat Sentosa',
                'summary' => 'Sistem manajemen supply chain B2B untuk distributor farmasi nasional.',
                'description' => 'Mencakup manajemen pesanan, pelacakan pengiriman real-time, dan analitik permintaan menggunakan machine learning.',
                'started_at' => Carbon::parse('2024-01-10'),
                'status' => 'in_progress',
            ],
            [
                'name' => 'Renewable Energy Monitoring',
                'slug' => 'renewable-energy-monitoring',
                'client_name' => 'Energi Hijau Indonesia',
                'summary' => 'Dashboard IoT untuk memonitor panel surya dan turbin angin secara terpusat.',
                'description' => 'Memanfaatkan perangkat IoT dengan visualisasi produksi energi dan peringatan preventif.',
                'started_at' => Carbon::parse('2024-06-01'),
                'status' => 'planning',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
