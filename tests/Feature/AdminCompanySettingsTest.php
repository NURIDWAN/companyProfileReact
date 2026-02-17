<?php

use App\Models\CompanySetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders structured settings data', function () {
    CompanySetting::create([
        'key' => 'company.name',
        'value' => 'Harmony Strategic Group',
        'group' => 'company',
    ]);

    CompanySetting::create([
        'key' => 'company.contacts',
        'value' => [
            'email' => 'halo@example.com',
        ],
        'group' => 'contact',
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('admin.settings.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/Index')
            ->where('company.name', 'Harmony Strategic Group')
            ->where('contacts.email', 'halo@example.com')
        );
});

it('updates company profile settings', function () {
    CompanySetting::create([
        'key' => 'company.name',
        'value' => 'Old Name',
        'group' => 'company',
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.company.update'), [
            'name' => 'New Name',
            'tagline' => 'Tagline Baru',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $stored = CompanySetting::where('key', 'company.name')->value('value');
    $normalized = is_array($stored)
        ? collect($stored)->first(fn ($value) => is_string($value) && $value !== '')
        : $stored;

    if ($normalized === null) {
        $raw = CompanySetting::where('key', 'company.name')->firstOrFail()->getRawOriginal('value');
        $decoded = json_decode($raw, true);
        $normalized = $decoded ?? trim($raw, '"');
    }

    expect($normalized)->toBe('New Name');

    $footer = CompanySetting::where('key', 'footer.content')->value('value');

    expect(data_get($footer, 'company.name'))->toBe('New Name');
    expect(data_get($footer, 'company.description'))->toBe('Tagline Baru');
});

it('updates address settings', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.address.update'), [
            'line1' => 'Jl. Contoh No. 1',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'postal_code' => '12345',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $setting = CompanySetting::where('key', 'company.address')->firstOrFail();

    expect($setting->value)->toMatchArray([
        'line1' => 'Jl. Contoh No. 1',
        'city' => 'Jakarta',
        'province' => 'DKI Jakarta',
        'postal_code' => '12345',
    ]);
});

it('updates socials settings', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.socials.update'), [
            'linkedin' => 'https://linkedin.com/company/example',
            'instagram' => 'https://instagram.com/example',
            'youtube' => '',
            'website' => 'https://example.com',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $setting = CompanySetting::where('key', 'company.socials')->firstOrFail();

    expect($setting->value)->toMatchArray([
        'linkedin' => 'https://linkedin.com/company/example',
        'instagram' => 'https://instagram.com/example',
        'website' => 'https://example.com',
    ]);
});

it('updates footer contacts through company contacts form', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.contacts.update'), [
            'phone' => '+62 811 1234 567',
            'email' => 'cs@example.com',
            'whatsapp' => '',
            'map_label' => 'Lokasi Kantor',
            'map_embed_url' => 'https://maps.example.com/embed',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $footer = CompanySetting::where('key', 'footer.content')->value('value');

    expect(data_get($footer, 'contacts.phone'))->toBe('+62 811 1234 567');
    expect(data_get($footer, 'contacts.email'))->toBe('cs@example.com');

    $contactsSetting = CompanySetting::where('key', 'company.contacts')->value('value');
    expect(data_get($contactsSetting, 'map_label'))->toBe('Lokasi Kantor');
    expect(data_get($contactsSetting, 'map_embed_url'))->toBe('https://maps.example.com/embed');
});

it('updates footer CTA content', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.footer.cta.update'), [
            'label' => 'Hubungi Kami',
            'href' => '/contact',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $setting = CompanySetting::where('key', 'footer.content')->firstOrFail();

    expect(data_get($setting->value, 'cta.label'))->toBe('Hubungi Kami');
    expect(data_get($setting->value, 'cta.href'))->toBe('/contact');
});

it('downloads company settings backup as sql', function () {
    CompanySetting::create([
        'key' => 'company.name',
        'value' => 'Contoh Perusahaan',
        'group' => 'company',
    ]);

    $response = $this->actingAs(createUserWithManageUsersPermission())
        ->get(route('settings.backup.download'));

    $response->assertOk();
    expect($response->headers->get('content-type'))->toContain('application/sql');

    $content = $response->streamedContent();

    expect($content)->toContain('TRUNCATE TABLE `company_settings`');
    expect($content)->toContain('INSERT INTO `company_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`)');
    expect($content)->toContain('Contoh Perusahaan');
});

it('updates AI settings', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.settings.ai.update'), [
            'api_key' => 'sk-or-v1-test-key-123',
            'model' => 'google/gemini-2.0-flash-001',
            'endpoint' => 'https://openrouter.ai/api/v1',
        ])
        ->assertRedirect();

    $setting = CompanySetting::where('key', 'ai.settings')->firstOrFail();

    expect($setting->value)->toMatchArray([
        'api_key' => 'sk-or-v1-test-key-123',
        'model' => 'google/gemini-2.0-flash-001',
        'endpoint' => 'https://openrouter.ai/api/v1',
    ]);
});

it('loads AI settings in settings page', function () {
    CompanySetting::create([
        'key' => 'ai.settings',
        'value' => [
            'api_key' => 'test-api-key',
            'model' => 'meta-llama/llama-3.2-3b-instruct:free',
            'endpoint' => 'https://openrouter.ai/api/v1',
        ],
        'group' => 'integration',
    ]);

    $response = $this->actingAs(User::factory()->create())
        ->get(route('admin.settings.index'));

    $response->assertOk();

    $ai = $response->original->getData()['page']['props']['ai'];
    expect($ai['api_key'])->toBe('test-api-key');
    expect($ai['model'])->toBe('meta-llama/llama-3.2-3b-instruct:free');
});
