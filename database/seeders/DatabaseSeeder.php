<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@nusantaradigital.id'],
            [
                'name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );

        $this->call([
            ServiceSeeder::class,
            ProductSeeder::class,
            ProjectSeeder::class,
            JobPositionSeeder::class,
            TeamMemberSeeder::class,
            TestimonialSeeder::class,
            CompanySettingSeeder::class,
            LandingPageSettingSeeder::class,
            ServicePageSettingSeeder::class,
            BlogPostSeeder::class,
            SitePresentationSeeder::class,
        ]);
    }
}
