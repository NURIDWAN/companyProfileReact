<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        TeamMember::query()->truncate();

        $members = [
            [
                'name' => 'Anisa Maulani',
                'role' => 'Chief Executive Officer',
                'photo' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
                'linkedin' => 'https://www.linkedin.com/in/anisa-maulani',
                'display_order' => 1,
                'is_active' => true,
                'bio' => 'Memimpin arah strategi perusahaan dengan fokus pada inovasi produk dan pertumbuhan berkelanjutan.',
            ],
            [
                'name' => 'Rizky Pratama',
                'role' => 'Chief Technology Officer',
                'photo' => 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
                'linkedin' => 'https://www.linkedin.com/in/rizky-pratama',
                'display_order' => 2,
                'is_active' => true,
                'bio' => 'Mengarahkan arsitektur teknologi, praktik engineering, serta roadmap produk digital.',
            ],
            [
                'name' => 'Siti Rahmayanti',
                'role' => 'Head of Delivery',
                'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                'linkedin' => 'https://www.linkedin.com/in/siti-rahmayanti',
                'display_order' => 3,
                'is_active' => true,
                'bio' => 'Mengelola eksekusi proyek lintas industri dengan pendekatan agile dan tujuan bisnis yang terukur.',
            ],
            [
                'name' => 'Agus Budi Santoso',
                'role' => 'Head of Data & AI',
                'photo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
                'linkedin' => 'https://www.linkedin.com/in/agus-budi',
                'display_order' => 4,
                'is_active' => true,
                'bio' => 'Memimpin solusi data dan kecerdasan buatan untuk klien enterprise dan pemerintahan.',
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
