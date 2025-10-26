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
                'value' => 'Nusantara Digital Solution',
                'group' => 'company',
            ],
            [
                'key' => 'company.tagline',
                'value' => 'Mendampingi transformasi digital sektor publik dan enterprise.',
                'group' => 'company',
            ],
            [
                'key' => 'company.address',
                'value' => [
                    'line1' => 'Jl. H. R. Rasuna Said Kav. 6',
                    'city' => 'Jakarta Selatan',
                    'province' => 'DKI Jakarta',
                    'postal_code' => '12940',
                ],
                'group' => 'contact',
            ],
            [
                'key' => 'company.contacts',
                'value' => [
                    'phone' => '+62 21 1234 5678',
                    'email' => 'halo@nusantaradigital.id',
                    'whatsapp' => '+62 811 1234 567',
                ],
                'group' => 'contact',
            ],
            [
                'key' => 'company.socials',
                'value' => [
                    'linkedin' => 'https://www.linkedin.com/company/nusantara-digital',
                    'instagram' => 'https://www.instagram.com/nusantaradigital.id',
                ],
                'group' => 'contact',
            ],
        ];

        foreach ($settings as $setting) {
            CompanySetting::create($setting);
        }
    }
}
