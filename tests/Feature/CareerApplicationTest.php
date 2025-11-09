<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('renders job application form', function () {
    $position = \App\Models\JobPosition::factory()->create();

    $this->get(route('career.apply', $position))
        ->assertOk()
        ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
            ->component('landingPage/CareerApply')
            ->where('position.title', $position->title)
        );
});

it('stores job application', function () {
    Storage::fake('public');
    $position = \App\Models\JobPosition::factory()->create();

    $resume = UploadedFile::fake()->create('resume.pdf', 120);

    fakeRecaptcha();

    $this->post(route('career.apply.store', $position), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+62 811 1234 567',
        'linkedin_url' => 'https://linkedin.com/in/janedoe',
        'portfolio_url' => 'https://janedoe.dev',
        'cover_letter' => 'Saya tertarik bergabung.',
        'resume' => $resume,
        'recaptcha_token' => 'token',
    ])
        ->assertRedirect(route('career.show', $position));

    $this->assertDatabaseHas('job_applications', [
        'job_position_id' => $position->id,
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ]);

    $application = \App\Models\JobApplication::firstOrFail();
    Storage::disk('public')->assertExists($application->resume_path);
});
