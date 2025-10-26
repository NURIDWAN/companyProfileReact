<?php

use App\Models\Project;
use Illuminate\Support\Carbon;

it('can create a project', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.projects.store'), [
        'name' => 'Portal Investasi',
        'slug' => 'portal-investasi',
        'client_name' => 'Pemprov',
        'summary' => 'Ringkasan proyek',
        'description' => 'Deskripsi proyek',
        'started_at' => Carbon::now()->subMonths(3)->toDateString(),
        'completed_at' => Carbon::now()->toDateString(),
        'status' => 'completed',
    ]);

    $response->assertRedirect(route('admin.projects.index'));
    $this->assertDatabaseHas('projects', ['name' => 'Portal Investasi']);
});

it('can update a project', function () {
    $admin = actingAsAdmin();
    $project = Project::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.projects.update', $project), [
        'name' => 'Project Baru',
        'slug' => 'project-baru',
        'client_name' => 'Klien Baru',
        'summary' => 'Summary baru',
        'description' => 'Deskripsi baru',
        'status' => 'in_progress',
    ]);

    $response->assertRedirect(route('admin.projects.index'));
    expect($project->refresh()->status)->toBe('in_progress');
});

it('can delete a project', function () {
    $admin = actingAsAdmin();
    $project = Project::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.projects.destroy', $project));

    $response->assertRedirect(route('admin.projects.index'));
    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});
