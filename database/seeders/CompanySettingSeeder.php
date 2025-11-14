<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class CompanySettingSeeder extends Seeder
{
    public function run(): void
    {
        CompanySetting::query()->truncate();

        $settings = [
            [
                'key' => 'company.name',
                'value' => 'Harmony Strategic Group',
                'group' => 'company',
            ],
            [
                'key' => 'company.tagline',
                'value' => 'Mitra strategis untuk pertumbuhan bisnis lintas industri.',
                'group' => 'company',
            ],
            [
                'key' => 'company.address',
                'value' => [
                    'line1' => 'Jl. Merdeka No. 123',
                    'city' => 'Jakarta Pusat',
                    'province' => 'DKI Jakarta',
                    'postal_code' => '10110',
                ],
                'group' => 'contact',
            ],
            [
                'key' => 'company.contacts',
                'value' => [
                    'phone' => '+62 21 555 8890',
                    'email' => 'hello@harmonygroup.id',
                    'whatsapp' => '+62 811 7788 990',
                    'map_label' => 'Lokasi Kantor',
                    'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200',
                ],
                'group' => 'contact',
            ],
            [
                'key' => 'company.socials',
                'value' => [
                    'linkedin' => 'https://www.linkedin.com/company/harmony-strategic-group',
                    'instagram' => 'https://www.instagram.com/harmonystrategic',
                ],
                'group' => 'contact',
            ],
        ];

        foreach ($settings as $setting) {
            CompanySetting::create($setting);
        }
    }
}
