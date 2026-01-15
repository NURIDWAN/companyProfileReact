<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PageRequest;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\PageSection;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::query()
            ->with('parent:id,title')
            ->orderBy('parent_id')
            ->orderBy('display_order')
            ->orderBy('title')
            ->paginate(15);

        return Inertia::render('admin/pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/pages/Form', [
            'parents' => $this->parentOptions(),
            'menuItems' => $this->menuItemOptions(),
        ]);
    }

    public function store(PageRequest $request): RedirectResponse
    {
        try {
            $page = null;
            DB::transaction(function () use ($request, &$page) {
                $data = $this->payload($request);
                $data['created_by'] = $request->user()?->id;
                $data['updated_by'] = $request->user()?->id;

                $page = Page::create($data);
                $this->syncSections($page, $request->input('sections', []));

                // Auto-create menu item if requested
                if ($request->boolean('add_to_menu') && $request->filled('menu_position')) {
                    $this->createMenuItem($page, $request->input('menu_position'), $request->input('menu_parent_id'));
                }
            });

            return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal menyimpan halaman', ['message' => $e->getMessage()]);

            return back()
                ->withErrors(['general' => 'Gagal menyimpan halaman. Silakan coba lagi.'])
                ->withInput();
        }
    }

    public function edit(Page $page): Response
    {
        return Inertia::render('admin/pages/Form', [
            'page' => $page->load('sections'),
            'parents' => $this->parentOptions($page->id),
        ]);
    }

    public function update(PageRequest $request, Page $page): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $page) {
                $data = $this->payload($request, $page);
                $data['updated_by'] = $request->user()?->id;

                $page->update($data);
                $this->syncSections($page, $request->input('sections', []));
            });

            return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui halaman', [
                'page_id' => $page->id,
                'message' => $e->getMessage(),
            ]);

            return back()
                ->withErrors(['general' => 'Gagal memperbarui halaman.'])
                ->withInput();
        }
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dihapus.');
    }

    private function payload(PageRequest $request, ?Page $page = null): array
    {
        $validated = $request->validated();

        $isPublished = $request->boolean('is_published') || ($validated['status'] ?? null) === 'published';

        $metaKeywords = $validated['meta_keywords'] ?? '';
        $keywordsArray = collect(preg_split('/[,;\\r?\\n]+/', (string) $metaKeywords))
            ->map(fn ($keyword) => trim($keyword))
            ->filter()
            ->values()
            ->all();

        $slug = $validated['slug'] ?? null;

        $data = [
            'parent_id' => $validated['parent_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $slug && trim($slug) !== '' ? Str::slug($slug) : Str::slug($validated['title']),
            'body' => $validated['body'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $keywordsArray,
            'display_order' => $validated['display_order'] ?? 0,
        ];

        if ($isPublished) {
            $data['status'] = 'published';
            $data['published_at'] = isset($validated['published_at'])
                ? Carbon::parse($validated['published_at'])
                : ($page?->published_at ?? now());
        } else {
            $data['status'] = 'draft';
            $data['published_at'] = null;
        }

        return $data;
    }

    private function syncSections(Page $page, array $sections): void
    {
        $ids = [];
        foreach ($sections as $order => $section) {
            if (!isset($section['title']) || trim((string) $section['title']) === '') {
                continue;
            }

            $sectionId = $section['id'] ?? null;
            $slug = isset($section['slug']) && trim((string) $section['slug']) !== ''
                ? Str::slug($section['slug'])
                : Str::slug($section['title']);

            $payload = [
                'title' => $section['title'],
                'slug' => $slug,
                'content' => $section['content'] ?? null,
                'display_order' => $section['display_order'] ?? $order,
                'is_active' => isset($section['is_active']) ? (bool) $section['is_active'] : true,
            ];

            if ($sectionId) {
                $existing = $page->sections()->where('id', $sectionId)->first();
                if ($existing) {
                    $existing->update($payload);
                    $ids[] = $existing->id;
                    continue;
                }
            }

            $new = $page->sections()->create($payload);
            $ids[] = $new->id;
        }

        if (count($ids)) {
            $page->sections()->whereNotIn('id', $ids)->delete();
        } else {
            $page->sections()->delete();
        }
    }

    private function parentOptions(?int $excludeId = null): Collection
    {
        return Page::query()
            ->select('id', 'title')
            ->when($excludeId, fn ($query) => $query->where('id', '!=', $excludeId))
            ->orderBy('title')
            ->get();
    }

    /**
     * Get menu items grouped by position for parent selection.
     */
    private function menuItemOptions(): array
    {
        $positions = ['main', 'header', 'footer'];

        return collect($positions)->mapWithKeys(function ($position) {
            $items = MenuItem::where('position', $position)
                ->whereNull('parent_id')
                ->orderBy('display_order')
                ->get(['id', 'title']);

            return [$position => $items];
        })->toArray();
    }

    /**
     * Create a menu item for the given page.
     */
    private function createMenuItem(Page $page, string $position, ?int $parentId = null): void
    {
        // Get max display_order for the position
        $maxOrder = MenuItem::where('position', $position)
            ->where('parent_id', $parentId)
            ->max('display_order') ?? -1;

        MenuItem::create([
            'title' => $page->title,
            'position' => $position,
            'type' => 'page',
            'page_id' => $page->id,
            'target' => '/' . ltrim($page->full_path, '/'),
            'parent_id' => $parentId,
            'display_order' => $maxOrder + 1,
            'is_active' => true,
        ]);
    }
}
