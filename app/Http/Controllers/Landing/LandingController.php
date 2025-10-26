<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\CompanySetting;
use App\Models\JobPosition;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    protected ?array $seoCache = null;
    public function home(): Response
    {
        $heroSetting = $this->setting('landing.hero', []);
        $aboutSetting = $this->setting('landing.about', []);
        $ctaSetting = $this->setting('landing.final_cta', []);
        $metricsSetting = $this->setting('landing.metrics', []);

        return Inertia::render('landingPage/Home', [
            'services' => $this->servicePayload(Service::query()->active()->orderBy('display_order')->limit(6)->get()),
            'articles' => $this->articlePayload(BlogPost::query()->published()->latest('published_at')->limit(3)->with('author:id,name')->get()),
            'testimonials' => $this->testimonialPayload(Testimonial::query()->where('is_active', true)->latest()->limit(6)->get()),
            'teamMembers' => $this->teamPayload(TeamMember::query()->where('is_active', true)->orderBy('display_order')->limit(4)->get()),
            'hero' => $this->transformHero($heroSetting),
            'about' => $this->transformAbout($aboutSetting),
            'finalCta' => $ctaSetting,
            'metrics' => $this->transformMetrics($metricsSetting),
            'seo' => $this->seo('home'),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('landingPage/Service', [
            'services' => $this->servicePayload(Service::query()->active()->orderBy('display_order')->get()),
            'hero' => $this->transformServiceHero($this->setting('service.hero', [])),
            'summarySection' => $this->transformSection($this->setting('service.summary', [])),
            'offeringsSection' => $this->transformOfferingsSection($this->setting('service.offerings', [])),
            'techStackSection' => $this->transformTechStackSection($this->setting('service.tech_stack', [])),
            'processSection' => $this->transformProcessSection($this->setting('service.process', [])),
            'advantagesSection' => $this->transformAdvantagesSection($this->setting('service.advantages', [])),
            'faqSection' => $this->transformFaqSection($this->setting('service.faqs', [])),
            'seo' => $this->seo('service'),
        ]);
    }

    public function products(): Response
    {
        return Inertia::render('landingPage/Product', [
            'products' => $this->productPayload(Product::query()->active()->latest()->get()),
            'categories' => Product::query()->active()->whereNotNull('category')->distinct('category')->pluck('category'),
            'seo' => $this->seo('product'),
        ]);
    }

    public function projects(): Response
    {
        return Inertia::render('landingPage/Project', [
            'projects' => $this->projectPayload(Project::query()->orderByDesc('started_at')->orderByDesc('id')->get()),
            'seo' => $this->seo('project'),
        ]);
    }

    public function career(): Response
    {
        return Inertia::render('landingPage/Career', [
            'positions' => $this->careerPayload(JobPosition::query()->where('is_active', true)->latest('posted_at')->get()),
            'seo' => $this->seo('career'),
        ]);
    }

    public function blog(): Response
    {
        return Inertia::render('landingPage/Blog', [
            'articles' => $this->articlePayload(BlogPost::query()->published()->latest('published_at')->with('author:id,name')->get()),
            'seo' => $this->seo('blog'),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('landingPage/Contact', [
            'settings' => $this->settingsPayload(),
            'seo' => $this->seo('contact'),
        ]);
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
                'title' => $product->name,
                'description' => $product->excerpt ?? Str::limit(strip_tags($product->description ?? ''), 150),
                'image' => $productData['cover_image'] ?? $productData['thumbnail'] ?? null,
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
                ->latest('published_at')
                ->limit(4)
                ->with('author:id,name')
                ->get()
        );

        return Inertia::render('landingPage/BlogDetail', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'seo' => $this->seo('blog_detail', [
                'title' => $blogPost->title,
                'description' => $blogPost->excerpt ?? Str::limit(strip_tags($blogPost->body ?? ''), 150),
                'image' => $article['cover_image'] ?? null,
            ]),
        ]);
    }

    private function servicePayload(Collection $services): array
    {
        return $services->map(fn (Service $service) => [
            'id' => $service->id,
            'title' => $service->name,
            'slug' => $service->slug,
            'icon' => $service->icon,
            'excerpt' => $service->excerpt,
            'description' => $service->description,
        ])->all();
    }

    private function articlePayload(Collection $posts): array
    {
        return $posts->map(fn (BlogPost $post) => $this->transformArticle($post))->all();
    }

    private function testimonialPayload(Collection $testimonials): array
    {
        return $testimonials->map(fn (Testimonial $testimonial) => [
            'id' => $testimonial->id,
            'author_name' => $testimonial->author_name,
            'author_role' => $testimonial->author_role,
            'company' => $testimonial->company,
            'avatar' => $testimonial->avatar,
            'quote' => $testimonial->quote,
            'rating' => $testimonial->rating,
        ])->all();
    }

    private function teamPayload(Collection $members): array
    {
        return $members->map(fn (TeamMember $member) => [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'photo' => $member->photo,
            'linkedin' => $member->linkedin,
            'bio' => $member->bio,
        ])->all();
    }

    private function careerPayload(Collection $positions): array
    {
        return $positions->map(fn (JobPosition $position) => $this->transformJob($position))->all();
    }

    private function productPayload(Collection $products): array
    {
        return $products->map(fn (Product $product) => $this->transformProduct($product))->all();
    }

    private function projectPayload(Collection $projects): array
    {
        return $projects->map(fn (Project $project) => $this->transformProject($project))->all();
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
            'heading' => $hero['heading'] ?? null,
            'subheading' => $hero['subheading'] ?? null,
            'primary_label' => $hero['primary_label'] ?? null,
            'primary_link' => $hero['primary_link'] ?? null,
            'secondary_label' => $hero['secondary_label'] ?? null,
            'secondary_link' => $hero['secondary_link'] ?? null,
            'image_url' => $this->imageUrl($hero['image'] ?? null),
        ];
    }

    private function transformAbout(array $about): array
    {
        return [
            'title' => $about['title'] ?? null,
            'description' => $about['description'] ?? null,
            'highlights' => $about['highlights'] ?? [],
            'image_url' => $this->imageUrl($about['image'] ?? null),
        ];
    }

    private function transformMetrics(array $metrics): array
    {
        return collect($metrics)
            ->map(function ($metric) {
                return [
                    'value' => $metric['value'] ?? '',
                    'label' => $metric['label'] ?? '',
                ];
            })
            ->filter(fn ($metric) => $metric['value'] !== '')
            ->values()
            ->all();
    }

    private function transformServiceHero(array $hero): array
    {
        return [
            'heading' => $hero['heading'] ?? null,
            'subheading' => $hero['subheading'] ?? null,
            'highlight' => $hero['highlight'] ?? null,
            'primary_label' => $hero['primary_label'] ?? null,
            'primary_link' => $hero['primary_link'] ?? null,
            'secondary_label' => $hero['secondary_label'] ?? null,
            'secondary_link' => $hero['secondary_link'] ?? null,
            'background_image' => $this->imageUrl($hero['background_image'] ?? null),
        ];
    }

    private function transformSection(array $section): array
    {
        return [
            'badge' => $section['badge'] ?? null,
            'heading' => $section['heading'] ?? null,
            'description' => $section['description'] ?? null,
        ];
    }

    private function transformOfferingsSection(array $offerings): array
    {
        return [
            'badge' => $offerings['badge'] ?? null,
            'heading' => $offerings['heading'] ?? null,
            'description' => $offerings['description'] ?? null,
            'items' => collect($offerings['items'] ?? [])
                ->map(fn ($item) => [
                    'title' => $item['title'] ?? null,
                    'description' => $item['description'] ?? null,
                    'icon' => $item['icon'] ?? null,
                ])
                ->filter(fn ($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformTechStackSection(array $techStack): array
    {
        return [
            'badge' => $techStack['badge'] ?? null,
            'heading' => $techStack['heading'] ?? null,
            'description' => $techStack['description'] ?? null,
            'items' => collect($techStack['items'] ?? [])
                ->map(fn ($item) => [
                    'name' => $item['name'] ?? null,
                    'logo' => $this->imageUrl($item['logo'] ?? null),
                ])
                ->filter(fn ($item) => $item['name'])
                ->values()
                ->all(),
        ];
    }

    private function transformProcessSection(array $process): array
    {
        return [
            'badge' => $process['badge'] ?? null,
            'heading' => $process['heading'] ?? null,
            'description' => $process['description'] ?? null,
            'items' => collect($process['items'] ?? [])
                ->map(fn ($item) => [
                    'step' => $item['step'] ?? null,
                    'title' => $item['title'] ?? null,
                    'description' => $item['description'] ?? null,
                    'icon' => $item['icon'] ?? null,
                ])
                ->filter(fn ($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformAdvantagesSection(array $advantages): array
    {
        return [
            'badge' => $advantages['badge'] ?? null,
            'heading' => $advantages['heading'] ?? null,
            'description' => $advantages['description'] ?? null,
            'items' => collect($advantages['items'] ?? [])
                ->map(fn ($item) => [
                    'title' => $item['title'] ?? null,
                    'description' => $item['description'] ?? null,
                    'icon' => $item['icon'] ?? null,
                ])
                ->filter(fn ($item) => $item['title'])
                ->values()
                ->all(),
        ];
    }

    private function transformFaqSection(array $faq): array
    {
        return [
            'badge' => $faq['badge'] ?? null,
            'heading' => $faq['heading'] ?? null,
            'description' => $faq['description'] ?? null,
            'items' => collect($faq['items'] ?? [])
                ->map(fn ($item) => [
                    'question' => $item['question'] ?? null,
                    'answer' => $item['answer'] ?? null,
                ])
                ->filter(fn ($item) => $item['question'])
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
            ->map(fn ($feature) => is_string($feature) ? trim($feature) : $feature)
            ->filter()
            ->values()
            ->all();

        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'cover_image' => $product->cover_image_url ?? $this->imageUrl($product->cover_image),
            'thumbnail' => $product->thumbnail_url ?? $this->imageUrl($product->thumbnail),
            'excerpt' => $product->excerpt,
            'description' => $product->description,
            'category' => $product->category,
            'features' => $features,
            'price' => $product->price,
            'clients' => $product->clients,
            'rating' => $product->rating,
            'popular' => (bool) $product->popular,
            'demo' => (bool) $product->demo,
        ];
    }

    private function transformProject(Project $project): array
    {
        return [
            'id' => $project->id,
            'name' => $project->name,
            'slug' => $project->slug,
            'client_name' => $project->client_name,
            'cover_image' => $this->imageUrl($project->cover_image),
            'summary' => $project->summary,
            'description' => $project->description,
            'started_at' => optional($project->started_at)->toDateString(),
            'completed_at' => optional($project->completed_at)->toDateString(),
            'status' => $project->status,
        ];
    }

    private function transformJob(JobPosition $position): array
    {
        return [
            'id' => $position->id,
            'title' => $position->title,
            'slug' => $position->slug,
            'department' => $position->department,
            'location' => $position->location,
            'employment_type' => $position->employment_type,
            'salary_range' => $position->salary_range,
            'description' => $position->description,
            'requirements' => $this->normalizeRequirements($position->requirements),
            'posted_at' => optional($position->posted_at)->toIso8601String(),
        ];
    }

    private function transformArticle(BlogPost $post, bool $withBody = false): array
    {
        $article = [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'cover_image' => $this->imageUrl($post->cover_image),
            'published_at' => optional($post->published_at)->toIso8601String(),
            'author' => $post->author?->name,
        ];

        if ($withBody) {
            $article['body'] = $post->body;
        }

        return $article;
    }

    private function normalizeRequirements(?string $requirements): array
    {
        if (!$requirements) {
            return [];
        }

        return collect(preg_split('/\r\n|\r|\n/', $requirements))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();
    }

    private function seo(string $key, array $overrides = []): array
    {
        $settings = $this->seoSettings();
        $meta = $settings[$key] ?? [];
        $merged = array_filter(array_merge($meta, $overrides), fn ($value) => $value !== null && $value !== '');

        if (isset($merged['keywords']) && is_array($merged['keywords'])) {
            $merged['keywords'] = array_values(array_filter($merged['keywords']));
        }

        return $merged;
    }

    private function seoSettings(): array
    {
        if ($this->seoCache === null) {
            $this->seoCache = CompanySetting::query()->where('key', 'seo.pages')->value('value') ?? config('landing.seo', []);
        }

        return $this->seoCache;
    }
}
