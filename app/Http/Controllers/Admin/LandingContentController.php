<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LandingContentController extends Controller
{
    public function edit(): Response
    {
        $hero = $this->setting('landing.hero');
        $about = $this->setting('landing.about');
        $finalCta = $this->setting('landing.final_cta');
        $metrics = $this->setting('landing.metrics', []);

        return Inertia::render('admin/landing/Index', [
            'hero' => [
                ...$hero,
                'image_url' => $this->imageUrl($hero['image'] ?? null),
            ],
            'about' => [
                ...$about,
                'image_url' => $this->imageUrl($about['image'] ?? null),
            ],
            'finalCta' => $finalCta,
            'metrics' => $metrics,
        ]);
    }

    public function updateHero(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'heading' => ['nullable', 'string', 'max:255'],
            'subheading' => ['nullable', 'string'],
            'primary_label' => ['nullable', 'string', 'max:100'],
            'primary_link' => ['nullable', 'string', 'max:255'],
            'secondary_label' => ['nullable', 'string', 'max:100'],
            'secondary_link' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $hero = $this->setting('landing.hero');

        if ($request->hasFile('image')) {
            if (!empty($hero['image'])) {
                Storage::disk('public')->delete($hero['image']);
            }

            $path = $request->file('image')->store('landing', 'public');
            $data['image'] = $path;
        } else {
            $data['image'] = $hero['image'] ?? null;
        }

        $this->saveSetting('landing.hero', $data);

        return redirect()->route('admin.landing.edit')->with('success', 'Konten hero berhasil diperbarui.');
    }

    public function updateAbout(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'highlights' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $about = $this->setting('landing.about');

        if ($request->hasFile('image')) {
            if (!empty($about['image'])) {
                Storage::disk('public')->delete($about['image']);
            }

            $path = $request->file('image')->store('landing', 'public');
            $about['image'] = $path;
        }

        $about['title'] = $data['title'] ?? null;
        $about['description'] = $data['description'] ?? null;
        $about['highlights'] = collect(explode("\n", $data['highlights'] ?? ''))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();

        $this->saveSetting('landing.about', $about);

        return redirect()->route('admin.landing.edit')->with('success', 'Konten tentang perusahaan berhasil diperbarui.');
    }

    public function updateFinalCta(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'heading' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'button_label' => ['nullable', 'string', 'max:100'],
            'button_link' => ['nullable', 'string', 'max:255'],
        ]);

        $this->saveSetting('landing.final_cta', $data);

        return redirect()->route('admin.landing.edit')->with('success', 'Konten CTA berhasil diperbarui.');
    }

    public function updateMetrics(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'metrics' => ['nullable', 'string'],
        ]);

        $metrics = collect(explode("\n", $data['metrics'] ?? ''))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->map(function ($line) {
                [$value, $label] = array_pad(explode('|', $line, 2), 2, null);

                return [
                    'value' => trim((string) $value),
                    'label' => trim((string) ($label ?? '')), 
                ];
            })
            ->filter(fn ($metric) => $metric['value'] !== '')
            ->values()
            ->all();

        $this->saveSetting('landing.metrics', $metrics);

        return redirect()->route('admin.landing.edit')->with('success', 'Statistik landing berhasil diperbarui.');
    }

    private function setting(string $key, $default = [])
    {
        return CompanySetting::query()->where('key', $key)->value('value') ?? $default;
    }

    private function saveSetting(string $key, $value): void
    {
        CompanySetting::updateOrCreate(
            ['key' => $key],
            ['group' => 'landing', 'value' => $value]
        );
    }

    private function imageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->exists($path)
            ? Storage::disk('public')->url($path)
            : $path;
    }
}
