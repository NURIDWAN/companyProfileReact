<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(3);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => 'star',
            'excerpt' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'display_order' => $this->faker->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
