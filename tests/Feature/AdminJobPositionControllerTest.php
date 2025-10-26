<?php

use App\Models\JobPosition;

it('can create a job position', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.job-positions.store'), [
        'title' => 'Backend Engineer',
        'slug' => 'backend-engineer',
        'department' => 'Technology',
        'location' => 'Jakarta',
        'employment_type' => 'full_time',
        'salary_range' => 'Rp 15-20 juta',
        'description' => 'Deskripsi pekerjaan',
        'requirements' => 'Persyaratan',
        'is_active' => true,
        'posted_at' => now()->toDateString(),
    ]);

    $response->assertRedirect(route('admin.job-positions.index'));
    $this->assertDatabaseHas('job_positions', ['title' => 'Backend Engineer']);
});

it('can update a job position', function () {
    $admin = actingAsAdmin();
    $position = JobPosition::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.job-positions.update', $position), [
        'title' => 'Data Engineer',
        'slug' => 'data-engineer',
        'department' => 'Data',
        'location' => 'Bandung',
        'employment_type' => 'contract',
        'salary_range' => 'Rp 25-30 juta',
        'description' => 'Deskripsi baru',
        'requirements' => 'Requirement baru',
        'is_active' => false,
    ]);

    $response->assertRedirect(route('admin.job-positions.index'));
    expect($position->refresh()->title)->toBe('Data Engineer');
});

it('can delete a job position', function () {
    $admin = actingAsAdmin();
    $position = JobPosition::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.job-positions.destroy', $position));

    $response->assertRedirect(route('admin.job-positions.index'));
    $this->assertDatabaseMissing('job_positions', ['id' => $position->id]);
});
