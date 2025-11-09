<?php

namespace Database\Factories;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactMessage>
 */
class ContactMessageFactory extends Factory
{
    protected $model = ContactMessage::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
            'subject' => $this->faker->optional()->sentence(4),
            'message' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['new', 'in_progress', 'resolved']),
            'notes' => $this->faker->optional()->sentence(),
            'handled_at' => null,
        ];
    }
}
