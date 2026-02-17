<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Landing\JobApplicationRequest;
use App\Models\JobApplication;
use App\Models\JobPosition;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CareerApplicationController extends Controller
{
    public function create(JobPosition $jobPosition): Response
    {
        return Inertia::render('landingPage/CareerApply', [
            'position' => [
                'id' => $jobPosition->id,
                'title' => $jobPosition->title,
                'slug' => $jobPosition->slug,
                'department' => $jobPosition->department,
                'location' => $jobPosition->location,
                'employment_type' => $jobPosition->employment_type,
                'salary_range' => $jobPosition->salary_range,
            ],
        ]);
    }

    public function store(JobApplicationRequest $request, JobPosition $jobPosition): RedirectResponse
    {
        $data = $request->validated();
        unset($data['recaptcha_token']);

        if ($request->hasFile('resume')) {
            $path = $request->file('resume')->store('applications', 'public');
            $data['resume_path'] = $path;
        }

        unset($data['resume']);

        $data['job_position_id'] = $jobPosition->id;

        JobApplication::create($data);

        return redirect()
            ->route('career.show', $jobPosition->slug)
            ->with('success', 'Lamaran Anda telah diterima. Tim kami akan menghubungi melalui email.');
    }
}
