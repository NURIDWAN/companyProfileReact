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
            ['email' => 'admin@example.id'],
            [
                'name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );

        $this->call([
            RolePermissionSeeder::class,
            ServiceSeeder::class,
            ProductSeeder::class,
            ProjectSeeder::class,
            JobPositionSeeder::class,
            JobApplicationSeeder::class,
            ContactMessageSeeder::class,
            TeamMemberSeeder::class,
            TestimonialSeeder::class,
            CompanySettingSeeder::class,
            LandingPageSettingSeeder::class,
            ServicePageSettingSeeder::class,
            CategorySeeder::class,
            BlogPostSeeder::class,
            SitePresentationSeeder::class,
            PageSeeder::class,
            PageSectionSeeder::class,
            MenuItemSeeder::class,
        ]);
    }
}
