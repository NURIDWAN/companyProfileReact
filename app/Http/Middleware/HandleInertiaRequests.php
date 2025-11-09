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
            'navigation' => $this->navigation(),
            'footer' => $this->footerContent(),
            'branding' => $this->branding(),
            'companyAddress' => $this->companyAddress(),
            'companyContacts' => $this->companyContacts(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }

    protected function navigation(): array
    {
        $defaults = collect(config('landing.navigation', []));
        $state = collect(
            CompanySetting::query()->where('key', 'navigation.primary')->value('value') ?? []
        );
        $hasCustomState = $state->isNotEmpty();

        return [
            'primary' => $defaults
                ->map(function (array $item) use ($state, $hasCustomState) {
                    $stateItem = $state->firstWhere('key', $item['key']) ?? [];

                    return [
                        'key' => $item['key'],
                        'href' => $item['href'],
                        'labels' => $item['labels'] ?? [],
                        'order' => $stateItem['order'] ?? $item['default_order'] ?? 0,
                        'active' => $hasCustomState
                            ? ($stateItem['active'] ?? false)
                            : ($stateItem['active'] ?? $item['default_active'] ?? true),
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

    protected function branding(): array
    {
        $name = $this->resolveScalarSetting('company.name', config('app.name'));
        $tagline = $this->resolveScalarSetting('company.tagline');

        return array_filter([
            'name' => $name,
            'tagline' => $tagline,
        ], fn ($value) => $value !== null && $value !== '');
    }

    protected function companyAddress(): array
    {
        $address = CompanySetting::query()->where('key', 'company.address')->value('value') ?? [];

        return array_merge([
            'line1' => null,
            'city' => null,
            'province' => null,
            'postal_code' => null,
        ], is_array($address) ? $address : []);
    }

    protected function companyContacts(): array
    {
        $contacts = CompanySetting::query()->where('key', 'company.contacts')->value('value') ?? [];

        return array_merge([
            'phone' => null,
            'email' => null,
            'whatsapp' => null,
        ], is_array($contacts) ? $contacts : []);
    }

    protected function resolveScalarSetting(string $key, $default = null)
    {
        $setting = CompanySetting::query()->where('key', $key)->first();

        if (! $setting) {
            return $default;
        }

        $value = $setting->value;

        if (is_string($value)) {
            return trim($value) !== '' ? $value : $default;
        }

        if (is_array($value)) {
            foreach ($value as $candidate) {
                if (is_string($candidate) && trim($candidate) !== '') {
                    return $candidate;
                }
            }
        }

        return $default;
    }
}
