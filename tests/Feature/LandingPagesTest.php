<?php

use App\Models\BlogPost;
use App\Models\Category;
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
        'value' => [
            'heading' => ['id' => 'Hero heading', 'en' => 'Hero heading'],
            'subheading' => ['id' => 'Subjudul', 'en' => 'Subheading'],
            'primary_label' => ['id' => 'Hubungi', 'en' => 'Contact'],
            'primary_link' => ['id' => '/kontak', 'en' => '/contact'],
        ],
    ]);

    CompanySetting::create([
        'key' => 'landing.about',
        'group' => 'landing',
        'value' => [
            'title' => ['id' => 'Tentang', 'en' => 'About'],
            'description' => ['id' => 'Deskripsi', 'en' => 'Description'],
            'highlights' => ['id' => ['Nilai 1'], 'en' => ['Value 1']],
        ],
    ]);

    CompanySetting::create([
        'key' => 'landing.final_cta',
        'group' => 'landing',
        'value' => [
            'heading' => ['id' => 'CTA heading', 'en' => 'CTA heading'],
            'description' => ['id' => 'Ayo', 'en' => 'Let\'s go'],
            'button_label' => ['id' => 'Hubungi', 'en' => 'Contact'],
            'button_link' => ['id' => '/kontak', 'en' => '/contact'],
        ],
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
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Home')
                ->has(
                    'services',
                    fn(Assert $services) => $services
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
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Product')
                ->has('products', 1)
                ->has(
                    'categories',
                    fn(Assert $categories) => $categories
                        ->where('0', 'Software')
                )
                ->has('productCta')
                ->has('productStats')
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
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Career')
                ->has('positions', 1)
        );
});

