<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Landing\ContactMessageRequest;
use App\Models\BlogPost;
use App\Models\CompanySetting;
use App\Models\ContactMessage;
use App\Models\User;
use App\Notifications\ContactMessageReceived;
use App\Models\JobPosition;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    protected ?array $seoCache = null;
    protected string $defaultLanguage;

    public function __construct()
    {
        $this->defaultLanguage = config('app.locale');
    }

    private function pageSectionData(string $pageSlug, string $type): ?array
    {
        $page = Page::query()
            ->where('slug', $pageSlug)
            ->with([
                'sections' => function ($q) {
                    $q->where('is_active', true)->orderBy('display_order');
                }
            ])
            ->first();

        if (!$page) {
            return null;
        }

        foreach ($page->sections as $section) {
            if (!$section->content) {
                continue;
            }
            try {
                $parsed = json_decode($section->content, true);
            } catch (\Throwable $e) {
                continue;
            }
            if (is_array($parsed) && ($parsed['__type'] ?? null) === $type) {
                return $parsed;
            }
        }

        return null;
    }

    public function home(): Response
    {
        $heroSetting = $this->pageSectionData('home', 'hero_home');
        $aboutSetting = $this->pageSectionData('home', 'about_intro');
        $serviceOverview = $this->pageSectionData('home', 'service_overview');
        $ctaSection = $this->pageSectionData('home', 'cta_home');

        // New sections from PageSection
        $whyUsSection = $this->pageSectionData('home', 'why_us');
        $testimonialsSection = $this->pageSectionData('home', 'testimonials_home');
        $metricsSection = $this->pageSectionData('home', 'metrics_home');
        $blogPreviewSection = $this->pageSectionData('home', 'blog_preview');

        $sections = $this->landingSections();

        $services = $sections['services']
            ? $this->servicePayload(Service::query()->active()->orderBy('display_order')->limit(6)->get())
            : [];
        $articles = $sections['articles']
            ? $this->articlePayload(
                BlogPost::query()
                    ->published()
                    ->orderByRaw('COALESCE(published_at, created_at) DESC')
                    ->orderByDesc('id')
                    ->limit(3)
                    ->with('author:id,name')
                    ->get()
            )
            : [];

        // Use testimonials from database (CRUD)
        $testimonials = $sections['testimonials']
            ? $this->testimonialPayload(Testimonial::query()->where('is_active', true)->latest()->limit(9)->get())
            : [];

        $teamMembers = $sections['team']
            ? $this->teamPayload(TeamMember::query()->where('is_active', true)->orderBy('display_order')->limit(4)->get())
            : [];

        return Inertia::render('landingPage/Home', [
            'services' => $services,
            'articles' => $articles,
            'testimonials' => $testimonials,
            'teamMembers' => $teamMembers,
            'hero' => $sections['hero'] && $heroSetting ? $this->transformHero($heroSetting) : null,
            'about' => $sections['about'] && $aboutSetting ? $this->transformAbout($aboutSetting) : null,
            'servicesContent' => $serviceOverview ? [
                'heading' => $serviceOverview['heading'] ?? null,
                'description' => $serviceOverview['description'] ?? null,
                'highlights' => $serviceOverview['highlights'] ?? [],
            ] : null,
            'whyUs' => $whyUsSection ? [
                'heading' => $whyUsSection['heading'] ?? null,
                'description' => $whyUsSection['description'] ?? null,
                'items' => $whyUsSection['items'] ?? [],
            ] : null,
            'testimonialsContent' => $testimonialsSection ? [
                'heading' => $testimonialsSection['heading'] ?? 'Kata Mereka',
                'description' => $testimonialsSection['description'] ?? null,
            ] : null,
            'metrics' => $metricsSection ? ($metricsSection['items'] ?? []) : [],
            'blogPreview' => $blogPreviewSection ? [
                'heading' => $blogPreviewSection['heading'] ?? 'Artikel Terbaru',
                'description' => $blogPreviewSection['description'] ?? null,
                'link_text' => $blogPreviewSection['link_text'] ?? 'Lihat Semua',
                'link_url' => $blogPreviewSection['link_url'] ?? '/blog',
            ] : null,
            'finalCta' => $sections['final_cta'] && $ctaSection ? $this->transformFinalCta($ctaSection) : null,
            'sections' => $sections,
            'seo' => $this->seo('home'),
        ]);
    }

    public function services(): Response
    {
        $heroSection = $this->pageSectionData('service', 'service_hero');
        $summarySection = $this->pageSectionData('service', 'service_summary');
        $offeringsSection = $this->pageSectionData('service', 'service_offerings');
        $techStackSection = $this->pageSectionData('service', 'service_tech_stack');
        $processSection = $this->pageSectionData('service', 'service_process');
        $advantagesSection = $this->pageSectionData('service', 'service_advantages');
        $faqSection = $this->pageSectionData('service', 'service_faqs');

        return Inertia::render('landingPage/Service', [
            'services' => $this->servicePayload(Service::query()->active()->orderBy('display_order')->get()),
            'hero' => $heroSection ? $this->transformServiceHero($heroSection) : null,
            'summarySection' => $summarySection ? $this->transformSection($summarySection) : null,
            'offeringsSection' => $offeringsSection ? $this->transformOfferingsSection($offeringsSection) : null,
            'techStackSection' => $techStackSection ? $this->transformTechStackSection($techStackSection) : null,
            'processSection' => $processSection ? $this->transformProcessSection($processSection) : null,
            'advantagesSection' => $advantagesSection ? $this->transformAdvantagesSection($advantagesSection) : null,
            'faqSection' => $faqSection ? $this->transformFaqSection($faqSection) : null,
            'seo' => $this->seo('service'),
        ]);
    }

    public function about(): Response
    {
        $overview = $this->transformAboutOverview($this->pageSectionData('about', 'about_overview') ?? []);
        $vision = $this->transformAboutVision($this->pageSectionData('about', 'about_vision') ?? []);
        $values = $this->transformAboutValues($this->pageSectionData('about', 'about_values') ?? []);
        $statistics = $this->transformAboutStatistics($this->pageSectionData('about', 'about_statistics') ?? []);
        $team = $this->transformAboutTeam($this->pageSectionData('about', 'about_team') ?? []);
        $cta = $this->transformAboutCta($this->pageSectionData('about', 'about_cta') ?? []);

        $teamMembers = $this->teamPayload(
            TeamMember::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->get()
        );

        return Inertia::render('landingPage/About', [
            'overview' => $overview,
            'vision' => $vision,
            'values' => $values,
            'statistics' => $statistics,
            'team' => $team,
            'teamMembers' => $teamMembers, // Now using DB data
            'cta' => $cta,
            'seo' => $this->seo('about'),
        ]);
    }

    public function products(): Response
    {
        $productQuery = Product::query()->active();
        $products = (clone $productQuery)->latest()->get();
        $categories = (clone $productQuery)->whereNotNull('category')->distinct('category')->pluck('category');

        $ctaSetting = $this->pageSectionData('product', 'product_cta');
        $statsSetting = $this->pageSectionData('product', 'product_stats');
        $productHeroSetting = $this->pageSectionData('product', 'product_hero');

        return Inertia::render('landingPage/Product', [
            'products' => $this->productPayload($products),
            'categories' => $categories,
            'productCta' => $ctaSetting ? $this->transformProductCta($ctaSetting) : null,
            'productStats' => $statsSetting ? $this->transformProductStats($statsSetting) : null,
            'productHero' => $productHeroSetting ? $this->transformSection($productHeroSetting) : null,
            'seo' => $this->seo('product'),
        ]);
    }

    public function projects(): Response
    {
        $projectHeroSetting = $this->pageSectionData('project', 'project_hero');

        return Inertia::render('landingPage/Project', [
            'projects' => $this->projectPayload(Project::query()->orderByDesc('started_at')->orderByDesc('id')->get()),
            'projectHero' => $projectHeroSetting ? $this->transformSection($projectHeroSetting) : null,
            'seo' => $this->seo('project'),
        ]);
    }

    public function career(): Response
    {
        $careerHeroSetting = $this->pageSectionData('career', 'career_hero');

        return Inertia::render('landingPage/Career', [
            'positions' => $this->careerPayload(JobPosition::query()->where('is_active', true)->latest('posted_at')->get()),
            'careerHero' => $careerHeroSetting ? $this->transformSection($careerHeroSetting) : null,
            'seo' => $this->seo('career'),
        ]);
    }

    public function blog(): Response
    {
        $blogHeroSetting = $this->pageSectionData('blog', 'blog_hero') ?? [];

        // Ensure default values for blog hero if missing
        $blogHeroSetting = array_merge([
            'badge' => [
                'id' => 'Insight',
            ],
            'heading' => [
                'id' => 'Insight Bisnis & Industri',
            ],
            'description' => [
                'id' => 'Kumpulan studi kasus, sudut pandang, dan tips praktis dari tim kami.',
            ],
        ], $blogHeroSetting);

        $categories = \App\Models\Category::query()
            ->orderBy('name')
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]);

        return Inertia::render('landingPage/Blog', [
            'articles' => $this->articlePayload(
                BlogPost::query()
                    ->published()
                    ->orderByRaw('COALESCE(published_at, created_at) DESC')
                    ->orderByDesc('id')
                    ->limit(36)
                    ->with(['author:id,name', 'category:id,name,slug'])
                    ->get()
            ),
            'categories' => $categories,
            'currentCategory' => null,
            'blogHero' => $this->transformSection($blogHeroSetting),
            'seo' => $this->seo('blog'),
        ]);
    }

    public function blogByCategory(\App\Models\Category $category): Response
    {
        $blogHeroSetting = $this->pageSectionData('blog', 'blog_hero') ?? [];

        $blogHeroSetting = array_merge([
            'badge' => [
                'id' => $category->name,
            ],
            'heading' => [
                'id' => 'Artikel ' . $category->name,
            ],
            'description' => [
                'id' => $category->description ?? 'Kumpulan artikel dalam kategori ' . $category->name . '.',
            ],
        ], $blogHeroSetting);

        $categories = \App\Models\Category::query()
            ->orderBy('name')
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]);

        return Inertia::render('landingPage/Blog', [
            'articles' => $this->articlePayload(
                BlogPost::query()
                    ->published()
                    ->where('category_id', $category->id)
                    ->orderByRaw('COALESCE(published_at, created_at) DESC')
                    ->orderByDesc('id')
                    ->limit(36)
                    ->with(['author:id,name', 'category:id,name,slug'])
                    ->get()
            ),
            'categories' => $categories,
            'currentCategory' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ],
            'blogHero' => $this->transformSection($blogHeroSetting),
            'seo' => $this->seo('blog', [
                'title' => 'Artikel ' . $category->name,
                'description' => $category->description ?? 'Kumpulan artikel dalam kategori ' . $category->name,
            ]),
        ]);
    }


    public function contact(): Response
    {
        $heroSection = $this->pageSectionData('contact', 'contact_hero');
        $infoSection = $this->pageSectionData('contact', 'contact_info');

        return Inertia::render('landingPage/Contact', [
            'contactHero' => $heroSection,
            'contactInfo' => $infoSection,
            'seo' => $this->seo('contact'),
        ]);
    }

    public function submitContact(ContactMessageRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $message = ContactMessage::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'],
            'status' => 'new',
        ]);

        $recipients = User::query()
            ->whereIn('email', ['admin@example.id'])
            ->get();

        if ($recipients->isEmpty()) {
            $recipients = User::query()->limit(3)->get();
        }

        Notification::send($recipients, new ContactMessageReceived($message));

        return back()->with('success', 'Pesan berhasil dikirim. Tim kami akan menindaklanjuti secepatnya.');
    }

    public function productShow(Product $product): Response
    {
        $productData = $this->transformProduct($product);
        $relatedProducts = $this->productPayload(
            Product::query()
                ->active()
                ->where('id', '<>', $product->id)
                ->inRandomOrder()
                ->limit(3)
                ->get()
        );

        return Inertia::render('landingPage/ProductDetail', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts,
            'seo' => $this->seo('product_detail', [
                'title' => $product->meta_title ?? $product->name,
                'description' => $product->meta_description
                    ?? $product->excerpt
                    ?? Str::limit(strip_tags($product->description ?? ''), 150),
                'image' => $productData['cover_image'] ?? $productData['thumbnail'] ?? null,
                'og_title' => $product->og_title ?? $product->meta_title ?? $product->name,
            ]),
        ]);
    }

    public function projectShow(Project $project): Response
    {
        $projectData = $this->transformProject($project);
        $recentProjects = $this->projectPayload(
            Project::query()
                ->where('id', '<>', $project->id)
                ->orderByDesc('started_at')
                ->limit(4)
                ->get()
        );

        return Inertia::render('landingPage/ProjectDetail', [
            'project' => $projectData,
            'recentProjects' => $recentProjects,
            'seo' => $this->seo('project_detail', [
                'title' => $project->name,
                'description' => $project->summary ?? Str::limit(strip_tags($project->description ?? ''), 150),
                'image' => $projectData['cover_image'] ?? null,
            ]),
        ]);
    }

    public function careerShow(JobPosition $jobPosition): Response
    {
        $position = $this->transformJob($jobPosition);
        $relatedPositions = $this->careerPayload(
            JobPosition::query()
                ->active()
                ->where('id', '<>', $jobPosition->id)
                ->latest('posted_at')
                ->limit(4)
                ->get()
        );

        return Inertia::render('landingPage/CareerDetail', [
            'position' => $position,
            'relatedPositions' => $relatedPositions,
            'seo' => $this->seo('career_detail', [
                'title' => $jobPosition->title,
                'description' => Str::limit(strip_tags($jobPosition->description ?? ''), 150),
            ]),
        ]);
    }

    public function blogShow(BlogPost $blogPost): Response
    {
        $blogPost->loadMissing('author:id,name');
        $article = $this->transformArticle($blogPost, true);
        $relatedArticles = $this->articlePayload(
            BlogPost::query()
                ->published()
                ->where('id', '<>', $blogPost->id)
                ->orderByRaw('COALESCE(published_at, created_at) DESC')
                ->orderByDesc('id')
                ->limit(4)
                ->with('author:id,name')
                ->get()
        );

        return Inertia::render('landingPage/BlogDetail', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'seo' => $this->seo('blog_detail', [
                'title' => $blogPost->meta_title ?? $blogPost->title,
                'description' => $blogPost->meta_description
                    ?? $blogPost->excerpt
                    ?? Str::limit(strip_tags($blogPost->body ?? ''), 150),
                'og_title' => $blogPost->og_title ?? $blogPost->meta_title ?? $blogPost->title,
                'image' => $article['cover_image'] ?? null,
            ]),
        ]);
    }

    private function servicePayload(Collection $services): array
    {
        return $services->map(fn(Service $service) => [
            'id' => $service->id,
            'title' => $this->translateIfNeeded($service->name),
            'slug' => $service->slug,
            'icon' => $service->icon,
            'excerpt' => $this->translateIfNeeded($service->excerpt),
            'description' => $this->translateIfNeeded($service->description),
        ])->all();
    }

    private function articlePayload(Collection $posts): array
    {
        return $posts->map(fn(BlogPost $post) => $this->transformArticle($post))->all();
    }

    private function testimonialPayload(Collection $testimonials): array
    {
        return $testimonials->map(fn(Testimonial $testimonial) => [
            'id' => $testimonial->id,
            'author_name' => $testimonial->author_name,
            'author_role' => $this->translateIfNeeded($testimonial->author_role),
            'company' => $this->translateIfNeeded($testimonial->company),
            'avatar' => $testimonial->avatar_url ?? $this->imageUrl($testimonial->avatar),
            'quote' => $this->translateIfNeeded($testimonial->quote),
            'rating' => $testimonial->rating,
        ])->all();
    }

    private function teamPayload(Collection $members): array
    {
        return $members->map(fn(TeamMember $member) => [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $this->translateIfNeeded($member->role),
            'photo' => $member->photo_url ?? $this->imageUrl($member->photo),
            'linkedin' => $member->linkedin,
            'bio' => $this->translateIfNeeded($member->bio),
        ])->all();
    }

    private function careerPayload(Collection $positions): array
    {
        return $positions->map(fn(JobPosition $position) => $this->transformJob($position))->all();
    }

    private function productPayload(Collection $products): array
    {
        return $products->map(fn(Product $product) => $this->transformProduct($product))->all();
    }

    private function projectPayload(Collection $projects): array
    {
        return $projects->map(fn(Project $project) => $this->transformProject($project))->all();
    }

    private function landingSections(): array
    {
        // Return default enabled sections
        return [
            'hero' => true,
            'about' => true,
            'services' => true,
            'testimonials' => true,
            'team' => true,
            'articles' => true,
            'final_cta' => true,
            'metrics' => true,
        ];
    }

    private function setting(string $key, $default = [])
    {
        return CompanySetting::query()->where('key', $key)->value('value') ?? $default;
    }

    private function settingsPayload(): array
    {
        return CompanySetting::query()->pluck('value', 'key')->toArray();
    }

    private function transformHero(array $hero): array
    {
        return [
            'heading' => $this->localizedText($hero['heading'] ?? null),
            'subheading' => $this->localizedText($hero['subheading'] ?? $hero['description'] ?? null),
            'primary_label' => $this->localizedText($hero['primary_label'] ?? null),
            'primary_link' => $this->localizedText($hero['primary_link'] ?? null),
            'secondary_label' => $this->localizedText($hero['secondary_label'] ?? null),
            'secondary_link' => $this->localizedText($hero['secondary_link'] ?? null),
            'image_url' => $this->imageUrl($hero['image'] ?? $hero['hero_image'] ?? null),
        ];
    }

    private function transformAbout(array $about): array
    {
        return [
            'title' => $this->localizedText($about['title'] ?? $about['heading'] ?? null),
            'description' => $this->localizedText($about['description'] ?? $about['subheading'] ?? null),
            'highlights' => $this->localizedList($about['highlights'] ?? []),
            'image_url' => $this->imageUrl($about['image'] ?? null),
        ];
    }

    private function transformMetrics(array $metrics): array
    {
        return collect($metrics)
            ->map(function ($metric) {
                return [
                    'value' => $this->localizedText($metric['value'] ?? null) ?? '',
                    'label' => $this->localizedText($metric['label'] ?? null) ?? '',
                ];
            })
            ->filter(fn($metric) => $metric['value'] !== '')
            ->values()
            ->all();
    }

    private function transformFinalCta(array $cta): array
    {
        return [
            'heading' => $this->localizedText($cta['heading'] ?? null),
            'description' => $this->localizedText($cta['description'] ?? null),
            'button_label' => $this->localizedText($cta['button_label'] ?? null),
            'button_link' => $this->localizedText($cta['button_link'] ?? null),
        ];
    }

    private function transformProductCta(array $cta): array
    {
        return [
            'badge' => $this->localizedText($cta['badge'] ?? null),
            'heading' => $this->localizedText($cta['heading'] ?? null),
            'description' => $this->localizedText($cta['description'] ?? null),
            'primary' => [
                'label' => $this->localizedText($cta['primary_label'] ?? null),
                'link' => $this->localizedText($cta['primary_link'] ?? null),
            ],
            'secondary' => [
                'label' => $this->localizedText($cta['secondary_label'] ?? null),
                'link' => $this->localizedText($cta['secondary_link'] ?? null),
            ],
            'contacts' => collect($cta['contacts'] ?? [])
                ->map(function ($contact) {
                    return [
                        'icon' => $contact['icon'] ?? 'phone',
                        'title' => $this->localizedText($contact['title'] ?? null),
                        'detail' => $this->localizedText($contact['detail'] ?? null),
                    ];
                })
                ->filter(fn($contact) => $contact['title'] || $contact['detail'])
                ->values()
                ->all(),
        ];
    }

    private function transformProductStats(array $stats): array
    {
        $labels = $stats['labels'] ?? [];

        return [
            'labels' => [
                'products' => $this->localizedText($labels['products'] ?? null),
                'clients' => $this->localizedText($labels['clients'] ?? null),
                'rating' => $this->localizedText($labels['rating'] ?? null),
                'awards' => $this->localizedText($labels['awards'] ?? null),
            ],
            'awards' => isset($stats['awards']) ? (int) $stats['awards'] : null,
        ];
    }

    private function transformAboutOverview(array $overview): array
    {
        $paragraphs = is_array($overview['paragraphs'] ?? null)
            ? array_values(array_filter(array_map('trim', $overview['paragraphs'])))
            : [];

        $stats = collect($overview['stats'] ?? [])
            ->map(fn($item) => [
                'value' => (string) ($item['value'] ?? ''),
                'label' => (string) ($item['label'] ?? ''),
            ])
            ->filter(fn($item) => $item['value'] !== '' && $item['label'] !== '')
            ->values()
            ->all();

        $highlights = collect($overview['highlights'] ?? [])
            ->map(fn($item) => [
                'icon' => (string) ($item['icon'] ?? 'zap'),
                'title' => (string) ($item['title'] ?? ''),
                'description' => (string) ($item['description'] ?? ''),
            ])
            ->filter(fn($item) => $item['title'] !== '')
            ->values()
            ->all();

        return [
            'badge' => $overview['badge'] ?? 'Tentang Perusahaan',
            'title' => $overview['title'] ?? 'Tentang Kami',
            'heading' => $overview['heading'] ?? '',
            'paragraphs' => $paragraphs,
            'stats' => $stats,
            'image' => $overview['image'] ?? null,
            'highlights' => $highlights,
        ];
    }

    private function transformAboutVision(array $vision): array
    {
        return [
            'badge' => $vision['badge'] ?? 'Visi & Misi',
            'title' => $vision['title'] ?? 'Panduan Langkah Kami',
            'vision_title' => $vision['vision_title'] ?? 'Visi Kami',
            'vision_text' => $vision['vision_text'] ?? '',
            'mission_title' => $vision['mission_title'] ?? 'Misi Kami',
            'mission_text' => $vision['mission_text'] ?? '',
        ];
    }

    private function transformAboutValues(array $values): array
    {
        return collect($values)
            ->map(function ($value) {
                return [
                    'icon' => $value['icon'] ?? 'zap',
                    'title' => $value['title'] ?? '',
                    'description' => $value['description'] ?? '',
                ];
            })
            ->filter(fn($item) => $item['title'] !== '')
            ->values()
            ->all();
    }

    private function transformAboutStatistics(array $statistics): array
    {
        $primary = collect($statistics['primary'] ?? [])
            ->map(fn($item) => [
                'value' => (string) ($item['value'] ?? ''),
                'label' => (string) ($item['label'] ?? ''),
            ])
            ->filter(fn($item) => $item['value'] !== '' && $item['label'] !== '')
            ->values()
            ->all();

        $secondary = collect($statistics['secondary'] ?? [])
            ->map(fn($item) => [
                'value' => (string) ($item['value'] ?? ''),
                'label' => (string) ($item['label'] ?? ''),
            ])
            ->filter(fn($item) => $item['value'] !== '' && $item['label'] !== '')
            ->values()
            ->all();

        return [
            'badge' => $statistics['badge'] ?? 'Pencapaian Kami',
            'title' => $statistics['title'] ?? 'Angka Berbicara',
            'description' => $statistics['description'] ?? '',
            'primary' => $primary,
            'secondary' => $secondary,
        ];
    }

    private function transformAboutTeam(array $team): array
    {
        $defaults = [
            'badge' => 'Tim Kami',
            'title' => 'Tim Manajemen',
            'description' => 'Dipimpin oleh profesional dengan pengalaman lintas industri dan fungsi bisnis.',
            'members' => [
                [
                    'name' => 'Andi Wijaya',
                    'role' => 'Chief Executive Officer',
                    'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
                    'description' => 'Memimpin arah strategis dan kemitraan utama perusahaan.',
                ],
                [
                    'name' => 'Sari Indrawati',
                    'role' => 'Chief Strategy Officer',
                    'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
                    'description' => 'Mengawal pengembangan solusi dan orkestrasi program lintas industri.',
                ],
            ],
        ];

        $team = array_replace_recursive($defaults, $team);

        $members = collect($team['members'] ?? [])
            ->map(fn($member) => [
                'name' => $member['name'] ?? '',
                'role' => $member['role'] ?? '',
                'image' => $member['image'] ?? '',
                'description' => $member['description'] ?? '',
            ])
            ->filter(fn($member) => $member['name'] !== '')
            ->values()
            ->all();

        return [
            'badge' => $team['badge'] ?? $defaults['badge'],
            'title' => $team['title'] ?? $defaults['title'],
            'description' => $team['description'] ?? $defaults['description'],
            'members' => $members,
        ];
    }

    private function transformAboutCta(array $cta): array
    {
        $contacts = collect($cta['contacts'] ?? [])
            ->map(fn($contact) => [
                'icon' => $contact['icon'] ?? 'phone',
                'title' => $contact['title'] ?? '',
                'detail' => $contact['detail'] ?? '',
            ])
            ->filter(fn($contact) => $contact['title'] !== '' && $contact['detail'] !== '')
            ->values()
            ->all();

        return [
            'badge' => $cta['badge'] ?? 'Mari Berdiskusi',
            'heading' => $cta['heading'] ?? 'Siap Bekerja Sama Dengan Kami?',
            'description' => $cta['description'] ?? '',
            'primary_label' => $cta['primary_label'] ?? 'Hubungi Kami',
            'primary_link' => $cta['primary_link'] ?? '/contact',
            'secondary_label' => $cta['secondary_label'] ?? null,
            'secondary_link' => $cta['secondary_link'] ?? null,
            'contacts' => $contacts,
        ];
    }

    private function transformServiceHero(array $hero): array
    {
        $stats = collect($hero['stats'] ?? [])
            ->map(fn($stat) => [
                'value' => $stat['value'] ?? '',
                'label' => $stat['label'] ?? '',
                'desc' => $stat['desc'] ?? '',
            ])
            ->filter(fn($stat) => $stat['value'] !== '')
            ->values()
            ->all();

        return [
            'heading' => $this->localizedText($hero['heading'] ?? null),
            'subheading' => $this->localizedText($hero['subheading'] ?? $hero['description'] ?? null),
            'highlight' => $this->localizedText($hero['highlight'] ?? null),
            'primary_label' => $this->localizedText($hero['primary_label'] ?? null),
            'primary_link' => $this->localizedText($hero['primary_link'] ?? null),
            'secondary_label' => $this->localizedText($hero['secondary_label'] ?? null),
            'secondary_link' => $this->localizedText($hero['secondary_link'] ?? null),
            'background_image' => $this->imageUrl($hero['background_image'] ?? $hero['hero_image'] ?? null),
            'stats' => $stats,
        ];
    }

    private function transformSection(array $section): array
    {
        return [
            'badge' => $this->localizedText($section['badge'] ?? null),
            'heading' => $this->localizedText($section['heading'] ?? null),
            'description' => $this->localizedText($section['description'] ?? null),
        ];
    }

    private function transformOfferingsSection(array $offerings): array
    {
        return [
            'badge' => $this->localizedText($offerings['badge'] ?? null),
            'heading' => $this->localizedText($offerings['heading'] ?? null),
            'description' => $this->localizedText($offerings['description'] ?? null),
            'items' => collect($offerings['items'] ?? [])
                ->map(fn($item) => [
                    'title' => $this->localizedText($item['title'] ?? null),
                    'description' => $this->localizedText($item['description'] ?? null),
                    'icon' => $item['icon'] ?? null,
                ])
                ->filter(fn($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformTechStackSection(array $techStack): array
    {
        return [
            'badge' => $this->localizedText($techStack['badge'] ?? null),
            'heading' => $this->localizedText($techStack['heading'] ?? null),
            'description' => $this->localizedText($techStack['description'] ?? null),
            'items' => collect($techStack['categories'] ?? [])
                ->map(fn($category) => [
                    'name' => $this->localizedText($category['name'] ?? null),
                    'items' => $category['items'] ?? [],
                    // Use 'items' array directly for list of tech strings
                    // Frontend likely needs to be updated to render this structure
                    'logo' => null, // Deprecated in favor of categories
                ])
                ->filter(fn($item) => $item['name'])
                ->values()
                ->all(),
        ];
    }

    private function transformProcessSection(array $process): array
    {
        return [
            'badge' => $this->localizedText($process['badge'] ?? null),
            'heading' => $this->localizedText($process['heading'] ?? null),
            'description' => $this->localizedText($process['description'] ?? null),
            'items' => collect($process['items'] ?? $process['steps'] ?? [])
                ->map(fn($item) => [
                    'step' => $this->localizedText($item['step'] ?? null),
                    'title' => $this->localizedText($item['title'] ?? null),
                    'description' => $this->localizedText($item['description'] ?? null),
                    'icon' => $item['icon'] ?? $item['iconName'] ?? null,
                ])
                ->filter(fn($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformAdvantagesSection(array $advantages): array
    {
        return [
            'badge' => $this->localizedText($advantages['badge'] ?? null),
            'heading' => $this->localizedText($advantages['heading'] ?? null),
            'description' => $this->localizedText($advantages['description'] ?? null),
            'items' => collect($advantages['items'] ?? [])
                ->map(fn($item) => [
                    'title' => $this->localizedText($item['title'] ?? null),
                    'description' => $this->localizedText($item['description'] ?? null),
                    'icon' => $item['icon'] ?? $item['iconName'] ?? null,
                ])
                ->filter(fn($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformFaqSection(array $faq): array
    {
        return [
            'badge' => $this->localizedText($faq['badge'] ?? null),
            'heading' => $this->localizedText($faq['heading'] ?? null),
            'description' => $this->localizedText($faq['description'] ?? null),
            'items' => collect($faq['items'] ?? [])
                ->map(fn($item) => [
                    'question' => $this->localizedText($item['question'] ?? null),
                    'answer' => $this->localizedText($item['answer'] ?? null),
                ])
                ->filter(fn($item) => $item['question'])
                ->values()
                ->all(),
        ];
    }

    private function imageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->exists($path)
            ? Storage::disk('public')->url($path)
            : $path;
    }

    private function transformProduct(Product $product): array
    {
        $features = collect($product->features ?? [])
            ->map(fn($feature) => is_string($feature) ? trim($feature) : $feature)
            ->filter()
            ->values()
            ->all();

        $gallery = collect($product->gallery ?? [])
            ->map(fn($image) => $this->imageUrl(is_array($image) ? ($image['url'] ?? null) : $image))
            ->filter()
            ->values()
            ->all();

        $variants = collect($product->price_variants ?? [])
            ->map(function ($variant) {
                if (!is_array($variant)) {
                    return null;
                }

                $price = isset($variant['price']) ? (float) $variant['price'] : null;
                $compare = isset($variant['compare_at_price']) ? (float) $variant['compare_at_price'] : null;

                return array_filter([
                    'name' => $this->translateIfNeeded($variant['name'] ?? null),
                    'sku' => $this->translateIfNeeded($variant['sku'] ?? null),
                    'price' => $price,
                    'compare_at_price' => $compare,
                    'price_formatted' => $price !== null ? $this->formatCurrency($price) : null,
                    'compare_at_price_formatted' => $compare !== null ? $this->formatCurrency($compare) : null,
                    'stock' => isset($variant['stock']) ? (int) $variant['stock'] : null,
                ], fn($value) => $value !== null);
            })
            ->filter()
            ->values()
            ->all();

        $priceRange = $this->resolvePriceRange($product->price, $variants);

        return [
            'id' => $product->id,
            'name' => $this->translateIfNeeded($product->name),
            'slug' => $product->slug,
            'cover_image' => $product->cover_image_url ?? $this->imageUrl($product->cover_image),
            'thumbnail' => $product->thumbnail_url ?? $this->imageUrl($product->thumbnail),
            'excerpt' => $this->translateIfNeeded($product->excerpt),
            'description' => $this->translateIfNeeded($product->description),
            'meta_title' => $this->translateIfNeeded($product->meta_title),
            'meta_description' => $this->translateIfNeeded($product->meta_description),
            'og_title' => $this->translateIfNeeded($product->og_title),
            'category' => $this->translateIfNeeded($product->category),
            'features' => $this->translateList($features),
            'marketing_summary' => $this->translateIfNeeded($product->marketing_summary),
            'marketing_highlights' => $this->translateList($product->marketing_highlights ?? []),
            'faqs' => collect($product->faqs ?? [])
                ->map(function ($faq) {
                    if (!is_array($faq)) {
                        return null;
                    }

                    $question = $this->translateIfNeeded($faq['question'] ?? null);
                    $answer = $this->translateIfNeeded($faq['answer'] ?? null);

                    if (!$question || !$answer) {
                        return null;
                    }

                    return [
                        'question' => $question,
                        'answer' => $answer,
                    ];
                })
                ->filter()
                ->values()
                ->all(),
            'cta_variants' => $this->translateList($product->cta_variants ?? []),
            'price' => $product->price,
            'price_range' => $priceRange,
            'clients' => $product->clients,
            'rating' => $product->rating,
            'popular' => (bool) $product->popular,
            'demo' => (bool) $product->demo,
            'gallery' => $gallery,
            'variants' => $variants,
            'purchase_url' => $this->translateIfNeeded($product->purchase_url),
            'whatsapp_number' => $product->whatsapp_number,
        ];
    }

    private function transformProject(Project $project): array
    {
        return [
            'id' => $project->id,
            'name' => $this->translateIfNeeded($project->name),
            'slug' => $project->slug,
            'client_name' => $this->translateIfNeeded($project->client_name),
            'cover_image' => $this->imageUrl($project->cover_image),
            'summary' => $this->translateIfNeeded($project->summary),
            'description' => $this->translateIfNeeded($project->description),
            'started_at' => optional($project->started_at)->toDateString(),
            'completed_at' => optional($project->completed_at)->toDateString(),
            'status' => $this->translateIfNeeded($project->status),
        ];
    }

    private function transformJob(JobPosition $position): array
    {
        return [
            'id' => $position->id,
            'title' => $this->translateIfNeeded($position->title),
            'slug' => $position->slug,
            'department' => $this->translateIfNeeded($position->department),
            'location' => $this->translateIfNeeded($position->location),
            'employment_type' => $this->translateIfNeeded($position->employment_type),
            'salary_range' => $this->translateIfNeeded($position->salary_range),
            'description' => $this->translateIfNeeded($position->description),
            'requirements' => $this->translateList($this->normalizeRequirements($position->requirements)),
            'posted_at' => optional($position->posted_at)->toIso8601String(),
        ];
    }

    private function transformArticle(BlogPost $post, bool $withBody = false): array
    {
        $article = [
            'id' => $post->id,
            'title' => $this->translateIfNeeded($post->title),
            'slug' => $post->slug,
            'excerpt' => $this->translateIfNeeded($post->excerpt),
            'cover_image' => $this->imageUrl($post->cover_image),
            'published_at' => optional($post->published_at ?? $post->created_at)->toIso8601String(),
            'author' => $post->author?->name,
            'meta_title' => $this->translateIfNeeded($post->meta_title),
            'meta_description' => $this->translateIfNeeded($post->meta_description),
            'og_title' => $this->translateIfNeeded($post->og_title),
            'cta_variants' => $this->translateList($post->cta_variants ?? []),
        ];

        if ($withBody) {
            $article['body'] = $this->translateIfNeeded($post->body);
        }

        return $article;
    }

    private function normalizeRequirements(?string $requirements): array
    {
        if (!$requirements) {
            return [];
        }

        return collect(preg_split('/\r\n|\r|\n/', $requirements))
            ->map(fn($line) => trim($line))
            ->filter()
            ->values()
            ->all();
    }

    private function seo(string $key, array $overrides = []): array
    {
        // Fetch SEO from pages table instead of config
        $page = Page::where('slug', $key)->first();

        // Get company name from settings as fallback
        $companyName = $this->setting('company.name', config('app.name'));

        $defaults = [
            'title' => $page?->meta_title ?? $companyName,
            'description' => $page?->meta_description ?? '',
            'keywords' => $page?->meta_keywords ?? '',
        ];

        return array_merge($defaults, $overrides);
    }


    private function localizedText($value): ?string
    {
        $locale = app()->getLocale();
        $sourceLanguage = $this->defaultLanguage;

        if (is_array($value)) {
            $direct = $value[$locale] ?? null;

            if (is_string($direct) && trim($direct) !== '') {
                return trim($direct);
            }

            $base = $value[$sourceLanguage] ?? null;

            if (is_string($base) && trim($base) !== '') {
                return trim($base);
            }

            foreach ($value as $text) {
                if (is_string($text) && trim($text) !== '') {
                    return trim($text);
                }
            }

            return null;
        }

        if (is_string($value) && trim($value) !== '') {
            return trim($value);
        }

        return null;
    }

    private function localizedList($value): array
    {
        $locale = app()->getLocale();
        $sourceLanguage = $this->defaultLanguage;

        if (is_array($value)) {
            if ($this->isAssoc($value)) {
                $localized = $value[$locale] ?? null;

                if (is_array($localized) && !empty($localized)) {
                    return $this->cleanList($localized);
                }

                $baseList = $value[$sourceLanguage] ?? null;

                if (is_array($baseList) && !empty($baseList)) {
                    return $this->cleanList($baseList);
                }

                foreach ($value as $items) {
                    if (is_array($items) && !empty($items)) {
                        return $this->cleanList($items);
                    }
                }

                return [];
            }

            return $this->cleanList($value);
        }

        if (is_string($value) && trim($value) !== '') {
            return [trim($value)];
        }

        return [];
    }

    private function cleanList(array $items): array
    {
        return collect($items)
            ->map(fn($item) => trim((string) $item))
            ->filter()
            ->values()
            ->all();
    }

    private function translateList(array $items): array
    {
        return $this->cleanList($items);
    }

    private function resolvePriceRange(?float $basePrice, array $variants): ?array
    {
        $prices = collect($variants)
            ->map(fn($variant) => $variant['price'] ?? null)
            ->filter(fn($price) => $price !== null)
            ->push($basePrice)
            ->filter(fn($price) => $price !== null)
            ->map(fn($price) => (float) $price)
            ->sort()
            ->values();

        if ($prices->isEmpty()) {
            return null;
        }

        $min = $prices->first();
        $max = $prices->last();

        return [
            'min' => $min,
            'max' => $max,
            'currency' => 'IDR',
            'formatted' => $min === $max
                ? $this->formatCurrency($min)
                : sprintf('%s - %s', $this->formatCurrency($min), $this->formatCurrency($max)),
        ];
    }

    private function formatCurrency(float $value): string
    {
        return 'Rp ' . number_format($value, 0, ',', '.');
    }

    private function translateIfNeeded(?string $text): ?string
    {
        if ($text === null) {
            return null;
        }

        $trimmed = trim($text);

        return $trimmed !== '' ? $trimmed : null;
    }

    private function isAssoc(array $array): bool
    {
        return array_keys($array) !== range(0, count($array) - 1);
    }
}
