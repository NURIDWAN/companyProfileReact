<?php

use App\Models\BlogPost;
use App\Models\CompanySetting;
use App\Models\JobPosition;
use App\Models\Product;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    CompanySetting::create([
        'key' => 'landing.hero',
        'group' => 'landing',
        'value' => ['heading' => 'Hero heading'],
    ]);

    CompanySetting::create([
        'key' => 'landing.about',
        'group' => 'landing',
        'value' => ['title' => 'Tentang', 'description' => 'Deskripsi'],
    ]);

    CompanySetting::create([
        'key' => 'landing.final_cta',
        'group' => 'landing',
        'value' => ['heading' => 'CTA heading'],
    ]);
});

it('renders home page with dynamic data', function () {
    Service::factory()->create(['name' => 'Konsultasi Digital']);
    TeamMember::factory()->create(['name' => 'Anisa']);
    Testimonial::factory()->create(['author_name' => 'Klien Puas', 'quote' => 'Hebat!']);
    BlogPost::factory()->create([
        'title' => 'Artikel Pertama',
        'slug' => 'artikel-pertama',
        'is_published' => true,
        'published_at' => Carbon::now()->subDay(),
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('landingPage/Home')
            ->has('services', fn (Assert $services) => $services
                ->where('0.title', 'Konsultasi Digital')
            )
            ->where('hero.heading', 'Hero heading')
            ->where('about.title', 'Tentang')
        );
});

it('renders product listing with categories', function () {
    Product::factory()->create(['category' => 'Software']);

    $this->get(route('product'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('landingPage/Product')
            ->has('products', 1)
            ->has('categories', fn (Assert $categories) => $categories
                ->where('0', 'Software')
            )
        );
});

it('renders career page with active positions', function () {
    JobPosition::factory()->create([
        'title' => 'Backend Engineer',
        'is_active' => true,
        'posted_at' => Carbon::now(),
    ]);

    $this->get(route('career'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('landingPage/Career')
            ->has('positions', 1)
        );
});

it('renders service page with configured content settings', function () {
    Service::factory()->create(['name' => 'Integrasi Sistem']);

    CompanySetting::create([
        'key' => 'service.hero',
        'group' => 'service',
        'value' => ['heading' => 'Solusi Test', 'highlight' => 'Unggul'],
    ]);

    CompanySetting::create([
        'key' => 'service.offerings',
        'group' => 'service',
        'value' => [
            'badge' => 'Uji Coba',
            'items' => [
                [
                    'title' => 'Custom Highlight',
                    'description' => 'Konten dari pengaturan.',
                    'icon' => 'Layers',
                ],
            ],
        ],
    ]);

    $this->get(route('service'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('landingPage/Service')
            ->where('hero.heading', 'Solusi Test')
            ->where('hero.highlight', 'Unggul')
            ->where('offeringsSection.badge', 'Uji Coba')
            ->where('offeringsSection.items.0.title', 'Custom Highlight')
        );
});
