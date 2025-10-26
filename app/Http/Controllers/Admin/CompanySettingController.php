<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class CompanySettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/settings/Index', [
            'settings' => CompanySetting::query()->orderBy('group')->orderBy('key')->get(),
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

    public function destroy(CompanySetting $setting): RedirectResponse
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil dihapus.');
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
