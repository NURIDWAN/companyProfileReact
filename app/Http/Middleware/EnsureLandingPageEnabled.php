<?php

namespace App\Http\Middleware;

use App\Models\MenuItem;
use Closure;
use Illuminate\Http\Request;

/**
 * Middleware untuk mengontrol akses ke halaman landing page bawaan.
 *
 * Mengecek apakah halaman aktif berdasarkan status menu_items di database.
 * Jika menu item dengan target yang sesuai di-set is_active = false,
 * maka halaman akan mengembalikan 404 Not Found.
 */
class EnsureLandingPageEnabled
{
    /**
     * Mapping antara page key dan target URL yang sesuai di menu_items.
     */
    protected array $pageTargets = [
        'home' => '/',
        'about' => '/about',
        'service' => '/service',
        'product' => '/product',
        'project' => '/project',
        'career' => '/career',
        'blog' => '/blog',
        'contact' => '/contact',
    ];

    public function handle(Request $request, Closure $next, string $pageKey = 'home')
    {
        if (! $this->isPageActive($pageKey)) {
            abort(404);
        }

        return $next($request);
    }

    /**
     * Cek apakah halaman aktif berdasarkan status di menu_items.
     *
     * Logika:
     * 1. Cari menu item dengan target yang sesuai dengan halaman
     * 2. Jika ditemukan, gunakan status is_active dari menu item tersebut
     * 3. Jika tidak ditemukan menu item sama sekali, fallback ke config default_active
     */
    private function isPageActive(string $pageKey): bool
    {
        $target = $this->pageTargets[$pageKey] ?? null;

        if (! $target) {
            // Page key tidak dikenal, anggap aktif
            return true;
        }

        // Cek apakah ada menu item di database
        $hasAnyMenuItems = MenuItem::query()
            ->where('position', 'main')
            ->whereNull('parent_id')
            ->exists();

        if (! $hasAnyMenuItems) {
            // Tidak ada menu item sama sekali, gunakan config default
            $configuration = collect(config('landing.navigation', []));
            $pageConfig = $configuration->firstWhere('key', $pageKey);

            return (bool) ($pageConfig['default_active'] ?? true);
        }

        // Cari menu item yang memiliki target sesuai dengan halaman ini
        // Mencari exact match atau match dengan anchor (untuk /path#section)
        $menuItem = MenuItem::query()
            ->where('position', 'main')
            ->whereNull('parent_id') // Hanya menu level teratas
            ->where(function ($query) use ($target) {
                $query->where('target', $target)
                    ->orWhere('target', 'LIKE', $target.'#%');
            })
            ->first();

        if ($menuItem) {
            // Menu item ditemukan, gunakan statusnya
            return (bool) $menuItem->is_active;
        }

        // Menu item untuk halaman ini tidak ada di database
        // Ini berarti halaman tidak ditambahkan ke menu, anggap tidak aktif
        // Kecuali untuk halaman home yang selalu harus bisa diakses jika tidak ada menu itemnya
        if ($pageKey === 'home') {
            return true;
        }

        // Untuk halaman lain yang tidak ada di menu, cek apakah ada config
        $configuration = collect(config('landing.navigation', []));
        $pageConfig = $configuration->firstWhere('key', $pageKey);

        return (bool) ($pageConfig['default_active'] ?? true);
    }
}
