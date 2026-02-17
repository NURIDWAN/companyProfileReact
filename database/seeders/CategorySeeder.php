<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Berita',
                'slug' => 'berita',
                'description' => 'Berita terbaru seputar perusahaan dan industri.',
            ],
            [
                'name' => 'Pengumuman',
                'slug' => 'pengumuman',
                'description' => 'Pengumuman penting dari perusahaan.',
            ],
            [
                'name' => 'Artikel',
                'slug' => 'artikel',
                'description' => 'Artikel informatif dan insight bisnis.',
            ],
            [
                'name' => 'Tips & Tutorial',
                'slug' => 'tips-tutorial',
                'description' => 'Tips dan tutorial praktis.',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
