<?php

namespace App\Http\Middleware;

use App\Models\CompanySetting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'language' => $this->languageMeta($request),
            'navigation' => $this->navigation(),
            'footer' => $this->footerContent(),
        ];
    }

    protected function languageMeta(Request $request): array
    {
        $available = config('landing.languages', []);
        $fallback = config('landing.default_language', config('app.locale'));
        $current = $request->session()->get('app_language', $fallback);

        if (!collect($available)->contains(fn ($lang) => $lang['code'] === $current)) {
            $current = $fallback;
        }

        return [
            'current' => $current,
            'available' => $available,
            'fallback' => $fallback,
        ];
    }

    protected function navigation(): array
    {
        $defaults = collect(config('landing.navigation', []));
        $state = collect(
            CompanySetting::query()->where('key', 'navigation.primary')->value('value') ?? []
        );

        return [
            'primary' => $defaults
                ->map(function (array $item) use ($state) {
                    $stateItem = $state->firstWhere('key', $item['key']) ?? [];

                    return [
                        'key' => $item['key'],
                        'href' => $item['href'],
                        'labels' => $item['labels'] ?? [],
                        'order' => $stateItem['order'] ?? $item['default_order'] ?? 0,
                        'active' => $stateItem['active'] ?? $item['default_active'] ?? true,
                    ];
                })
                ->filter(fn ($item) => $item['active'])
                ->sortBy('order')
                ->values()
                ->all(),
        ];
    }

    protected function footerContent(): array
    {
        $defaults = config('landing.footer', []);
        $stored = CompanySetting::query()->where('key', 'footer.content')->value('value') ?? [];

        return array_replace_recursive($defaults, $stored);
    }
}
