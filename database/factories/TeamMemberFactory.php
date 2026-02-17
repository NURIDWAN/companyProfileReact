<?php

namespace Database\Factories;

use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TeamMember>
 */
class TeamMemberFactory extends Factory
{
    protected $model = TeamMember::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'role' => $this->faker->jobTitle(),
            'photo' => null,
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->e164PhoneNumber(),
            'linkedin' => 'https://www.linkedin.com/in/'.$this->faker->userName(),
            'display_order' => $this->faker->numberBetween(1, 10),
            'is_active' => true,
            'bio' => $this->faker->sentence(),
        ];
    }
}