it('renders service page with configured content settings', function () {
    Service::factory()->create(['name' => 'Integrasi Sistem']);

    CompanySetting::create([
        'key' => 'service.hero',
        'group' => 'service',
        'value' => [
            'heading' => ['id' => 'Solusi Test', 'en' => 'Test Solution'],
            'highlight' => ['id' => 'Unggul', 'en' => 'Excellent'],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.offerings',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'Uji Coba', 'en' => 'Pilot'],
            'heading' => ['id' => 'Penawaran Unggulan', 'en' => 'Top Offerings'],
            'description' => ['id' => 'Deskripsi penawaran.', 'en' => 'Offerings description.'],
            'items' => [
                [
                    'title' => ['id' => 'Custom Highlight', 'en' => 'Custom Highlight'],
                    'description' => ['id' => 'Konten dari pengaturan.', 'en' => 'Content from settings.'],
                    'icon' => 'Layers',
                ],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.summary',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'Ringkasan', 'en' => 'Summary'],
            'heading' => ['id' => 'Judul Ringkas', 'en' => 'Summary Heading'],
            'description' => ['id' => 'Ikhtisar layanan.', 'en' => 'Service overview.'],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.tech_stack',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'Teknologi', 'en' => 'Tech'],
            'heading' => ['id' => 'Teknologi Utama', 'en' => 'Key Technologies'],
            'items' => [
                [
                    'name' => ['id' => 'Laravel', 'en' => 'Laravel'],
                    'logo' => 'https://example.com/logo.svg',
                ],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.process',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'Proses', 'en' => 'Process'],
            'items' => [
                [
                    'step' => ['id' => '01', 'en' => '01'],
                    'title' => ['id' => 'Analisis', 'en' => 'Discovery'],
                    'description' => ['id' => 'Analisis kebutuhan.', 'en' => 'Needs analysis.'],
                    'icon' => 'Search',
                ],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.advantages',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'Keunggulan', 'en' => 'Advantages'],
            'items' => [
                [
                    'title' => ['id' => 'Tim Berpengalaman', 'en' => 'Experienced Team'],
                    'description' => ['id' => 'Berpengalaman bertahun-tahun.', 'en' => 'Years of experience.'],
                    'icon' => 'Users',
                ],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'service.faqs',
        'group' => 'service',
        'value' => [
            'badge' => ['id' => 'FAQ', 'en' => 'FAQ'],
            'items' => [
                [
                    'question' => ['id' => 'Apa itu layanan?', 'en' => 'What is the service?'],
                    'answer' => ['id' => 'Layanan konsultasi end-to-end.', 'en' => 'End-to-end consulting.'],
                ],
            ],
        ],
    ]);

    $this->get(route('service'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Service')
                ->where('hero.heading', 'Solusi Test')
                ->where('hero.highlight', 'Unggul')
                ->where('offeringsSection.badge', 'Uji Coba')
                ->where('offeringsSection.items.0.title', 'Custom Highlight')
                ->where('summarySection.badge', 'Ringkasan')
                ->where('techStackSection.items.0.name', 'Laravel')
                ->where('processSection.items.0.title', 'Analisis')
                ->where('advantagesSection.items.0.title', 'Tim Berpengalaman')
                ->where('faqSection.items.0.question', 'Apa itu layanan?')
        );
});

it('renders contact page with company profile data', function () {
    CompanySetting::create([
        'key' => 'company.name',
        'group' => 'company',
        'value' => 'Harmony Strategic Group',
    ]);

    CompanySetting::create([
        'key' => 'company.contacts',
        'group' => 'contact',
        'value' => [
            'email' => 'hello@example.com',
            'phone' => '+62 811 1234 567',
        ],
    ]);

    CompanySetting::create([
        'key' => 'company.address',
        'group' => 'contact',
        'value' => [
            'line1' => 'Jl. Sudirman',
            'city' => 'Jakarta',
        ],
    ]);

    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Contact')
                ->where('branding.name', 'Harmony Strategic Group')
                ->where('companyContacts.phone', '+62 811 1234 567')
        );
});

it('renders about page with dynamic sections', function () {
    CompanySetting::create([
        'key' => 'about.overview',
        'group' => 'about',
        'value' => [
            'badge' => 'Tentang Kami',
            'title' => 'Tentang Contoh Perusahaan',
            'paragraphs' => ['Paragraf 1'],
            'stats' => [
                ['value' => '10+', 'label' => 'Tahun Pengalaman'],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'about.vision',
        'group' => 'about',
        'value' => [
            'vision_text' => 'Visi uji coba.',
            'mission_text' => 'Misi uji coba.',
        ],
    ]);

    CompanySetting::create([
        'key' => 'about.values',
        'group' => 'about',
        'value' => [
            ['icon' => 'zap', 'title' => 'Inovasi', 'description' => 'Selalu inovatif.'],
        ],
    ]);

    CompanySetting::create([
        'key' => 'about.statistics',
        'group' => 'about',
        'value' => [
            'primary' => [
                ['value' => '100+', 'label' => 'Proyek'],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'about.team',
        'group' => 'about',
        'value' => [
            'members' => [
                ['name' => 'Test', 'role' => 'CEO', 'image' => '', 'description' => 'Memimpin perusahaan.'],
            ],
        ],
    ]);

    CompanySetting::create([
        'key' => 'about.cta',
        'group' => 'about',
        'value' => [
            'primary_label' => 'Hubungi',
            'primary_link' => '/contact',
        ],
    ]);

    $this->get(route('about'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/About')
                ->where('overview.paragraphs.0', 'Paragraf 1')
                ->where('vision.vision_text', 'Visi uji coba.')
                ->has('values', 1)
                ->where('statistics.primary.0.value', '100+')
                ->where('team.members.0.name', 'Test')
                ->where('cta.primary_label', 'Hubungi')
        );
});

it('only exposes activated navigation links', function () {
    CompanySetting::create([
        'key' => 'navigation.primary',
        'group' => 'navigation',
        'value' => [
            ['key' => 'home', 'order' => 1, 'active' => true],
            ['key' => 'about', 'order' => 2, 'active' => false],
            ['key' => 'contact', 'order' => 8, 'active' => true],
        ],
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->has('navigation.primary', 2)
                ->where('navigation.primary.0.key', 'home')
                ->where('navigation.primary.1.key', 'contact')
        );
});

it('returns 404 when a landing page is disabled', function () {
    CompanySetting::create([
        'key' => 'navigation.primary',
        'group' => 'navigation',
        'value' => [
            ['key' => 'home', 'order' => 1, 'active' => false],
            ['key' => 'contact', 'order' => 8, 'active' => true],
        ],
    ]);

    $this->get(route('home'))->assertNotFound();
    $this->get(route('contact'))->assertOk();
});

it('renders blog category page with filtered articles', function () {
    $category = Category::factory()->create(['name' => 'Berita', 'slug' => 'berita']);
    $otherCategory = Category::factory()->create(['name' => 'Tutorial', 'slug' => 'tutorial']);

    BlogPost::factory()->create([
        'title' => 'Artikel Berita',
        'slug' => 'artikel-berita',
        'category_id' => $category->id,
        'is_published' => true,
        'published_at' => Carbon::now()->subDay(),
    ]);

    BlogPost::factory()->create([
        'title' => 'Artikel Tutorial',
        'slug' => 'artikel-tutorial',
        'category_id' => $otherCategory->id,
        'is_published' => true,
        'published_at' => Carbon::now()->subDays(2),
    ]);

    $this->get(route('blog.category', $category))
        ->assertOk()
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('landingPage/Blog')
                ->has('articles', 1)
                ->where('articles.0.title', 'Artikel Berita')
                ->where('currentCategory.name', 'Berita')
                ->where('currentCategory.slug', 'berita')
                ->has('categories')
        );
});
