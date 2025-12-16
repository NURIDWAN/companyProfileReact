<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function show(string $slug): Response
    {
        $page = Page::query()
            ->published()
            ->whereNull('parent_id')
            ->where('slug', $slug)
            ->with(['sections' => function ($q) {
                $q->where('is_active', true)->orderBy('display_order');
            }])
            ->first();

        if (!$page) {
            throw new ModelNotFoundException();
        }

        return Inertia::render('landingPage/StaticPage', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'body' => $page->body,
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
