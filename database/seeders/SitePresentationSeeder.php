<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class SitePresentationSeeder extends Seeder
{
    public function run(): void
    {
        $navigationDefaults = collect(config('landing.navigation', []))
            ->map(fn (array $item) => [
                'key' => $item['key'],
                'order' => $item['default_order'] ?? 0,
                'active' => $item['default_active'] ?? true,
            ])->values()->all();

        CompanySetting::updateOrCreate(
            ['key' => 'navigation.primary'],
            ['group' => 'navigation', 'value' => $navigationDefaults]
        );

        CompanySetting::updateOrCreate(
            ['key' => 'footer.content'],
            ['group' => 'footer', 'value' => config('landing.footer')]
        );

        CompanySetting::updateOrCreate(
            ['key' => 'seo.pages'],
            ['group' => 'seo', 'value' => config('landing.seo')]
        );
    }
}
