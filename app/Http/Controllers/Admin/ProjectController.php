<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/Index', [
            'projects' => Project::query()->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                Project::create($data);
            });

            return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat proyek', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan proyek.'])->withInput();
        }
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/Form', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $project) {
                $data = $this->validatedData($request, $project);
                $project->update($data);
            });

            return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui proyek', [
                'project_id' => $project->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui proyek.'])->withInput();
        }
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil dihapus.');
    }

    private function validatedData(Request $request, ?Project $project = null): array
    {
        $project = $project ?? $request->route('project');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')->ignore($project?->id),
            ],
            'client_name' => ['nullable', 'string', 'max:255'],
            'cover_image' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'started_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:started_at'],
            'status' => ['required', 'string', 'max:50'],
        ]);

        return $data;
    }
}
