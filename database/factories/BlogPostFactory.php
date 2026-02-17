<?php

namespace Database\Factories;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence();

        return [
            'author_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.$this->faker->unique()->numberBetween(10, 999),
            'excerpt' => $this->faker->sentence(),
            'body' => $this->faker->paragraphs(2, true),
            'cover_image' => null,
            'is_published' => true,
            'published_at' => now(),
        ];
    }
}
