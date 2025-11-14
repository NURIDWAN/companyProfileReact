<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/testimonials/Index', [
            'testimonials' => Testimonial::query()->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/testimonials/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                Testimonial::create($data);
            });

            return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dibuat.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal membuat testimoni', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan testimoni.'])->withInput();
        }
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/testimonials/Form', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $testimonial) {
                $data = $this->validatedData($request);
                $testimonial->update($data);
            });

            return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil diperbarui.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui testimoni', [
                'testimonial_id' => $testimonial->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui testimoni.'])->withInput();
        }
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dihapus.');
    }

    private function validatedData(Request $request): array
    {
        $testimonial = $request->route('testimonial');

        $data = $request->validate([
            'author_name' => ['required', 'string', 'max:255'],
            'author_role' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:255'],
            'avatar_file' => ['nullable', 'image', 'max:2048'],
            'quote' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'between:1,5'],
            'is_active' => ['nullable'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        if ($file = $request->file('avatar_file')) {
            if ($testimonial && $testimonial->avatar && Str::startsWith($testimonial->avatar, 'testimonials/')) {
                Storage::disk('public')->delete($testimonial->avatar);
            }

            $data['avatar'] = $file->store('testimonials', 'public');
        } else {
            if (($data['avatar'] ?? null) === '') {
                if ($testimonial && $testimonial->avatar && Str::startsWith($testimonial->avatar, 'testimonials/')) {
                    Storage::disk('public')->delete($testimonial->avatar);
                }

                $data['avatar'] = null;
            } else {
                $data['avatar'] = $data['avatar'] ?? ($testimonial?->avatar ?? null);
            }
        }

        unset($data['avatar_file']);

        return $data;
    }
}
