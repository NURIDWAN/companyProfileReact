<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('manage-users', function (User $user): bool {
            return $user->hasPermission('manage-users');
        });

        Gate::define('manage-content', function (User $user): bool {
            return $user->hasPermission('manage-content');
        });

        Gate::define('view-analytics', function (User $user): bool {
            return $user->hasPermission('view-analytics');
        });
    }
}
