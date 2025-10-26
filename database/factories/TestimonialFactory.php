<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        return [
            'author_name' => $this->faker->name(),
            'author_role' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'avatar' => null,
            'quote' => $this->faker->paragraph(),
            'rating' => $this->faker->numberBetween(4, 5),
            'is_active' => true,
        ];
    }
}
