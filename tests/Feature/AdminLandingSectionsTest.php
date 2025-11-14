<?php

use App\Models\CompanySetting;

it('can update landing section visibility', function () {
    $admin = actingAsAdmin();

    $payload = [
        'hero' => false,
        'about' => true,
        'services' => true,
        'testimonials' => false,
        'team' => true,
        'articles' => true,
        'final_cta' => false,
        'metrics' => true,
    ];

    $response = $this->actingAs($admin)->post(route('admin.landing.sections.update'), $payload);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::query()->where('key', 'landing.sections')->first();

    expect($setting)->not->toBeNull();
    expect($setting->value)->toMatchArray($payload);
});
