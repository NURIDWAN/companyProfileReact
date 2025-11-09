<?php

namespace App\Http\Middleware;

use App\Models\CompanySetting;
use Closure;
use Illuminate\Http\Request;

class EnsureLandingPageEnabled
{
    public function handle(Request $request, Closure $next, string $pageKey = 'home')
    {
        if (! $this->isPageActive($pageKey)) {
            abort(404);
        }

        return $next($request);
    }

    private function isPageActive(string $pageKey): bool
    {
        $configuration = collect(config('landing.navigation', []));
        $state = collect(
            CompanySetting::query()->where('key', 'navigation.primary')->value('value') ?? []
        );

        $hasCustomState = $state->isNotEmpty();
        $default = $configuration->firstWhere('key', $pageKey);

        if (! $hasCustomState) {
            return (bool) ($default['default_active'] ?? true);
        }

        $pageState = $state->firstWhere('key', $pageKey);

        return (bool) ($pageState['active'] ?? false);
    }
}
