<?php

use App\Models\CompanySetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('can update hero content with image upload', function () {
    Storage::fake('public');

    $admin = User::factory()->create();

    CompanySetting::create([
        'key' => 'landing.hero',
        'group' => 'landing',
        'value' => [
            'heading' => 'Old Heading',
            'image' => null,
        ],
    ]);

    $response = $this->actingAs($admin)->post(route('admin.landing.hero'), [
        'heading' => 'New Hero Title',
        'subheading' => 'Deskripsi hero',
        'primary_label' => 'Hubungi',
        'primary_link' => '/contact',
        'image' => UploadedFile::fake()->image('hero.jpg'),
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'landing.hero')->firstOrFail();

    expect($setting->value['heading'])->toBe('New Hero Title');
    expect($setting->value['primary_label'])->toBe('Hubungi');
    Storage::disk('public')->assertExists($setting->value['image']);
});

it('can update about content and highlights', function () {
    Storage::fake('public');
    $admin = User::factory()->create();

    CompanySetting::create([
        'key' => 'landing.about',
        'group' => 'landing',
        'value' => [],
    ]);

    $response = $this->actingAs($admin)->post(route('admin.landing.about.update'), [
        'title' => 'Tentang Kami',
        'description' => 'Deskripsi singkat',
        'highlights' => "Pengalaman luas\nTim Profesional",
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'landing.about')->firstOrFail();
    expect($setting->value['title'])->toBe('Tentang Kami');
    expect($setting->value['highlights'])->toBe(['Pengalaman luas', 'Tim Profesional']);
});

it('can update landing metrics list', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.landing.metrics.update'), [
        'metrics' => "100+|Klien Dipercaya\n25+|Solusi",
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $metrics = CompanySetting::where('key', 'landing.metrics')->value('value');

    expect($metrics)->toHaveLength(2)
        ->and($metrics[0]['value'])->toBe('100+')
        ->and($metrics[0]['label'])->toBe('Klien Dipercaya');
});
