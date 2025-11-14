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
                'gallery' => [
                    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
                    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
                ],
                'excerpt' => 'Kelola funnel penjualan dan layanan pelanggan dalam satu platform terpadu.',
                'description' => 'Mendukung pipeline B2B maupun B2C dengan otomatisasi tugas, integrasi multi-channel, dan dashboard real-time.',
                'category' => 'Software',
                'features' => [
                    'Automasi marketing dan follow-up',
                    'Integrasi WhatsApp dan email',
                    'Laporan kinerja penjualan real-time',
                ],
                'price' => 4500000,
                'price_variants' => [
                    [
                        'name' => 'Starter 10 User',
                        'price' => 4500000,
                        'compare_at_price' => 4950000,
                        'sku' => 'CRM-STARTER-10',
                        'stock' => 25,
                    ],
                    [
                        'name' => 'Professional 50 User',
                        'price' => 8500000,
                        'compare_at_price' => 9200000,
                        'sku' => 'CRM-PRO-50',
                        'stock' => 12,
                    ],
                    [
                        'name' => 'Enterprise Unlimited',
                        'price' => 14500000,
                        'compare_at_price' => null,
                        'sku' => 'CRM-ENT-UNL',
                        'stock' => null,
                    ],
                ],
                'purchase_url' => 'https://shop.harmonygroup.id/products/platform-crm-enterprise',
                'whatsapp_number' => '628111223344',
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
                'gallery' => [
                    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
                ],
                'excerpt' => 'Solusi e-learning untuk pemerintahan dan korporasi dengan pelacakan kompetensi.',
                'description' => 'Menawarkan authoring modul, ujian online, gamifikasi, dan integrasi HRIS.',
                'category' => 'Education',
                'features' => [
                    'Katalog pelatihan terpersonalisasi',
                    'Assessment dan sertifikasi digital',
                    'Laporan progres karyawan dan compliance',
                ],
                'price' => 3200000,
                'price_variants' => [
                    [
                        'name' => 'Starter',
                        'price' => 3200000,
                        'compare_at_price' => 3600000,
                        'sku' => 'LMS-START',
                        'stock' => 50,
                    ],
                    [
                        'name' => 'Corporate',
                        'price' => 6800000,
                        'compare_at_price' => null,
                        'sku' => 'LMS-CORP',
                        'stock' => 30,
                    ],
                ],
                'purchase_url' => 'https://shop.harmonygroup.id/products/learning-management-system',
                'whatsapp_number' => '628122334455',
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
                'gallery' => [
                    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
                ],
                'excerpt' => 'Digitalisasi layanan administrasi dengan workflow tanpa kertas.',
                'description' => 'Mendukung pengajuan perizinan, tanda tangan elektronik, dan integrasi OSS berbasis standar keamanan nasional.',
                'category' => 'Government',
                'features' => [
                    'Single Sign-On warga',
                    'Pelacakan status permohonan',
                    'Integrasi pembayaran non-tunai',
                ],
                'price' => 5500000,
                'price_variants' => [
                    [
                        'name' => 'Kota/Kabupaten',
                        'price' => 5500000,
                        'compare_at_price' => null,
                        'sku' => 'PORTAL-REG-01',
                        'stock' => null,
                    ],
                    [
                        'name' => 'Provinsi',
                        'price' => 9500000,
                        'compare_at_price' => null,
                        'sku' => 'PORTAL-PROV-01',
                        'stock' => null,
                    ],
                ],
                'purchase_url' => 'https://shop.harmonygroup.id/products/portal-layanan-publik',
                'whatsapp_number' => '628133445566',
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
