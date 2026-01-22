<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Show a page by its path (supports nested paths like "tentang-kami/profil").
     */
    public function show(string $path): Response
    {
        $slugs = explode('/', $path);
        $page = null;
        $parentId = null;

        Log::debug('PageController: Attempting to load page', ['path' => $path, 'slugs' => $slugs]);

        // Traverse the path segments to find the target page
        foreach ($slugs as $slug) {
            // Normalize slug to lowercase for case-insensitive matching
            $normalizedSlug = strtolower(trim($slug));
            
            $page = Page::query()
                ->published()
                ->where('parent_id', $parentId)
                ->whereRaw('LOWER(slug) = ?', [$normalizedSlug])
                ->first();

            if (!$page) {
                Log::warning('PageController: Page not found', [
                    'slug' => $slug,
                    'normalized_slug' => $normalizedSlug,
                    'parent_id' => $parentId,
                    'full_path' => $path,
                ]);
                abort(404);
            }

            $parentId = $page->id;
        }

        // Load sections for the final page
        $page->load([
            'sections' => function ($q) {
                $q->where('is_active', true)->orderBy('display_order');
            }
        ]);

        Log::debug('PageController: Page loaded successfully', ['page_id' => $page->id, 'title' => $page->title]);

        return Inertia::render('landingPage/StaticPage', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'full_path' => $page->full_path,
                'meta_keywords' => $page->meta_keywords,
                'sections' => $page->sections->map(function ($section) {
                    return [
                        'id' => $section->id,
                        'title' => $section->title,
                        'slug' => $section->slug,
                        'content' => $section->content,
                        'display_order' => $section->display_order,
                    ];
                })->values(),
            ],
            'seo' => [
                'title' => $page->meta_title ?: $page->title,
                'description' => $page->meta_description,
                'keywords' => $page->meta_keywords,
            ],
        ]);
    }
}
