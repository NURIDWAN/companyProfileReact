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
            'gallery' => $this->faker->randomElements(
                [
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                    'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                ],
                $this->faker->numberBetween(1, 3)
            ),
            'excerpt' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement(['Software', 'Services', 'Education']),
            'features' => $this->faker->words(3),
            'price' => $this->faker->randomFloat(2, 100000, 5000000),
            'price_variants' => collect(range(1, $this->faker->numberBetween(1, 3)))
                ->map(function ($index) {
                    $basePrice = $this->faker->randomFloat(0, 1000000, 5000000);

                    return [
                        'name' => $index === 1 ? 'Basic' : ($index === 2 ? 'Standard' : 'Premium'),
                        'price' => $basePrice,
                        'compare_at_price' => random_int(0, 1) ? $basePrice + 250000 : null,
                        'sku' => strtoupper(Str::random(8)),
                        'stock' => $this->faker->numberBetween(0, 250),
                    ];
                })
                ->all(),
            'purchase_url' => $this->faker->url(),
            'whatsapp_number' => $this->faker->numerify('62812########'),
            'clients' => $this->faker->numberBetween(1, 200),
            'rating' => $this->faker->randomFloat(1, 3, 5),
            'popular' => $this->faker->boolean(),
            'demo' => $this->faker->boolean(),
            'is_active' => true,
        ];
    }
}
