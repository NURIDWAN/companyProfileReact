<?php

namespace Database\Factories;

use App\Models\JobApplication;
use App\Models\JobPosition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobApplication>
 */
class JobApplicationFactory extends Factory
{
    protected $model = JobApplication::class;

    public function definition(): array
    {
        return [
            'job_position_id' => JobPosition::factory(),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => '+62 '.$this->faker->numerify('8##########'),
            'linkedin_url' => $this->faker->optional()->url(),
            'portfolio_url' => $this->faker->optional()->url(),
            'cover_letter' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['pending', 'reviewing', 'shortlisted']),
        ];
    }
}
