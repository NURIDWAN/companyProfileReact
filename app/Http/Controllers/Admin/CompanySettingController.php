<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CompanySettingController extends Controller
{
    public function index(): Response
    {
        $settings = $this->loadSettings();

        $logoImage = data_get($settings, 'company.logo_image');
        $company = [
            'name' => data_get($settings, 'company.name', ''),
            'tagline' => data_get($settings, 'company.tagline', ''),
            'logo_icon' => data_get($settings, 'company.logo_icon', ''),
            'logo_image' => $logoImage ?? '',
            'logo_url' => $this->resolveImageUrl($logoImage),
        ];

        $address = array_merge(
            [
                'line1' => '',
                'city' => '',
                'province' => '',
                'postal_code' => '',
            ],
            data_get($settings, 'company.address', []) ?? [],
        );

        $contacts = array_merge(
            [
                'phone' => '',
                'email' => '',
                'whatsapp' => '',
                'map_label' => 'Lokasi',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200',
            ],
            data_get($settings, 'company.contacts', []) ?? [],
        );

        $socials = array_merge(
            [
                'linkedin' => '',
                'instagram' => '',
                'youtube' => '',
                'website' => '',
            ],
            data_get($settings, 'company.socials', []) ?? [],
        );

        $footerStored = data_get($settings, 'footer.content', []) ?? [];
        $footerCta = [
            'label' => data_get($footerStored, 'cta.label', ''),
            'href' => data_get($footerStored, 'cta.href', ''),
        ];

        $footerLegal = [
            'privacy' => data_get($footerStored, 'legal.privacy', ''),
            'terms' => data_get($footerStored, 'legal.terms', ''),
        ];

        $securityOtp = (array) ($settings['security.otp'] ?? []);
        $security = [
            'otp' => [
                'enabled' => (bool) ($securityOtp['enabled'] ?? false),
                'expires_minutes' => (int) ($securityOtp['expires_minutes'] ?? 10),
                'resend_cooldown' => (int) ($securityOtp['resend_cooldown'] ?? 60),
            ],
        ];

        return Inertia::render('admin/settings/Index', [
            'company' => $company,
            'address' => $address,
            'contacts' => $contacts,
            'socials' => $socials,
            'footerCta' => $footerCta,
            'footerLegal' => $footerLegal,
            'security' => $security,
        ]);
    }


    public function updateSecurity(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'otp_enabled' => ['nullable', 'boolean'],
            'otp_expires_minutes' => ['nullable', 'integer', 'between:1,60'],
            'otp_resend_cooldown' => ['nullable', 'integer', 'between:15,600'],
        ]);

        $config = [
            'enabled' => (bool) ($data['otp_enabled'] ?? false),
            'expires_minutes' => (int) ($data['otp_expires_minutes'] ?? 10),
            'resend_cooldown' => (int) ($data['otp_resend_cooldown'] ?? 60),
        ];

        $this->saveSetting('security.otp', $config, 'security');

        return back()->with('success', 'Pengaturan keamanan berhasil diperbarui.');
    }

    public function downloadBackup(): StreamedResponse
    {
        $rows = DB::table('company_settings')->orderBy('id')->get();
        $generatedAt = now();
        $filename = 'company_settings_backup_' . $generatedAt->format('Y_m_d_His') . '.sql';

        $quote = static function ($value): string {
            if ($value === null) {
                return 'NULL';
            }

            return "'" . str_replace("'", "''", (string) $value) . "'";
        };

        return response()->streamDownload(function () use ($rows, $generatedAt, $quote): void {
            echo '-- Backup of company_settings generated at ' . $generatedAt->toDateTimeString() . PHP_EOL;
            echo 'SET FOREIGN_KEY_CHECKS=0;' . PHP_EOL . PHP_EOL;
            echo 'TRUNCATE TABLE `company_settings`;' . PHP_EOL . PHP_EOL;

            foreach ($rows as $row) {
                $id = (int) $row->id;
                $key = $quote($row->key);
                $value = $quote($row->value);
                $group = $quote($row->group);
                $createdAt = $quote($row->created_at);
                $updatedAt = $quote($row->updated_at);

                $insert = sprintf(
                    'INSERT INTO `company_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES (%d, %s, %s, %s, %s, %s);',
                    $id,
                    $key,
                    $value,
                    $group,
                    $createdAt,
                    $updatedAt
                );

                echo $insert . PHP_EOL;
            }

            echo PHP_EOL . 'SET FOREIGN_KEY_CHECKS=1;' . PHP_EOL;
        }, $filename, [
            'Content-Type' => 'application/sql; charset=UTF-8',
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('admin/settings/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                CompanySetting::create($data);
            });

            return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat setting', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan setting.'])->withInput();
        }
    }

    public function edit(CompanySetting $setting): Response
    {
        return Inertia::render('admin/settings/Form', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request, CompanySetting $setting): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $setting) {
                $data = $this->validatedData($request, $setting);
                $setting->update($data);
            });

            return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui setting', [
                'setting_id' => $setting->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui setting.'])->withInput();
        }
    }

    public function updateCompany(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'logo_icon' => ['nullable', 'string', 'max:60'],
            'logo_image' => ['nullable', 'string', 'max:500'],
            'logo_image_file' => ['nullable', 'image', 'max:4096'],
        ]);

        $logoPath = CompanySetting::query()->where('key', 'company.logo_image')->value('value');

        if ($file = $request->file('logo_image_file')) {
            if ($logoPath && Str::startsWith($logoPath, 'branding/')) {
                Storage::disk('public')->delete($logoPath);
            }

            $logoPath = $file->store('branding', 'public');
        } elseif (($data['logo_image'] ?? null) === '') {
            if ($logoPath && Str::startsWith($logoPath, 'branding/')) {
                Storage::disk('public')->delete($logoPath);
            }

            $logoPath = null;
        } else {
            $logoPath = $data['logo_image'] ?? $logoPath;
        }

        DB::transaction(function () use ($data, $logoPath) {
            $this->saveSetting('company.name', $data['name'], 'company');
            $this->saveSetting('company.tagline', $data['tagline'], 'company');
            $this->saveSetting('company.logo_icon', $data['logo_icon'] ?? null, 'company');
            $this->saveSetting('company.logo_image', $logoPath, 'company');

            $this->updateFooterContent(function (array $footer) use ($data) {
                $footer['company'] = [
                    'name' => $data['name'],
                    'description' => $data['tagline'] ?? null,
                ];

                return $footer;
            });
        });

        return redirect()->route('admin.settings.index')->with('success', 'Profil perusahaan berhasil diperbarui.');
    }

    public function updateAddress(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'line1' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:120'],
            'province' => ['required', 'string', 'max:120'],
            'postal_code' => ['nullable', 'string', 'max:30'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.address', $data, 'contact');
        });

        return redirect()->route('admin.settings.index')->with('success', 'Alamat perusahaan berhasil diperbarui.');
    }

    public function updateContacts(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'phone' => ['nullable', 'string', 'max:60'],
            'email' => ['nullable', 'email', 'max:120'],
            'whatsapp' => ['nullable', 'string', 'max:60'],
            'map_label' => ['nullable', 'string', 'max:120'],
            'map_embed_url' => ['nullable', 'string', 'max:2048'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.contacts', $data, 'contact');

            $this->updateFooterContent(function (array $footer) use ($data) {
                $existingAddress = data_get($footer, 'contacts.address');

                $footer['contacts'] = array_filter([
                    'phone' => $data['phone'] ?? null,
                    'email' => $data['email'] ?? null,
                    'whatsapp' => $data['whatsapp'] ?? null,
                    'address' => $existingAddress,
                ], fn($value) => $value !== null && $value !== '');

                return $footer;
            });
        });

        return redirect()->route('admin.settings.index')->with('success', 'Kontak perusahaan berhasil diperbarui.');
    }

    public function updateSocials(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'linkedin' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'url', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.socials', array_filter($data), 'contact');
        });

        return redirect()->route('admin.settings.index')->with('success', 'Sosial media perusahaan berhasil diperbarui.');
    }

    public function updateFooterCta(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:120'],
            'href' => ['required', 'string', 'max:255'],
        ]);

        $this->updateFooterContent(function (array $footer) use ($data) {
            $footer['cta'] = $data;
            return $footer;
        });

        return redirect()->route('admin.settings.index')->with('success', 'CTA footer berhasil diperbarui.');
    }

    public function updateFooterLegal(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'privacy' => ['nullable', 'string', 'max:255'],
            'terms' => ['nullable', 'string', 'max:255'],
        ]);

        $this->updateFooterContent(function (array $footer) use ($data) {
            $footer['legal'] = array_filter($data, fn($value) => $value !== null && $value !== '');
            return $footer;
        });

        return redirect()->route('admin.settings.index')->with('success', 'Tautan legal footer berhasil diperbarui.');
    }

    public function destroy(CompanySetting $setting): RedirectResponse
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil dihapus.');
    }

    protected function saveSetting(string $key, $value, string $group): void
    {
        CompanySetting::updateOrCreate(
            ['key' => $key],
            [
                'group' => $group,
                'value' => $value,
            ],
        );
    }

    protected function updateFooterContent(callable $callback): void
    {
        $stored = CompanySetting::query()->where('key', 'footer.content')->value('value') ?? [];
        $updated = $callback($stored);

        $this->saveSetting('footer.content', $updated, 'landing');
    }

    private function loadSettings(): array
    {
        $settings = [];

        CompanySetting::query()
            ->get(['key', 'value'])
            ->each(function (CompanySetting $setting) use (&$settings) {
                $raw = $setting->getRawOriginal('value');

                if ($raw === null) {
                    Arr::set($settings, $setting->key, null);

                    return;
                }

                $decoded = json_decode($raw, true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    Arr::set($settings, $setting->key, $decoded);

                    return;
                }

                Arr::set($settings, $setting->key, $raw);
            });

        return $settings;
    }

    protected function resolveImageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        return $path;
    }

    private function validatedData(Request $request, ?CompanySetting $setting = null): array
    {
        return $request->validate([
            'key' => [
                'required',
                'string',
                'max:255',
                Rule::unique('company_settings', 'key')->ignore($setting?->id),
            ],
            'value' => ['nullable'],
            'group' => ['nullable', 'string', 'max:255'],
        ]);
    }
}
