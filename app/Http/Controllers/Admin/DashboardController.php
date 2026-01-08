<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\JobPosition;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $metrics = [
            'services' => Service::query()->count(),
            'products' => Product::query()->count(),
            'projects' => Project::query()->count(),
            'testimonials' => Testimonial::query()->count(),
            'team_members' => TeamMember::query()->count(),
            'job_positions' => JobPosition::query()->where('is_active', true)->count(),
        ];

        $latestProducts = Product::query()->latest()->limit(5)->get(['id', 'name', 'created_at']);
        $latestProjects = Project::query()->latest('started_at')->limit(5)->get(['id', 'name', 'status']);
        $latestPosts = BlogPost::query()->latest('published_at')->limit(5)->get(['id', 'title', 'published_at']);

        // Fetch recent activities for activity feed
        $recentActivities = Activity::with('causer:id,name')
            ->latest()
            ->take(15)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'description' => $activity->description,
                    'causer_name' => $activity->causer?->name ?? 'System',
                    'subject_type' => class_basename($activity->subject_type ?? 'N/A'),
                    'subject_id' => $activity->subject_id,
                    'properties' => $activity->properties,
                    'created_at' => $activity->created_at->diffForHumans(),
                    'created_at_full' => $activity->created_at->format('d M Y, H:i'),
                ];
            });

        $activity = collect(range(0, 5))->map(function ($weeksAgo) {
            $start = Carbon::now()->subWeeks($weeksAgo + 1);
            $end = Carbon::now()->subWeeks($weeksAgo);

            return [
                'label' => $start->format('d M') . ' - ' . $end->format('d M'),
                'products' => Product::query()->whereBetween('created_at', [$start, $end])->count(),
                'projects' => Project::query()->whereBetween('created_at', [$start, $end])->count(),
            ];
        })->reverse()->values();

        $monthlyProducts = collect(range(0, 11))->map(function ($index) {
            $month = Carbon::now()->subMonths($index);
            return [
                'label' => $month->format('M Y'),
                'value' => Product::query()
                    ->whereYear('created_at', $month->year)
                    ->whereMonth('created_at', $month->month)
                    ->count(),
            ];
        })->reverse()->values();

        $monthlyServices = collect(range(0, 11))->map(function ($index) {
            $month = Carbon::now()->subMonths($index);
            return [
                'label' => $month->format('M Y'),
                'value' => Service::query()
                    ->whereYear('created_at', $month->year)
                    ->whereMonth('created_at', $month->month)
                    ->count(),
            ];
        })->reverse()->values();

        $monthlyProjects = collect(range(0, 11))->map(function ($index) {
            $month = Carbon::now()->subMonths($index);
            return [
                'label' => $month->format('M Y'),
                'value' => Project::query()
                    ->whereYear('created_at', $month->year)
                    ->whereMonth('created_at', $month->month)
                    ->count(),
            ];
        })->reverse()->values();

        return Inertia::render('dashboard', [
            'metrics' => $metrics,
            'latestProducts' => $latestProducts,
            'latestProjects' => $latestProjects,
            'latestPosts' => $latestPosts,
            'activity' => $activity,
            'monthlyProducts' => $monthlyProducts,
            'monthlyServices' => $monthlyServices,
            'monthlyProjects' => $monthlyProjects,
            'recentActivities' => $recentActivities,
        ]);
    }
}
