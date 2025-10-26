<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobPosition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class JobPositionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/job-positions/Index', [
            'positions' => JobPosition::query()->latest('posted_at')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/job-positions/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                JobPosition::create($data);
            });

            return redirect()->route('admin.job-positions.index')->with('success', 'Lowongan berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat lowongan', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan lowongan.'])->withInput();
        }
    }

    public function edit(JobPosition $jobPosition): Response
    {
        return Inertia::render('admin/job-positions/Form', [
            'position' => $jobPosition,
        ]);
    }

    public function update(Request $request, JobPosition $jobPosition): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $jobPosition) {
                $data = $this->validatedData($request, $jobPosition);
                $jobPosition->update($data);
            });

            return redirect()->route('admin.job-positions.index')->with('success', 'Lowongan berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui lowongan', [
                'job_position_id' => $jobPosition->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui lowongan.'])->withInput();
        }
    }

    public function destroy(JobPosition $jobPosition): RedirectResponse
    {
        $jobPosition->delete();

        return redirect()->route('admin.job-positions.index')->with('success', 'Lowongan berhasil dihapus.');
    }

    private function validatedData(Request $request, ?JobPosition $position = null): array
    {
        $position = $position ?? $request->route('job_position');

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('job_positions', 'slug')->ignore($position?->id),
            ],
            'department' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'max:50'],
            'salary_range' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'posted_at' => ['nullable', 'date'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
