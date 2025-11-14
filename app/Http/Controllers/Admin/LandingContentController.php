<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LandingContentController extends Controller
{
    public function edit(Request $request): Response
    {
        $languages = $this->languages();
        $hero = $this->setting('landing.hero');
        $about = $this->setting('landing.about');
        $finalCta = $this->setting('landing.final_cta');
        $metrics = $this->setting('landing.metrics', []);
        $productCta = $this->setting('product.cta', []);
        $productStats = $this->setting('product.stats', []);
        $hero = $this->localizeFields($hero, [
            'heading',
            'subheading',
            'primary_label',
            'primary_link',
            'secondary_label',
            'secondary_link',
        ], $languages);
        $about = $this->localizeFields($about, ['title', 'description'], $languages);
        $about['highlights'] = $this->localizeLists($about['highlights'] ?? [], $languages);
        $finalCta = $this->localizeFields($finalCta, ['heading', 'description', 'button_label', 'button_link'], $languages);
        $metrics = $this->localizeMetrics($metrics, $languages);
        $productCta = $this->localizeFields($productCta, [
            'badge',
            'heading',
            'description',
            'primary_label',
            'primary_link',
            'secondary_label',
            'secondary_link',
        ], $languages);
        $productCta['contacts'] = collect($productCta['contacts'] ?? [])
            ->map(function (array $contact) use ($languages) {
                return [
                    'icon' => $contact['icon'] ?? 'phone',
                    'title' => $this->normalizeLocalizedValue($contact['title'] ?? null, $languages),
                    'detail' => $this->normalizeLocalizedValue($contact['detail'] ?? null, $languages),
                ];
            })
            ->values()
            ->all();
        $productStatsLabels = is_array($productStats['labels'] ?? null)
            ? $productStats['labels']
            : [];
        $productStats = [
            'labels' => [
                'products' => $this->normalizeLocalizedValue($productStatsLabels['products'] ?? null, $languages),
                'clients' => $this->normalizeLocalizedValue($productStatsLabels['clients'] ?? null, $languages),
                'rating' => $this->normalizeLocalizedValue($productStatsLabels['rating'] ?? null, $languages),
                'awards' => $this->normalizeLocalizedValue($productStatsLabels['awards'] ?? null, $languages),
            ],
            'awards' => $productStats['awards'] ?? null,
        ];
        $productHeroSetting = $this->setting('product.hero', []);
        $productHero = [
            'badge' => $this->normalizeLocalizedValue($productHeroSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($productHeroSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($productHeroSetting['description'] ?? null, $languages),
        ];
        $projectHeroSetting = $this->setting('project.hero', []);
        $projectHero = [
            'badge' => $this->normalizeLocalizedValue($projectHeroSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($projectHeroSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($projectHeroSetting['description'] ?? null, $languages),
        ];
        $careerHeroSetting = $this->setting('career.hero', []);
        $careerHero = [
            'badge' => $this->normalizeLocalizedValue($careerHeroSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($careerHeroSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($careerHeroSetting['description'] ?? null, $languages),
        ];
        $blogHeroSetting = $this->setting('blog.hero', []);
        $blogHero = [
            'badge' => $this->normalizeLocalizedValue($blogHeroSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($blogHeroSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($blogHeroSetting['description'] ?? null, $languages),
        ];
        $navigationSetting = collect($this->setting('navigation.primary', []));
        $navigationOptions = collect(config('landing.navigation', []))
            ->map(function (array $item) use ($navigationSetting) {
                $state = $navigationSetting->firstWhere('key', $item['key']) ?? [];

                return [
                    'key' => $item['key'],
                    'href' => $item['href'],
                    'labels' => $item['labels'] ?? [],
                    'default_active' => $item['default_active'] ?? true,
                    'active' => $state['active'] ?? $item['default_active'] ?? true,
                ];
            })
            ->values()
            ->all();

        $isSettingsContext = $request->routeIs('settings.content.edit');
        $serviceHeroSetting = $this->setting('service.hero', []);
        $serviceHero = $this->localizeFields($serviceHeroSetting, [
            'heading',
            'subheading',
            'highlight',
            'primary_label',
            'primary_link',
            'secondary_label',
            'secondary_link',
        ], $languages);
        $serviceSummarySetting = $this->setting('service.summary', []);
        $serviceSummary = [
            'badge' => $this->normalizeLocalizedValue($serviceSummarySetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceSummarySetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceSummarySetting['description'] ?? null, $languages),
        ];
        $serviceOfferingsSetting = $this->setting('service.offerings', []);
        $serviceOfferings = [
            'badge' => $this->normalizeLocalizedValue($serviceOfferingsSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceOfferingsSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceOfferingsSetting['description'] ?? null, $languages),
            'items' => collect($serviceOfferingsSetting['items'] ?? [])
                ->map(function (array $item) use ($languages) {
                    return [
                        'title' => $this->normalizeLocalizedValue($item['title'] ?? null, $languages),
                        'description' => $this->normalizeLocalizedValue($item['description'] ?? null, $languages),
                        'icon' => $item['icon'] ?? null,
                    ];
                })
                ->values()
                ->all(),
        ];
        $serviceTechStackSetting = $this->setting('service.tech_stack', []);
        $serviceTechStack = [
            'badge' => $this->normalizeLocalizedValue($serviceTechStackSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceTechStackSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceTechStackSetting['description'] ?? null, $languages),
            'items' => collect($serviceTechStackSetting['items'] ?? [])
                ->map(function (array $item) use ($languages) {
                    return [
                        'name' => $this->normalizeLocalizedValue($item['name'] ?? null, $languages),
                        'logo' => $item['logo'] ?? null,
                    ];
                })
                ->values()
                ->all(),
        ];
        $serviceProcessSetting = $this->setting('service.process', []);
        $serviceProcess = [
            'badge' => $this->normalizeLocalizedValue($serviceProcessSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceProcessSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceProcessSetting['description'] ?? null, $languages),
            'items' => collect($serviceProcessSetting['items'] ?? [])
                ->map(function (array $item) use ($languages) {
                    return [
                        'step' => $this->normalizeLocalizedValue($item['step'] ?? null, $languages),
                        'title' => $this->normalizeLocalizedValue($item['title'] ?? null, $languages),
                        'description' => $this->normalizeLocalizedValue($item['description'] ?? null, $languages),
                        'icon' => $item['icon'] ?? null,
                    ];
                })
                ->values()
                ->all(),
        ];
        $serviceAdvantagesSetting = $this->setting('service.advantages', []);
        $serviceAdvantages = [
            'badge' => $this->normalizeLocalizedValue($serviceAdvantagesSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceAdvantagesSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceAdvantagesSetting['description'] ?? null, $languages),
            'items' => collect($serviceAdvantagesSetting['items'] ?? [])
                ->map(function (array $item) use ($languages) {
                    return [
                        'title' => $this->normalizeLocalizedValue($item['title'] ?? null, $languages),
                        'description' => $this->normalizeLocalizedValue($item['description'] ?? null, $languages),
                        'icon' => $item['icon'] ?? null,
                    ];
                })
                ->values()
                ->all(),
        ];
        $serviceFaqSetting = $this->setting('service.faqs', []);
        $serviceFaqs = [
            'badge' => $this->normalizeLocalizedValue($serviceFaqSetting['badge'] ?? null, $languages),
            'heading' => $this->normalizeLocalizedValue($serviceFaqSetting['heading'] ?? null, $languages),
            'description' => $this->normalizeLocalizedValue($serviceFaqSetting['description'] ?? null, $languages),
            'items' => collect($serviceFaqSetting['items'] ?? [])
                ->map(function (array $item) use ($languages) {
                    return [
                        'question' => $this->normalizeLocalizedValue($item['question'] ?? null, $languages),
                        'answer' => $this->normalizeLocalizedValue($item['answer'] ?? null, $languages),
                    ];
                })
                ->values()
                ->all(),
        ];
        $sectionDefaults = $this->landingSectionDefaults();
        $storedSections = $this->setting('landing.sections', []);
        $sectionVisibility = collect($sectionDefaults)
            ->mapWithKeys(function ($default, $key) use ($storedSections) {
                $value = is_array($storedSections) ? ($storedSections[$key] ?? $default) : $default;

                return [$key => (bool) $value];
            })
            ->toArray();

        return Inertia::render($isSettingsContext ? 'settings/content' : 'admin/landing/Index', [
            'hero' => [
                ...$hero,
                'image_url' => $this->imageUrl($hero['image'] ?? null),
            ],
            'about' => [
                ...$about,
                'image_url' => $this->imageUrl($about['image'] ?? null),
            ],
            'finalCta' => $finalCta,
            'metrics' => $metrics,
            'productCta' => $productCta,
            'productStats' => $productStats,
            'productHero' => $productHero,
            'projectHero' => $projectHero,
            'careerHero' => $careerHero,
            'navigationOptions' => $navigationOptions,
            'blogHero' => $blogHero,
            'serviceHero' => [
                ...$serviceHero,
                'background_image_url' => $this->imageUrl($serviceHero['background_image'] ?? null),
            ],
            'serviceSummary' => $serviceSummary,
            'serviceOfferings' => $serviceOfferings,
            'serviceTechStack' => $serviceTechStack,
            'serviceProcess' => $serviceProcess,
            'serviceAdvantages' => $serviceAdvantages,
            'serviceFaqs' => $serviceFaqs,
            'languages' => $languages,
            'defaultLanguage' => config('landing.default_language', 'id'),
            'sectionVisibility' => $sectionVisibility,
            'routes' => $this->contextRoutes($isSettingsContext),
        ]);
    }

    public function updateHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'subheading' => ['required', 'array'],
            'subheading.*' => ['nullable', 'string'],
            'primary_label' => ['required', 'array'],
            'primary_label.*' => ['nullable', 'string', 'max:100'],
            'primary_link' => ['required', 'array'],
            'primary_link.*' => ['nullable', 'string', 'max:255'],
            'secondary_label' => ['required', 'array'],
            'secondary_label.*' => ['nullable', 'string', 'max:100'],
            'secondary_link' => ['required', 'array'],
            'secondary_link.*' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $hero = $this->setting('landing.hero');

        if ($request->hasFile('image')) {
            if (!empty($hero['image'])) {
                Storage::disk('public')->delete($hero['image']);
            }

            $path = $request->file('image')->store('landing', 'public');
            $data['image'] = $path;
        } else {
            $data['image'] = $hero['image'] ?? null;
        }

        $heroPayload = [
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'subheading' => $this->sanitizeLocalizedText($data['subheading'], $languages),
            'primary_label' => $this->sanitizeLocalizedText($data['primary_label'], $languages),
            'primary_link' => $this->sanitizeLocalizedText($data['primary_link'], $languages),
            'secondary_label' => $this->sanitizeLocalizedText($data['secondary_label'], $languages),
            'secondary_link' => $this->sanitizeLocalizedText($data['secondary_link'], $languages),
            'image' => $data['image'] ?? null,
        ];

        $this->saveSetting('landing.hero', $heroPayload);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten hero berhasil diperbarui.');
    }

    public function updateAbout(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'title' => ['required', 'array'],
            'title.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'highlights' => ['required', 'array'],
            'highlights.*' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $about = $this->setting('landing.about');

        if ($request->hasFile('image')) {
            if (!empty($about['image'])) {
                Storage::disk('public')->delete($about['image']);
            }

            $path = $request->file('image')->store('landing', 'public');
            $about['image'] = $path;
        }

        $about['title'] = $this->sanitizeLocalizedText($data['title'], $languages);
        $about['description'] = $this->sanitizeLocalizedText($data['description'], $languages);
        $about['highlights'] = $this->sanitizeLocalizedLists($data['highlights'], $languages);

        $this->saveSetting('landing.about', $about);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten tentang perusahaan berhasil diperbarui.');
    }

    public function updateFinalCta(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'button_label' => ['required', 'array'],
            'button_label.*' => ['nullable', 'string', 'max:100'],
            'button_link' => ['required', 'array'],
            'button_link.*' => ['nullable', 'string', 'max:255'],
        ]);

        $this->saveSetting('landing.final_cta', [
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'button_label' => $this->sanitizeLocalizedText($data['button_label'], $languages),
            'button_link' => $this->sanitizeLocalizedText($data['button_link'], $languages),
        ]);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten CTA berhasil diperbarui.');
    }

    public function updateProductCta(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'primary_label' => ['required', 'array'],
            'primary_label.*' => ['nullable', 'string', 'max:100'],
            'primary_link' => ['required', 'array'],
            'primary_link.*' => ['nullable', 'string', 'max:255'],
            'secondary_label' => ['required', 'array'],
            'secondary_label.*' => ['nullable', 'string', 'max:100'],
            'secondary_link' => ['required', 'array'],
            'secondary_link.*' => ['nullable', 'string', 'max:255'],
            'contacts' => ['required', 'array', 'min:1'],
            'contacts.*.icon' => ['required', 'string', Rule::in(['phone', 'mail', 'clock'])],
            'contacts.*.title' => ['required', 'array'],
            'contacts.*.title.*' => ['nullable', 'string', 'max:120'],
            'contacts.*.detail' => ['required', 'array'],
            'contacts.*.detail.*' => ['nullable', 'string', 'max:160'],
        ]);

        $contacts = collect($data['contacts'])
            ->map(function (array $contact) use ($languages) {
                return [
                    'icon' => $contact['icon'],
                    'title' => $this->sanitizeLocalizedText($contact['title'], $languages),
                    'detail' => $this->sanitizeLocalizedText($contact['detail'], $languages),
                ];
            })
            ->filter(function (array $contact) {
                $hasTitle = collect($contact['title'] ?? [])->filter()->isNotEmpty();
                $hasDetail = collect($contact['detail'] ?? [])->filter()->isNotEmpty();

                return $hasTitle || $hasDetail;
            })
            ->values()
            ->all();

        if (empty($contacts)) {
            $contacts = [
                [
                    'icon' => 'phone',
                    'title' => null,
                    'detail' => null,
                ],
            ];
        }

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'primary_label' => $this->sanitizeLocalizedText($data['primary_label'], $languages),
            'primary_link' => $this->sanitizeLocalizedText($data['primary_link'], $languages),
            'secondary_label' => $this->sanitizeLocalizedText($data['secondary_label'], $languages),
            'secondary_link' => $this->sanitizeLocalizedText($data['secondary_link'], $languages),
            'contacts' => $contacts,
        ];

        $this->saveSetting('product.cta', $payload);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten CTA produk berhasil diperbarui.');
    }

    public function updateMetrics(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'metrics' => ['nullable', 'array'],
            'metrics.*' => ['nullable', 'string'],
        ]);

        $metrics = $this->parseMetrics($data['metrics'] ?? [], $languages);

        $this->saveSetting('landing.metrics', $metrics);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Statistik landing berhasil diperbarui.');
    }

    public function updateProductStats(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'labels' => ['required', 'array'],
            'labels.products' => ['required', 'array'],
            'labels.products.*' => ['nullable', 'string', 'max:100'],
            'labels.clients' => ['required', 'array'],
            'labels.clients.*' => ['nullable', 'string', 'max:100'],
            'labels.rating' => ['required', 'array'],
            'labels.rating.*' => ['nullable', 'string', 'max:100'],
            'labels.awards' => ['required', 'array'],
            'labels.awards.*' => ['nullable', 'string', 'max:100'],
            'awards' => ['nullable', 'integer', 'min:0'],
        ]);

        $payload = [
            'labels' => [
                'products' => $this->sanitizeLocalizedText($data['labels']['products'], $languages),
                'clients' => $this->sanitizeLocalizedText($data['labels']['clients'], $languages),
                'rating' => $this->sanitizeLocalizedText($data['labels']['rating'], $languages),
                'awards' => $this->sanitizeLocalizedText($data['labels']['awards'], $languages),
            ],
            'awards' => isset($data['awards']) ? (int) $data['awards'] : null,
        ];

        $this->saveSetting('product.stats', $payload);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Statistik produk berhasil diperbarui.');
    }

    public function updateProductHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
        ]);

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
        ];

        $this->saveSetting('product.hero', $payload, 'product');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Hero produk berhasil diperbarui.');
    }

    public function updateProjectHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
        ]);

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
        ];

        $this->saveSetting('project.hero', $payload, 'project');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Hero proyek berhasil diperbarui.');
    }

    public function updateCareerHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
        ]);

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
        ];

        $this->saveSetting('career.hero', $payload, 'career');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Hero karier berhasil diperbarui.');
    }

    public function updateBlogHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
        ]);

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
        ];

        $this->saveSetting('blog.hero', $payload, 'blog');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten hero blog berhasil diperbarui.');
    }

    public function updateNavigation(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'active_keys' => ['nullable', 'array'],
            'active_keys.*' => ['string'],
        ]);

        $activeKeys = collect($data['active_keys'] ?? []);
        $navigationState = collect(config('landing.navigation', []))
            ->map(function (array $item, int $index) use ($activeKeys) {
                return [
                    'key' => $item['key'],
                    'order' => $item['default_order'] ?? $index + 1,
                    'active' => $activeKeys->contains($item['key']),
                ];
            })
            ->values()
            ->all();

        CompanySetting::updateOrCreate(
            ['key' => 'navigation.primary'],
            ['group' => 'navigation', 'value' => $navigationState]
        );

        return redirect()->route($this->redirectRoute($request))->with('success', 'Navigasi landing berhasil diperbarui.');
    }

    public function updateSectionVisibility(Request $request): RedirectResponse
    {
        $defaults = $this->landingSectionDefaults();
        $rules = collect(array_keys($defaults))
            ->mapWithKeys(fn ($key) => [$key => ['required', 'boolean']])
            ->toArray();

        $data = $request->validate($rules);
        $payload = collect($defaults)
            ->mapWithKeys(fn ($default, $key) => [$key => (bool) ($data[$key] ?? $default)])
            ->toArray();

        $this->saveSetting('landing.sections', $payload);

        return redirect()->route($this->redirectRoute($request))->with('success', 'Pengaturan section landing berhasil diperbarui.');
    }

    public function updateServiceHero(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'subheading' => ['required', 'array'],
            'subheading.*' => ['nullable', 'string'],
            'highlight' => ['required', 'array'],
            'highlight.*' => ['nullable', 'string', 'max:255'],
            'primary_label' => ['required', 'array'],
            'primary_label.*' => ['nullable', 'string', 'max:120'],
            'primary_link' => ['required', 'array'],
            'primary_link.*' => ['nullable', 'string', 'max:255'],
            'secondary_label' => ['required', 'array'],
            'secondary_label.*' => ['nullable', 'string', 'max:120'],
            'secondary_link' => ['required', 'array'],
            'secondary_link.*' => ['nullable', 'string', 'max:255'],
            'background_image' => ['nullable', 'image', 'max:3072'],
        ]);

        $hero = $this->setting('service.hero', []);

        if ($request->hasFile('background_image')) {
            if (!empty($hero['background_image'])) {
                Storage::disk('public')->delete($hero['background_image']);
            }

            $hero['background_image'] = $request->file('background_image')->store('service', 'public');
        }

        $hero['heading'] = $this->sanitizeLocalizedText($data['heading'], $languages);
        $hero['subheading'] = $this->sanitizeLocalizedText($data['subheading'], $languages);
        $hero['highlight'] = $this->sanitizeLocalizedText($data['highlight'], $languages);
        $hero['primary_label'] = $this->sanitizeLocalizedText($data['primary_label'], $languages);
        $hero['primary_link'] = $this->sanitizeLocalizedText($data['primary_link'], $languages);
        $hero['secondary_label'] = $this->sanitizeLocalizedText($data['secondary_label'], $languages);
        $hero['secondary_link'] = $this->sanitizeLocalizedText($data['secondary_link'], $languages);

        $this->saveSetting('service.hero', $hero, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Konten hero layanan berhasil diperbarui.');
    }

    public function updateServiceSummary(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
        ]);

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
        ];

        $this->saveSetting('service.summary', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Ringkasan layanan berhasil diperbarui.');
    }

    public function updateServiceOfferings(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'items' => ['nullable', 'array'],
            'items.*.title' => ['required', 'array'],
            'items.*.title.*' => ['nullable', 'string', 'max:150'],
            'items.*.description' => ['required', 'array'],
            'items.*.description.*' => ['nullable', 'string'],
            'items.*.icon' => ['nullable', 'string', 'max:80'],
        ]);

        $items = collect($data['items'] ?? [])
            ->map(function (array $item) use ($languages) {
                return [
                    'title' => $this->sanitizeLocalizedText($item['title'] ?? [], $languages),
                    'description' => $this->sanitizeLocalizedText($item['description'] ?? [], $languages),
                    'icon' => isset($item['icon']) && trim((string) $item['icon']) !== '' ? trim((string) $item['icon']) : null,
                ];
            })
            ->filter(function (array $item) {
                return collect($item['title'] ?? [])->filter()->isNotEmpty();
            })
            ->values()
            ->all();

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'items' => $items,
        ];

        $this->saveSetting('service.offerings', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Highlight layanan berhasil diperbarui.');
    }

    public function updateServiceTechStack(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'items' => ['nullable', 'array'],
            'items.*.name' => ['required', 'array'],
            'items.*.name.*' => ['nullable', 'string', 'max:120'],
            'items.*.logo' => ['nullable', 'string', 'max:255'],
        ]);

        $items = collect($data['items'] ?? [])
            ->map(function (array $item) use ($languages) {
                return [
                    'name' => $this->sanitizeLocalizedText($item['name'] ?? [], $languages),
                    'logo' => isset($item['logo']) && trim((string) $item['logo']) !== '' ? trim((string) $item['logo']) : null,
                ];
            })
            ->filter(function (array $item) {
                return collect($item['name'] ?? [])->filter()->isNotEmpty();
            })
            ->values()
            ->all();

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'items' => $items,
        ];

        $this->saveSetting('service.tech_stack', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Tech stack layanan berhasil diperbarui.');
    }

    public function updateServiceProcess(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'items' => ['nullable', 'array'],
            'items.*.step' => ['required', 'array'],
            'items.*.step.*' => ['nullable', 'string', 'max:50'],
            'items.*.title' => ['required', 'array'],
            'items.*.title.*' => ['nullable', 'string', 'max:150'],
            'items.*.description' => ['required', 'array'],
            'items.*.description.*' => ['nullable', 'string'],
            'items.*.icon' => ['nullable', 'string', 'max:80'],
        ]);

        $items = collect($data['items'] ?? [])
            ->map(function (array $item) use ($languages) {
                return [
                    'step' => $this->sanitizeLocalizedText($item['step'] ?? [], $languages),
                    'title' => $this->sanitizeLocalizedText($item['title'] ?? [], $languages),
                    'description' => $this->sanitizeLocalizedText($item['description'] ?? [], $languages),
                    'icon' => isset($item['icon']) && trim((string) $item['icon']) !== '' ? trim((string) $item['icon']) : null,
                ];
            })
            ->filter(function (array $item) {
                return collect($item['title'] ?? [])->filter()->isNotEmpty();
            })
            ->values()
            ->all();

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'items' => $items,
        ];

        $this->saveSetting('service.process', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Proses layanan berhasil diperbarui.');
    }

    public function updateServiceAdvantages(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'items' => ['nullable', 'array'],
            'items.*.title' => ['required', 'array'],
            'items.*.title.*' => ['nullable', 'string', 'max:150'],
            'items.*.description' => ['required', 'array'],
            'items.*.description.*' => ['nullable', 'string'],
            'items.*.icon' => ['nullable', 'string', 'max:80'],
        ]);

        $items = collect($data['items'] ?? [])
            ->map(function (array $item) use ($languages) {
                return [
                    'title' => $this->sanitizeLocalizedText($item['title'] ?? [], $languages),
                    'description' => $this->sanitizeLocalizedText($item['description'] ?? [], $languages),
                    'icon' => isset($item['icon']) && trim((string) $item['icon']) !== '' ? trim((string) $item['icon']) : null,
                ];
            })
            ->filter(function (array $item) {
                return collect($item['title'] ?? [])->filter()->isNotEmpty();
            })
            ->values()
            ->all();

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'items' => $items,
        ];

        $this->saveSetting('service.advantages', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'Keunggulan layanan berhasil diperbarui.');
    }

    public function updateServiceFaqs(Request $request): RedirectResponse
    {
        $languages = $this->languages();
        $data = $request->validate([
            'badge' => ['required', 'array'],
            'badge.*' => ['nullable', 'string', 'max:80'],
            'heading' => ['required', 'array'],
            'heading.*' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.*' => ['nullable', 'string'],
            'items' => ['nullable', 'array'],
            'items.*.question' => ['required', 'array'],
            'items.*.question.*' => ['nullable', 'string'],
            'items.*.answer' => ['required', 'array'],
            'items.*.answer.*' => ['nullable', 'string'],
        ]);

        $items = collect($data['items'] ?? [])
            ->map(function (array $item) use ($languages) {
                return [
                    'question' => $this->sanitizeLocalizedText($item['question'] ?? [], $languages),
                    'answer' => $this->sanitizeLocalizedText($item['answer'] ?? [], $languages),
                ];
            })
            ->filter(function (array $item) {
                return collect($item['question'] ?? [])->filter()->isNotEmpty();
            })
            ->values()
            ->all();

        $payload = [
            'badge' => $this->sanitizeLocalizedText($data['badge'], $languages),
            'heading' => $this->sanitizeLocalizedText($data['heading'], $languages),
            'description' => $this->sanitizeLocalizedText($data['description'], $languages),
            'items' => $items,
        ];

        $this->saveSetting('service.faqs', $payload, 'service');

        return redirect()->route($this->redirectRoute($request))->with('success', 'FAQ layanan berhasil diperbarui.');
    }

    private function setting(string $key, $default = [])
    {
        return CompanySetting::query()->where('key', $key)->value('value') ?? $default;
    }

    private function saveSetting(string $key, $value, ?string $group = null): void
    {
        CompanySetting::updateOrCreate(
            ['key' => $key],
            ['group' => $group ?? 'landing', 'value' => $value]
        );
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

    private function languages(): array
    {
        $languages = config('landing.languages', []);

        if (empty($languages)) {
            return [
                ['code' => 'id', 'label' => 'ID', 'name' => 'Bahasa Indonesia'],
            ];
        }

        return $languages;
    }

    private function localizeFields(array $data, array $fields, array $languages): array
    {
        foreach ($fields as $field) {
            $data[$field] = $this->normalizeLocalizedValue($data[$field] ?? null, $languages);
        }

        return $data;
    }

    private function localizeLists($value, array $languages): array
    {
        return $this->normalizeLocalizedValue($value ?? [], $languages, true);
    }

    private function localizeMetrics(array $metrics, array $languages): array
    {
        return collect($metrics)
            ->map(function ($metric) use ($languages) {
                return [
                    'value' => $this->normalizeLocalizedValue($metric['value'] ?? null, $languages),
                    'label' => $this->normalizeLocalizedValue($metric['label'] ?? null, $languages),
                ];
            })
            ->values()
            ->all();
    }

    private function normalizeLocalizedValue($value, array $languages, bool $asList = false): array
    {
        $result = [];
        $isAssoc = is_array($value) && $this->isAssoc($value);

        foreach ($languages as $language) {
            $code = $language['code'];

            if ($asList) {
                if ($isAssoc && isset($value[$code]) && is_array($value[$code])) {
                    $list = $value[$code];
                } elseif (is_array($value) && !$isAssoc) {
                    $list = $value;
                } else {
                    $list = [];
                }

                $result[$code] = collect($list)
                    ->map(fn ($line) => trim((string) $line))
                    ->filter()
                    ->values()
                    ->all();
            } else {
                if ($isAssoc && array_key_exists($code, $value)) {
                    $text = $value[$code];
                } else {
                    if (is_string($value)) {
                        $text = $value;
                    } elseif (is_array($value) && array_key_exists($code, $value)) {
                        $text = $value[$code];
                    } else {
                        $text = null;
                    }
                }

                $result[$code] = $text !== null ? trim((string) $text) : '';
            }
        }

        return $result;
    }

    private function sanitizeLocalizedText(array $texts, array $languages): array
    {
        $clean = [];

        foreach ($languages as $language) {
            $code = $language['code'];
            $value = $texts[$code] ?? null;
            $value = is_string($value) ? trim($value) : '';
            $clean[$code] = $value !== '' ? $value : null;
        }

        return $clean;
    }

    private function sanitizeLocalizedLists(array $lists, array $languages): array
    {
        $clean = [];

        foreach ($languages as $language) {
            $code = $language['code'];
            $lines = $lists[$code] ?? '';
            $lines = is_string($lines) ? $lines : '';

            $clean[$code] = collect(explode("\n", $lines))
                ->map(fn ($line) => trim($line))
                ->filter()
                ->values()
                ->all();
        }

        return $clean;
    }

    private function parseMetrics(array $input, array $languages): array
    {
        $perLocale = [];

        foreach ($languages as $language) {
            $code = $language['code'];
            $raw = $input[$code] ?? '';
            $lines = array_values(array_filter(array_map('trim', explode("\n", (string) $raw))));
            $perLocale[$code] = $lines;
        }

        $max = collect($perLocale)->map(fn ($lines) => count($lines))->max() ?? 0;
        $metrics = [];

        for ($index = 0; $index < $max; $index++) {
            $value = [];
            $label = [];

            foreach ($languages as $language) {
                $code = $language['code'];
                $line = $perLocale[$code][$index] ?? '';
                [$val, $lab] = array_pad(explode('|', $line, 2), 2, '');
                $value[$code] = trim($val) ?: null;
                $label[$code] = trim($lab) ?: null;
            }

            if (collect($value)->filter()->isEmpty()) {
                continue;
            }

            $metrics[] = compact('value', 'label');
        }

        return $metrics;
    }

    protected function landingSectionDefaults(): array
    {
        return config('landing.home_sections', [
            'hero' => true,
            'about' => true,
            'services' => true,
            'testimonials' => true,
            'articles' => true,
            'final_cta' => true,
            'metrics' => true,
        ]);
    }

    protected function contextRoutes(bool $isSettings): array
    {
        if ($isSettings) {
            return [
                'hero' => 'settings.content.hero',
                'about' => 'settings.content.about.update',
                'finalCta' => 'settings.content.cta.update',
                'metrics' => 'settings.content.metrics.update',
                'navigation' => 'settings.content.navigation.update',
                'productCta' => 'settings.content.product-cta.update',
                'productStats' => 'settings.content.product-stats.update',
                'productHero' => 'settings.content.product.hero.update',
                'projectHero' => 'settings.content.project.hero.update',
                'careerHero' => 'settings.content.career.hero.update',
                'blogHero' => 'settings.content.blog.hero.update',
                'serviceHero' => 'settings.content.service.hero.update',
                'serviceSummary' => 'settings.content.service.summary.update',
                'serviceOfferings' => 'settings.content.service.offerings.update',
                'serviceTechStack' => 'settings.content.service.tech-stack.update',
                'serviceProcess' => 'settings.content.service.process.update',
                'serviceAdvantages' => 'settings.content.service.advantages.update',
                'serviceFaqs' => 'settings.content.service.faqs.update',
                'sections' => 'settings.content.sections.update',
            ];
        }

        return [
            'hero' => 'admin.landing.hero',
            'about' => 'admin.landing.about.update',
            'finalCta' => 'admin.landing.cta.update',
            'metrics' => 'admin.landing.metrics.update',
            'navigation' => 'admin.landing.navigation.update',
            'productCta' => 'admin.landing.product-cta.update',
            'productStats' => 'admin.landing.product-stats.update',
            'productHero' => 'admin.landing.product.hero.update',
            'projectHero' => 'admin.landing.project.hero.update',
            'careerHero' => 'admin.landing.career.hero.update',
            'blogHero' => 'admin.landing.blog.hero.update',
            'serviceHero' => 'admin.landing.service.hero.update',
            'serviceSummary' => 'admin.landing.service.summary.update',
            'serviceOfferings' => 'admin.landing.service.offerings.update',
            'serviceTechStack' => 'admin.landing.service.tech-stack.update',
            'serviceProcess' => 'admin.landing.service.process.update',
            'serviceAdvantages' => 'admin.landing.service.advantages.update',
            'serviceFaqs' => 'admin.landing.service.faqs.update',
            'sections' => 'admin.landing.sections.update',
        ];
    }

    protected function redirectRoute(Request $request): string
    {
        return $request->routeIs('settings.content.*')
            ? 'settings.content.edit'
            : 'admin.landing.edit';
    }

    private function isAssoc(array $array): bool
    {
        return array_keys($array) !== range(0, count($array) - 1);
    }
}
