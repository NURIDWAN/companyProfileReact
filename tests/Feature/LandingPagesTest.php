<?php

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\CompanySetting;
use App\Models\JobPosition;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Product;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create home page with sections
    $homePage = Page::create([
        'title' => 'Home',
        'slug' => 'home',
        'status' => 'published',
    ]);

    PageSection::create([
        'page_id' => $homePage->id,
        'title' => 'Hero',
        'slug' => 'hero',
        'content' => json_encode([
            '__type' => 'hero_home',
            'heading' => 'Hero heading',
            'subheading' => 'Subheading',
            'primary_label' => 'Contact',
            'primary_link' => '/contact',
        ]),
        'display_order' => 1,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $homePage->id,
        'title' => 'About',
        'slug' => 'about',
        'content' => json_encode([
            '__type' => 'about_intro',
            'heading' => 'About Us',
            'description' => 'Description',
            'highlights' => ['Value 1'],
        ]),
        'display_order' => 2,
        'is_active' => true,
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
            fn (Assert $page) => $page
                ->component('landingPage/Home')
                ->has(
                    'services',
                    fn (Assert $services) => $services
                        ->where('0.title', 'Konsultasi Digital')
                )
                ->where('hero.heading', 'Hero heading')
                ->where('about.title', 'About Us')
        );
});

