<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->truncate();

        $products = [
            [
                'name' => 'Platform CRM Enterprise',
                'slug' => 'platform-crm-enterprise',
                'cover_image' => 'https://images.unsplash.com/photo-1521791055366-0d553872125f',
                'thumbnail' => 'https://images.unsplash.com/photo-1521791055366-0d553872125f',
                'excerpt' => 'Kelola funnel penjualan dan layanan pelanggan dalam satu platform terpadu.',
                'description' => 'Mendukung pipeline B2B maupun B2C dengan otomatisasi tugas, integrasi multi-channel, dan dashboard real-time.',
                'category' => 'Software',
                'features' => [
                    'Automasi marketing dan follow-up',
                    'Integrasi WhatsApp dan email',
                    'Laporan kinerja penjualan real-time',
                ],
                'price' => 4500000,
                'clients' => 120,
                'rating' => 4.8,
                'popular' => true,
                'demo' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Learning Management System',
                'slug' => 'learning-management-system',
                'cover_image' => 'https://images.unsplash.com/photo-1513258496099-48168024aec0',
                'thumbnail' => 'https://images.unsplash.com/photo-1513258496099-48168024aec0',
                'excerpt' => 'Solusi e-learning untuk pemerintahan dan korporasi dengan pelacakan kompetensi.',
                'description' => 'Menawarkan authoring modul, ujian online, gamifikasi, dan integrasi HRIS.',
                'category' => 'Education',
                'features' => [
                    'Katalog pelatihan terpersonalisasi',
                    'Assessment dan sertifikasi digital',
                    'Laporan progres karyawan dan compliance',
                ],
                'price' => 3200000,
                'clients' => 85,
                'rating' => 4.6,
                'popular' => true,
                'demo' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Portal Layanan Publik',
                'slug' => 'portal-layanan-publik',
                'cover_image' => 'https://images.unsplash.com/photo-1526378722484-cc2cdda0ca68',
                'thumbnail' => 'https://images.unsplash.com/photo-1526378722484-cc2cdda0ca68',
                'excerpt' => 'Digitalisasi layanan administrasi dengan workflow tanpa kertas.',
                'description' => 'Mendukung pengajuan perizinan, tanda tangan elektronik, dan integrasi OSS berbasis standar keamanan nasional.',
                'category' => 'Government',
                'features' => [
                    'Single Sign-On warga',
                    'Pelacakan status permohonan',
                    'Integrasi pembayaran non-tunai',
                ],
                'price' => 5500000,
                'clients' => 45,
                'rating' => 4.7,
                'popular' => false,
                'demo' => false,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
