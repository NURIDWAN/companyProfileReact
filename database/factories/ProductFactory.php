<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'cover_image' => null,
            'thumbnail' => null,
            'excerpt' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement(['Software', 'Services', 'Education']),
            'features' => $this->faker->words(3),
            'price' => $this->faker->randomFloat(2, 100000, 5000000),
            'clients' => $this->faker->numberBetween(1, 200),
            'rating' => $this->faker->randomFloat(1, 3, 5),
            'popular' => $this->faker->boolean(),
            'demo' => $this->faker->boolean(),
            'is_active' => true,
        ];
    }
}
