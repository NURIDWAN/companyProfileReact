<?php

use App\Models\JobApplication;
use App\Models\JobPosition;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('lists job applications for admin users', function () {
    $admin = actingAsAdmin();
    JobApplication::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.job-applications.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/job-applications/Index')
            ->has('applications.data', 1)
        );
});

it('shows job application detail', function () {
    $admin = actingAsAdmin();
    $application = JobApplication::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.job-applications.show', $application))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/job-applications/Show')
            ->where('application.name', $application->name)
        );
});

it('updates job application status', function () {
    $admin = actingAsAdmin();
    $application = JobApplication::factory()->create(['status' => 'pending']);

    $this->actingAs($admin)
        ->patch(route('admin.job-applications.status', $application), [
            'status' => 'interview',
        ])
        ->assertRedirect();

    $application->refresh();

    expect($application->status)->toBe('interview');
});

it('deletes job application and removes resume file', function () {
    Storage::fake('public');
    $admin = actingAsAdmin();
    $job = JobPosition::factory()->create();
    $path = UploadedFile::fake()->create('resume.pdf', 120)->store('applications', 'public');

    $application = JobApplication::factory()->create([
        'job_position_id' => $job->id,
        'resume_path' => $path,
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.job-applications.destroy', $application))
        ->assertRedirect(route('admin.job-applications.index'));

    Storage::disk('public')->assertMissing($path);
    $this->assertDatabaseMissing('job_applications', ['id' => $application->id]);
});
