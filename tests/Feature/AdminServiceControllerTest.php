<?php

use App\Models\Service;

it('can create a service', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.services.store'), [
        'name' => 'Pengembangan Web',
        'slug' => 'pengembangan-web',
        'icon' => 'code',
        'excerpt' => 'Ringkasan layanan',
        'description' => 'Deskripsi layanan',
        'display_order' => 1,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.services.index'));
    $this->assertDatabaseHas('services', ['name' => 'Pengembangan Web', 'is_active' => true]);
});

it('can update a service', function () {
    $admin = actingAsAdmin();
    $service = Service::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.services.update', $service), [
        'name' => 'Konsultasi Digital',
        'slug' => 'konsultasi-digital',
        'icon' => 'monitor',
        'excerpt' => 'Ringkasan baru',
        'description' => 'Deskripsi baru',
        'display_order' => 2,
        'is_active' => false,
    ]);

    $response->assertRedirect(route('admin.services.index'));
    $service->refresh();

    expect($service->name)->toBe('Konsultasi Digital');
    expect($service->is_active)->toBeFalse();
});

it('can delete a service', function () {
    $admin = actingAsAdmin();
    $service = Service::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.services.destroy', $service));

    $response->assertRedirect(route('admin.services.index'));
    $this->assertDatabaseMissing('services', ['id' => $service->id]);
});
