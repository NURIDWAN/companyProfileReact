<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        Testimonial::query()->truncate();

        $testimonials = [
            [
                'author_name' => 'Hendra Saputra',
                'author_role' => 'Chief Digital Officer',
                'company' => 'Bumi Energi Nusantara',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                'quote' => 'Implementasi platform data kami selesai lebih cepat dari estimasi dengan kualitas yang terukur. Tim sangat responsif terhadap perubahan kebutuhan.',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'author_name' => 'Rani Pratiwi',
                'author_role' => 'Head of Customer Experience',
                'company' => 'Sahabat Finansial',
                'avatar' => 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
                'quote' => 'CRM yang dibangun memberikan insight pelanggan yang selama ini tidak kami miliki. Dampaknya terlihat pada peningkatan retensi dalam 3 bulan.',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'author_name' => 'Yusuf Ardiansyah',
                'author_role' => 'Sekretaris Daerah',
                'company' => 'Pemkot Samarinda',
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                'quote' => 'Portal layanan publik yang dikembangkan memudahkan warga sekaligus memangkas proses birokrasi internal.',
                'rating' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
