<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/services/Index', [
            'services' => Service::query()->orderBy('display_order')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                Service::create($data);
            });

            return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat layanan', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan layanan.'])->withInput();
        }
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/Form', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $service) {
                $data = $this->validatedData($request, $service);
                $service->update($data);
            });

            return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui layanan', [
                'service_id' => $service->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui layanan.'])->withInput();
        }
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil dihapus.');
    }

    private function validatedData(Request $request, ?Service $service = null): array
    {
        $service = $service ?? $request->route('service');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('services', 'slug')->ignore($service?->id),
            ],
            'icon' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:255'],
            'is_active' => ['nullable'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
