<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(2);

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.$this->faker->unique()->numberBetween(100, 999),
            'client_name' => $this->faker->company(),
            'summary' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'started_at' => now()->subMonths(rand(1, 6)),
            'completed_at' => null,
            'status' => $this->faker->randomElement(['draft', 'in_progress', 'completed']),
        ];
    }
}
