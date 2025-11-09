<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\JobPosition;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        if (JobPosition::query()->count() === 0) {
            JobPosition::factory()->count(3)->create();
        }

        JobApplication::factory()
            ->count(5)
            ->create();
    }
}
