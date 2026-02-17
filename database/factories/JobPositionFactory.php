<?php

namespace Database\Factories;

use App\Models\JobPosition;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<JobPosition>
 */
class JobPositionFactory extends Factory
{
    protected $model = JobPosition::class;

    public function definition(): array
    {
        $title = $this->faker->jobTitle();

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.$this->faker->unique()->numberBetween(100, 999),
            'department' => $this->faker->randomElement(['Technology', 'Product', 'Design']),
            'location' => $this->faker->city(),
            'employment_type' => $this->faker->randomElement(['full_time', 'contract', 'part_time']),
            'salary_range' => 'Rp '.$this->faker->numberBetween(5, 20).' - '.$this->faker->numberBetween(21, 30).' juta',
            'description' => $this->faker->paragraph(),
            'requirements' => $this->faker->paragraph(),
            'is_active' => true,
            'posted_at' => now(),
        ];
    }
}
