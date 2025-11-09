<?php

use App\Models\CompanySetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('can update hero content with image upload', function () {
    Storage::fake('public');

    $admin = User::factory()->create();

    CompanySetting::create([
        'key' => 'landing.hero',
        'group' => 'landing',
        'value' => [
            'heading' => ['id' => 'Judul Lama', 'en' => 'Old Heading'],
            'image' => null,
        ],
    ]);

    $response = $this->actingAs($admin)->post(route('admin.landing.hero'), [
        'heading' => ['id' => 'Judul Baru', 'en' => 'New Hero Title'],
        'subheading' => ['id' => 'Deskripsi hero', 'en' => 'Hero description'],
        'primary_label' => ['id' => 'Hubungi', 'en' => 'Contact'],
        'primary_link' => ['id' => '/kontak', 'en' => '/contact'],
        'secondary_label' => ['id' => 'Pelajari', 'en' => 'Learn'],
        'secondary_link' => ['id' => '/service', 'en' => '/service'],
        'image' => UploadedFile::fake()->image('hero.jpg'),
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'landing.hero')->firstOrFail();

    expect($setting->value['heading']['id'])->toBe('Judul Baru');
    expect($setting->value['heading']['en'])->toBe('New Hero Title');
    expect($setting->value['primary_label']['en'])->toBe('Contact');
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
        'title' => ['id' => 'Tentang Kami', 'en' => 'About Us'],
        'description' => ['id' => 'Deskripsi singkat', 'en' => 'Short description'],
        'highlights' => [
            'id' => "Pengalaman luas\nTim Profesional",
            'en' => "Extensive experience\nProfessional Team",
        ],
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'landing.about')->firstOrFail();
    expect($setting->value['title']['en'])->toBe('About Us');
    expect($setting->value['highlights']['id'])->toBe(['Pengalaman luas', 'Tim Profesional']);
});

it('can update landing metrics list', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.landing.metrics.update'), [
        'metrics' => [
            'id' => "100+|Klien Dipercaya\n25+|Solusi",
            'en' => "100+|Trusted Clients\n25+|Solutions",
        ],
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $metrics = CompanySetting::where('key', 'landing.metrics')->value('value');

    expect($metrics)->toHaveLength(2)
        ->and($metrics[0]['value']['id'])->toBe('100+')
        ->and($metrics[0]['label']['en'])->toBe('Trusted Clients');
});

it('can update active navigation links', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.landing.navigation.update'), [
        'active_keys' => ['home', 'contact'],
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $navigation = CompanySetting::where('key', 'navigation.primary')->value('value');

    expect(collect($navigation)->firstWhere('key', 'home')['active'])->toBeTrue();
    expect(collect($navigation)->firstWhere('key', 'contact')['active'])->toBeTrue();
    expect(collect($navigation)->firstWhere('key', 'about')['active'])->toBeFalse();
});

it('can update product cta content', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.landing.product-cta.update'), [
        'badge' => ['id' => 'Butuh Bantuan', 'en' => 'Need Help'],
        'heading' => ['id' => 'Siap Berkonsultasi', 'en' => 'Ready to Consult'],
        'description' => ['id' => 'Hubungi tim kami kapan saja.', 'en' => 'Reach out to our team anytime.'],
        'primary_label' => ['id' => 'Hubungi Kami', 'en' => 'Contact Us'],
        'primary_link' => ['id' => '/contact', 'en' => '/contact'],
        'secondary_label' => ['id' => 'Lihat Layanan', 'en' => 'View Services'],
        'secondary_link' => ['id' => '/service', 'en' => '/service'],
        'contacts' => [
            [
                'icon' => 'phone',
                'title' => ['id' => 'Telepon', 'en' => 'Phone'],
                'detail' => ['id' => '+62 811 1234 567', 'en' => '+62 811 1234 567'],
            ],
            [
                'icon' => 'mail',
                'title' => ['id' => 'Email', 'en' => 'Email'],
                'detail' => ['id' => 'info@example.com', 'en' => 'info@example.com'],
            ],
        ],
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'product.cta')->firstOrFail();

    expect($setting->value['badge']['en'])->toBe('Need Help');
    expect($setting->value['contacts'])->toHaveCount(2);
    expect($setting->value['contacts'][0]['icon'])->toBe('phone');
    expect($setting->value['contacts'][1]['title']['id'])->toBe('Email');
});