it('renders product listing with categories', function () {
    Product::factory()->create(['category' => 'Software']);

    $this->get(route('product'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('landingPage/Product')
                ->has('products', 1)
                ->has(
                    'categories',
                    fn (Assert $categories) => $categories
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
            fn (Assert $page) => $page
                ->component('landingPage/Career')
                ->has('positions', 1)
        );
});

it('renders service page with configured content settings', function () {
    Service::factory()->create(['name' => 'Integrasi Sistem']);

    // Create service page with sections
    $servicePage = Page::create([
        'title' => 'Service',
        'slug' => 'service',
        'status' => 'published',
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Hero',
        'slug' => 'hero',
        'content' => json_encode([
            '__type' => 'service_hero',
            'heading' => 'Test Solution',
            'highlight' => 'Excellent',
        ]),
        'display_order' => 1,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Offerings',
        'slug' => 'offerings',
        'content' => json_encode([
            '__type' => 'service_offerings',
            'badge' => 'Pilot',
            'heading' => 'Top Offerings',
            'description' => 'Offerings description.',
            'items' => [
                [
                    'title' => 'Custom Highlight',
                    'description' => 'Content from settings.',
                    'icon' => 'Layers',
                ],
            ],
        ]),
        'display_order' => 2,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Summary',
        'slug' => 'summary',
        'content' => json_encode([
            '__type' => 'service_summary',
            'badge' => 'Summary',
            'heading' => 'Summary Heading',
            'description' => 'Service overview.',
        ]),
        'display_order' => 3,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Tech Stack',
        'slug' => 'tech-stack',
        'content' => json_encode([
            '__type' => 'service_tech_stack',
            'badge' => 'Tech',
            'heading' => 'Key Technologies',
            'categories' => [
                [
                    'name' => 'Laravel',
                    'items' => ['PHP', 'Eloquent'],
                ],
            ],
        ]),
        'display_order' => 4,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Process',
        'slug' => 'process',
        'content' => json_encode([
            '__type' => 'service_process',
            'badge' => 'Process',
            'items' => [
                [
                    'step' => '01',
                    'title' => 'Discovery',
                    'description' => 'Needs analysis.',
                    'icon' => 'Search',
                ],
            ],
        ]),
        'display_order' => 5,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'Advantages',
        'slug' => 'advantages',
        'content' => json_encode([
            '__type' => 'service_advantages',
            'badge' => 'Advantages',
            'items' => [
                [
                    'title' => 'Experienced Team',
                    'description' => 'Years of experience.',
                    'icon' => 'Users',
                ],
            ],
        ]),
        'display_order' => 6,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $servicePage->id,
        'title' => 'FAQs',
        'slug' => 'faqs',
        'content' => json_encode([
            '__type' => 'service_faqs',
            'badge' => 'FAQ',
            'items' => [
                [
                    'question' => 'What is the service?',
                    'answer' => 'End-to-end consulting.',
                ],
            ],
        ]),
        'display_order' => 7,
        'is_active' => true,
    ]);

    $this->get(route('service'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('landingPage/Service')
                ->where('hero.heading', 'Test Solution')
                ->where('hero.highlight', 'Excellent')
                ->where('offeringsSection.badge', 'Pilot')
                ->where('offeringsSection.items.0.title', 'Custom Highlight')
                ->where('summarySection.badge', 'Summary')
                ->where('techStackSection.items.0.name', 'Laravel')
                ->where('processSection.items.0.title', 'Discovery')
                ->where('advantagesSection.items.0.title', 'Experienced Team')
                ->where('faqSection.items.0.question', 'What is the service?')
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
            fn (Assert $page) => $page
                ->component('landingPage/Contact')
                ->where('branding.name', 'Harmony Strategic Group')
                ->where('companyContacts.phone', '+62 811 1234 567')
        );
});

it('renders about page with dynamic sections', function () {
    // Create about page with sections
    $aboutPage = Page::create([
        'title' => 'About',
        'slug' => 'about',
        'status' => 'published',
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'Overview',
        'slug' => 'overview',
        'content' => json_encode([
            '__type' => 'about_overview',
            'badge' => 'Tentang Kami',
            'heading' => 'Tentang Contoh Perusahaan',
            'paragraphs' => ['Paragraf 1'],
            'stats' => [
                ['value' => '10+', 'label' => 'Tahun Pengalaman'],
            ],
        ]),
        'display_order' => 1,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'Vision',
        'slug' => 'vision',
        'content' => json_encode([
            '__type' => 'about_vision',
            'vision_text' => 'Visi uji coba.',
            'mission_text' => 'Misi uji coba.',
        ]),
        'display_order' => 2,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'Values',
        'slug' => 'values',
        'content' => json_encode([
            '__type' => 'about_values',
            'items' => [
                ['icon' => 'zap', 'title' => 'Inovasi', 'description' => 'Selalu inovatif.'],
            ],
        ]),
        'display_order' => 3,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'Statistics',
        'slug' => 'statistics',
        'content' => json_encode([
            '__type' => 'about_statistics',
            'primary' => [
                ['value' => '100+', 'label' => 'Proyek'],
            ],
        ]),
        'display_order' => 4,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'Team',
        'slug' => 'team',
        'content' => json_encode([
            '__type' => 'about_team',
            'members' => [
                ['name' => 'Test', 'role' => 'CEO', 'image' => '', 'description' => 'Memimpin perusahaan.'],
            ],
        ]),
        'display_order' => 5,
        'is_active' => true,
    ]);

    PageSection::create([
        'page_id' => $aboutPage->id,
        'title' => 'CTA',
        'slug' => 'cta',
        'content' => json_encode([
            '__type' => 'about_cta',
            'primary_label' => 'Hubungi',
            'primary_link' => '/contact',
        ]),
        'display_order' => 6,
        'is_active' => true,
    ]);

    $this->get(route('about'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
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
    // Clear all pages to isolate this test from beforeEach
    Page::query()->forceDelete();

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
            fn (Assert $page) => $page
                ->has('navigation.primary', 2)
                ->where('navigation.primary.0.key', 'home')
                ->where('navigation.primary.1.key', 'contact')
        );
});

it('returns 404 when a landing page is disabled', function () {
    // Create menu items to control page visibility
    MenuItem::create([
        'title' => 'Home',
        'position' => 'main',
        'type' => 'link',
        'target' => '/',
        'is_active' => false,  // Home is disabled
        'display_order' => 1,
    ]);

    MenuItem::create([
        'title' => 'Contact',
        'position' => 'main',
        'type' => 'link',
        'target' => '/contact',
        'is_active' => true,  // Contact is enabled
        'display_order' => 2,
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
            fn (Assert $page) => $page
                ->component('landingPage/Blog')
                ->has('articles', 1)
                ->where('articles.0.title', 'Artikel Berita')
                ->where('currentCategory.name', 'Berita')
                ->where('currentCategory.slug', 'berita')
                ->has('categories')
        );
});
