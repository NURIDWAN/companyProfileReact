<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();

        $applications = JobApplication::query()
            ->with('jobPosition:id,title,slug,department')
            ->when($status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $transformed = $applications->through(fn (JobApplication $application) => $this->transformApplication($application));

        return Inertia::render('admin/job-applications/Index', [
            'applications' => $transformed,
            'filters' => [
                'status' => $status,
            ],
            'availableStatuses' => $this->statusOptions(),
        ]);
    }

    public function show(JobApplication $jobApplication): Response
    {
        $jobApplication->load('jobPosition:id,title,department,location,employment_type,salary_range,slug');

        return Inertia::render('admin/job-applications/Show', [
            'application' => $this->transformApplication($jobApplication),
            'availableStatuses' => $this->statusOptions(),
        ]);
    }

    public function updateStatus(Request $request, JobApplication $jobApplication): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,reviewing,shortlisted,interview,offer,rejected'],
        ]);

        $jobApplication->update($validated);

        return back()->with('success', 'Status lamaran diperbarui.');
    }

    public function destroy(JobApplication $jobApplication): RedirectResponse
    {
        if ($jobApplication->resume_path) {
            Storage::disk('public')->delete($jobApplication->resume_path);
        }

        $jobApplication->delete();

        return redirect()->route('admin.job-applications.index')->with('success', 'Lamaran dihapus.');
    }

    public function downloadResume(JobApplication $jobApplication)
    {
        if (! $jobApplication->resume_path || ! Storage::disk('public')->exists($jobApplication->resume_path)) {
            abort(404);
        }

        return Storage::disk('public')->download($jobApplication->resume_path, 'Resume-'.$jobApplication->name.'.'.pathinfo($jobApplication->resume_path, PATHINFO_EXTENSION));
    }

    private function transformApplication(JobApplication $application): array
    {
        return [
            'id' => $application->id,
            'name' => $application->name,
            'email' => $application->email,
            'phone' => $application->phone,
            'linkedin_url' => $application->linkedin_url,
            'portfolio_url' => $application->portfolio_url,
            'cover_letter' => $application->cover_letter,
            'resume_url' => $application->resume_path ? Storage::disk('public')->url($application->resume_path) : null,
            'status' => $application->status,
            'created_at' => $application->created_at?->toIso8601String(),
            'job' => $application->jobPosition ? [
                'id' => $application->jobPosition->id,
                'title' => $application->jobPosition->title,
                'slug' => $application->jobPosition->slug,
                'department' => $application->jobPosition->department,
                'location' => $application->jobPosition->location,
                'employment_type' => $application->jobPosition->employment_type,
                'salary_range' => $application->jobPosition->salary_range,
            ] : null,
        ];
    }

    private function statusOptions(): array
    {
        return [
            ['value' => 'pending', 'label' => 'Pending Review'],
            ['value' => 'reviewing', 'label' => 'Sedang Ditinjau'],
            ['value' => 'shortlisted', 'label' => 'Shortlisted'],
            ['value' => 'interview', 'label' => 'Proses Interview'],
            ['value' => 'offer', 'label' => 'Ditawarkan'],
            ['value' => 'rejected', 'label' => 'Ditolak'],
        ];
    }
}
