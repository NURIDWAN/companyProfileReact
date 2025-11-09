<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\JobPosition;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

class JobPositionSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        JobApplication::query()->truncate();
        JobPosition::query()->truncate();
        Schema::enableForeignKeyConstraints();

        $positions = [
            [
                'title' => 'Senior Backend Engineer',
                'slug' => 'senior-backend-engineer',
                'department' => 'Technology',
                'location' => 'Jakarta / Remote',
                'employment_type' => 'full_time',
                'salary_range' => 'Rp 18 - 25 juta',
                'description' => 'Bertanggung jawab atas perancangan dan implementasi microservice berskala nasional.',
                'requirements' => 'Berpengalaman pada Laravel atau Node.js minimal 4 tahun, memahami arsitektur event-driven, serta praktik CI/CD.',
                'is_active' => true,
                'posted_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Product Manager',
                'slug' => 'product-manager',
                'department' => 'Product',
                'location' => 'Bandung / Hybrid',
                'employment_type' => 'full_time',
                'salary_range' => 'Rp 20 - 28 juta',
                'description' => 'Mengelola roadmap produk SaaS B2B dengan pendekatan discovery dan delivery yang seimbang.',
                'requirements' => 'Pengalaman memimpin produk digital minimal 3 tahun, mampu berkolaborasi lintas fungsi, dan data driven.',
                'is_active' => true,
                'posted_at' => Carbon::now()->subWeek(),
            ],
            [
                'title' => 'UI/UX Researcher',
                'slug' => 'ui-ux-researcher',
                'department' => 'Design',
                'location' => 'Surabaya / Remote',
                'employment_type' => 'contract',
                'salary_range' => 'Rp 12 - 16 juta',
                'description' => 'Melakukan studi pengguna, usability testing, dan menyusun insight yang actionable.',
                'requirements' => 'Mampu mengelola end-to-end riset pengguna dan menyajikan temuan dalam bentuk storytelling.',
                'is_active' => true,
                'posted_at' => Carbon::now()->subDays(10),
            ],
        ];

        foreach ($positions as $position) {
            JobPosition::create($position);
        }
    }
}
