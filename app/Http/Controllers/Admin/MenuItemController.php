<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MenuItemRequest;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class MenuItemController extends Controller
{
    public function index(): Response
    {
        $positions = ['main', 'header', 'footer'];

        $menusByPosition = collect($positions)->mapWithKeys(function ($position) {
            $items = MenuItem::query()
                ->where('position', $position)
                ->with([
                    'page' => function ($query) {
                        $query->select('id', 'title', 'slug')
                            ->with([
                                'sections' => function ($sectionQuery) {
                                    $sectionQuery->select('id', 'page_id', 'title', 'slug', 'content', 'display_order', 'is_active')
                                        ->orderBy('display_order')
                                        ->orderBy('title');
                                }
                            ]);
                    }
                ])
                ->orderBy('parent_id')
                ->orderBy('display_order')
                ->orderBy('title')
                ->get();

            return [
                $position => $items->map(function (MenuItem $item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'position' => $item->position,
                        'type' => $item->type,
                        'page_id' => $item->page_id,
                        'target' => $item->target,
                        'parent_id' => $item->parent_id,
                        'display_order' => $item->display_order,
                        'is_active' => $item->is_active,
                        'page' => $item->page ? [
                            'id' => $item->page->id,
                            'title' => $item->page->title,
                            'slug' => $item->page->slug,
                            'full_path' => $item->page->full_path,
                            'sections' => $item->page->sections?->map(function (PageSection $section) {
                                return [
                                    'id' => $section->id,
                                    'title' => $section->title,
                                    'slug' => $section->slug,
                                    'content' => $section->content,
                                    'display_order' => $section->display_order,
                                    'is_active' => $section->is_active,
                                ];
                            })->values(),
                        ] : null,
                    ];
                })->values(),
            ];
        })->toArray();

        return Inertia::render('admin/menus/Index', [
            'menus' => $menusByPosition,
            'pages' => Page::query()
                ->select('id', 'title', 'slug', 'parent_id')
                ->withCount([
                    'sections as sections_count' => function ($q) {
                        $q->where('is_active', true);
                    }
                ])
                ->with([
                    'sections' => function ($sectionQuery) {
                        $sectionQuery->select('id', 'page_id', 'title', 'slug', 'content', 'display_order', 'is_active')
                            ->orderBy('display_order')
                            ->orderBy('title');
                    }
                ])
                ->orderBy('title')
                ->get()
                ->map(function (Page $page) {
                    return [
                        'id' => $page->id,
                        'title' => $page->title,
                        'slug' => $page->slug,
                        'parent_id' => $page->parent_id,
                        'full_path' => $page->full_path,
                        'has_content' => ($page->sections_count ?? 0) > 0,
                        'sections' => $page->sections?->map(function (PageSection $section) {
                            return [
                                'id' => $section->id,
                                'title' => $section->title,
                                'slug' => $section->slug,
                                'content' => $section->content,
                                'display_order' => $section->display_order,
                                'is_active' => $section->is_active,
                            ];
                        })->values(),
                    ];
                }),
            'categories' => \App\Models\Category::query()
                ->select('id', 'name', 'slug')
                ->orderBy('name')
                ->get()
                ->map(fn($cat) => [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                    'path' => '/blog/kategori/' . $cat->slug,
                ]),
        ]);
    }

    /**
     * Show the sections editor for a specific page
     */
    public function sections(Page $page): Response
    {
        return Inertia::render('admin/menus/Sections', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'sections' => $page->sections()
                    ->orderBy('display_order')
                    ->orderBy('title')
                    ->get()
                    ->map(function (PageSection $section) {
                        return [
                            'id' => $section->id,
                            'title' => $section->title,
                            'slug' => $section->slug,
                            'content' => $section->content,
                            'display_order' => $section->display_order,
                            'is_active' => $section->is_active,
                        ];
                    }),
            ],
        ]);
    }

    public function store(MenuItemRequest $request): RedirectResponse
    {
        try {
            $data = $this->payload($request);
            MenuItem::create($data);

            return back()->with('success', 'Menu berhasil ditambahkan.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat menu item', ['message' => $e->getMessage()]);
            return back()->withErrors(['general' => 'Gagal menyimpan menu.'])->withInput();
        }
    }

    public function destroy(MenuItem $menu): RedirectResponse
    {
        $menu->delete();

        return back()->with('success', 'Menu dihapus.');
    }

    public function updateStatus(Request $request, MenuItem $menu): RedirectResponse
    {
        $data = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $menu->update(['is_active' => $data['is_active']]);

        return back()->with('success', 'Status menu diperbarui.');
    }

    public function updatePageSections(Request $request, Page $page): RedirectResponse
    {
        $data = $request->validate([
            'sections' => ['required', 'array'],
            'sections.*.id' => ['nullable', 'exists:page_sections,id'],
            'sections.*.title' => ['required', 'string', 'max:255'],
            'sections.*.slug' => ['nullable', 'string', 'max:160'],
            'sections.*.content' => ['nullable', 'string'],
            'sections.*.display_order' => ['nullable', 'integer', 'min:0'],
            'sections.*.is_active' => ['nullable', 'boolean'],
        ]);

        try {
            DB::transaction(function () use ($page, $data) {
                $ids = [];
                foreach ($data['sections'] as $order => $section) {
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

                    if (!empty($section['id'])) {
                        $existing = $page->sections()->where('id', $section['id'])->first();
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
            });

            return back()->with('success', 'Konten halaman diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui section halaman dari menu', [
                'page_id' => $page->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui section.']);
        }
    }

    private function payload(MenuItemRequest $request): array
    {
        $data = $request->validated();

        $target = $data['target'] ?? null;

        if ($data['type'] === 'page' && isset($data['page_id'])) {
            $page = Page::find($data['page_id']);
            $target = $page ? '/' . ltrim($page->slug, '/') : null;
        }

        if ($data['type'] === 'internal' && $target) {
            $target = '/' . ltrim($target, '/');
        }

        if ($data['type'] === 'category' && $target) {
            $target = '/' . ltrim($target, '/');
        }

        if ($data['type'] === 'external' && $target) {
            $target = Str::startsWith($target, ['http://', 'https://']) ? $target : 'https://' . ltrim($target, '/');
        }

        return [
            'title' => $data['title'],
            'position' => $data['position'],
            'type' => $data['type'],
            'page_id' => $data['type'] === 'page' ? $data['page_id'] : null,
            'target' => $target,
            'parent_id' => $data['parent_id'] ?? null,
            'display_order' => $data['display_order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ];
    }

    /**
     * Reorder menu items via drag and drop
     */
    public function reorder(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'integer', 'exists:menu_items,id'],
            'items.*.parent_id' => ['nullable', 'integer', 'exists:menu_items,id'],
            'items.*.display_order' => ['required', 'integer', 'min:0'],
        ]);

        try {
            DB::transaction(function () use ($data) {
                foreach ($data['items'] as $item) {
                    MenuItem::where('id', $item['id'])->update([
                        'parent_id' => $item['parent_id'],
                        'display_order' => $item['display_order'],
                    ]);
                }
            });

            return back()->with('success', 'Urutan menu diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal mengatur ulang urutan menu', ['message' => $e->getMessage()]);
            return back()->withErrors(['general' => 'Gagal mengatur ulang urutan menu.']);
        }
    }

    /**
     * Reorder page sections via drag and drop
     */
    public function reorderSections(Request $request, Page $page): RedirectResponse
    {
        $data = $request->validate([
            'sections' => ['required', 'array'],
            'sections.*.id' => ['required', 'integer', 'exists:page_sections,id'],
            'sections.*.display_order' => ['required', 'integer', 'min:0'],
        ]);

        try {
            DB::transaction(function () use ($page, $data) {
                foreach ($data['sections'] as $section) {
                    $page->sections()->where('id', $section['id'])->update([
                        'display_order' => $section['display_order'],
                    ]);
                }
            });

            return back()->with('success', 'Urutan section diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal mengatur ulang urutan section', [
                'page_id' => $page->id,
                'message' => $e->getMessage(),
            ]);
            return back()->withErrors(['general' => 'Gagal mengatur ulang urutan section.']);
        }
    }

    /**
     * Reset menu items to default from seeder
     */
    public function reset(): RedirectResponse
    {
        try {
            DB::transaction(function () {
                // Hapus semua menu items
                MenuItem::query()->delete();

                // Jalankan seeder untuk membuat ulang menu default
                $seeder = new \Database\Seeders\MenuItemSeeder();
                $seeder->run();
            });

            return back()->with('success', 'Menu berhasil direset ke pengaturan awal.');
        } catch (Throwable $e) {
            Log::error('Gagal mereset menu', ['message' => $e->getMessage()]);
            return back()->withErrors(['general' => 'Gagal mereset menu: ' . $e->getMessage()]);
        }
    }
}