it('can update product stats labels', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post(route('admin.landing.product-stats.update'), [
        'labels' => [
            'products' => ['id' => 'Produk', 'en' => 'Products'],
            'clients' => ['id' => 'Klien', 'en' => 'Clients'],
            'rating' => ['id' => 'Rating', 'en' => 'Rating'],
            'awards' => ['id' => 'Penghargaan', 'en' => 'Awards'],
        ],
        'awards' => 12,
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'product.stats')->firstOrFail();

    expect($setting->value['labels']['clients']['en'])->toBe('Clients');
    expect($setting->value['awards'])->toBe(12);
});

it('can update service hero with background image', function () {
    Storage::fake('public');
    $admin = User::factory()->create();

    CompanySetting::create([
        'key' => 'service.hero',
        'group' => 'service',
        'value' => [
            'heading' => ['id' => 'Lama', 'en' => 'Old'],
            'background_image' => null,
        ],
    ]);

    $response = $this->actingAs($admin)->post(route('admin.landing.service.hero.update'), [
        'heading' => ['id' => 'Baru', 'en' => 'New'],
        'subheading' => ['id' => 'Subjudul', 'en' => 'Subtitle'],
        'highlight' => ['id' => 'Unggulan', 'en' => 'Highlight'],
        'primary_label' => ['id' => 'Hubungi', 'en' => 'Contact'],
        'primary_link' => ['id' => '/kontak', 'en' => '/contact'],
        'secondary_label' => ['id' => 'Belajar', 'en' => 'Learn'],
        'secondary_link' => ['id' => '/service', 'en' => '/service'],
        'background_image' => UploadedFile::fake()->image('service-hero.jpg'),
    ]);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'service.hero')->firstOrFail();

    expect($setting->value['heading']['id'])->toBe('Baru');
    expect($setting->value['highlight']['en'])->toBe('Highlight');
    expect($setting->value['primary_link']['en'])->toBe('/contact');
    expect($setting->value['background_image'])->not->toBeNull();
    Storage::disk('public')->assertExists($setting->value['background_image']);
});

it('can update service offerings items', function () {
    $admin = User::factory()->create();

    $payload = [
        'badge' => ['id' => 'Badge', 'en' => 'Badge'],
        'heading' => ['id' => 'Penawaran', 'en' => 'Offerings'],
        'description' => ['id' => 'Deskripsi', 'en' => 'Description'],
        'items' => [
            [
                'icon' => 'Layers',
                'title' => ['id' => 'Implementasi', 'en' => 'Implementation'],
                'description' => ['id' => 'Dukungan end-to-end', 'en' => 'End-to-end support'],
            ],
            [
                'icon' => 'Code',
                'title' => ['id' => 'Pengembangan', 'en' => 'Development'],
                'description' => ['id' => 'Aplikasi khusus', 'en' => 'Custom applications'],
            ],
        ],
    ];

    $response = $this->actingAs($admin)->post(route('admin.landing.service.offerings.update'), $payload);

    $response->assertRedirect(route('admin.landing.edit'));

    $setting = CompanySetting::where('key', 'service.offerings')->firstOrFail();

    expect($setting->value['badge']['en'])->toBe('Badge');
    expect($setting->value['items'])->toHaveCount(2);
    expect($setting->value['items'][0]['title']['id'])->toBe('Implementasi');
    expect($setting->value['items'][1]['icon'])->toBe('Code');
});

it('renders the settings content page', function () {
    $admin = User::factory()->create();

    $this->actingAs($admin)
        ->get(route('settings.content.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('settings/content'));
});

it('redirects back to settings content after updating hero', function () {
    $admin = User::factory()->create();

    CompanySetting::create([
        'key' => 'landing.hero',
        'group' => 'landing',
        'value' => [
            'heading' => ['id' => 'Awal', 'en' => 'Initial'],
            'subheading' => ['id' => 'Sub', 'en' => 'Sub'],
            'primary_label' => ['id' => 'Mulai', 'en' => 'Start'],
            'primary_link' => ['id' => '/contact', 'en' => '/contact'],
            'secondary_label' => ['id' => 'Pelajari', 'en' => 'Learn'],
            'secondary_link' => ['id' => '/service', 'en' => '/service'],
        ],
    ]);

    $response = $this->actingAs($admin)->post(route('settings.content.hero'), [
        'heading' => ['id' => 'Baru', 'en' => 'New'],
        'subheading' => ['id' => 'Subjudul', 'en' => 'Subtitle'],
        'primary_label' => ['id' => 'Hubungi', 'en' => 'Contact'],
        'primary_link' => ['id' => '/kontak', 'en' => '/contact'],
        'secondary_label' => ['id' => 'Layanan', 'en' => 'Services'],
        'secondary_link' => ['id' => '/service', 'en' => '/service'],
    ]);

    $response->assertRedirect(route('settings.content.edit'));
});
