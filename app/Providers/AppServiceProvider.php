<?php

namespace App\Providers;

use App\Listeners\LogFailedLogin;
use App\Listeners\LogSuccessfulLogin;
use App\Listeners\LogSuccessfulLogout;
use App\Models\CompanySetting;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $locale = session('app_language', config('landing.default_language', config('app.locale')));
        app()->setLocale($locale);

        // Register activity log event listeners
        Event::listen(Login::class, LogSuccessfulLogin::class);
        Event::listen(Logout::class, LogSuccessfulLogout::class);
        Event::listen(Failed::class, LogFailedLogin::class);

        // Share favicon data with all views
        View::composer('app', function ($view) {
            $favicon = $this->loadFaviconSettings();
            $view->with('favicon', $favicon);
        });
    }

    /**
     * Load favicon settings from database.
     */
    private function loadFaviconSettings(): array
    {
        try {
            $settings = CompanySetting::query()
                ->whereIn('key', [
                    'branding.favicon_ico',
                    'branding.favicon_svg',
                    'branding.apple_touch_icon',
                ])
                ->pluck('value', 'key')
                ->toArray();

            $resolveUrl = function (?string $path): ?string {
                if (! $path) {
                    return null;
                }
                if (Storage::disk('public')->exists($path)) {
                    return Storage::disk('public')->url($path);
                }

                return null;
            };

            return [
                'ico' => $resolveUrl($settings['branding.favicon_ico'] ?? null),
                'svg' => $resolveUrl($settings['branding.favicon_svg'] ?? null),
                'apple' => $resolveUrl($settings['branding.apple_touch_icon'] ?? null),
            ];
        } catch (\Throwable) {
            // Database might not be available during initial setup
            return ['ico' => null, 'svg' => null, 'apple' => null];
        }
    }
}
