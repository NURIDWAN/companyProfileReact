<?php

use App\Models\User;
use App\Models\Service;
use App\Models\Product;
use App\Models\Project;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\JobPosition;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users see metrics on the dashboard', function () {
    $this->actingAs(User::factory()->create());

    Service::factory()->count(2)->create();
    Product::factory()->count(3)->create();
    Project::factory()->create();
    Testimonial::factory()->create();
    TeamMember::factory()->create();
    JobPosition::factory()->create(['is_active' => true]);

    $this->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->where('metrics.services', 2)
            ->where('metrics.products', 3)
        );
});
