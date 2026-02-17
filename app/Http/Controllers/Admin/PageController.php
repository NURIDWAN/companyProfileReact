<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PageRequest;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

                // Process sections with file uploads
                $sections = $request->input('sections', []);
                $sections = $this->processSectionFiles($request, $sections);

                $this->syncSections($page, $sections);

                // Auto-create menu item if requested
                if ($request->boolean('add_to_menu') && $request->filled('menu_position')) {
                    $this->createMenuItem($page, $request->input('menu_position'), $request->input('menu_parent_id'));
                }
            });

            return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal menyimpan halaman', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'sections_input' => $request->input('sections', []),
            ]);

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
            'menuItems' => $this->menuItemOptions(),
        ]);
    }

    public function update(PageRequest $request, Page $page): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $page) {
                $data = $this->payload($request, $page);
                $data['updated_by'] = $request->user()?->id;

                $page->update($data);

                // Process sections with file uploads
                $sections = $request->input('sections', []);
                $sections = $this->processSectionFiles($request, $sections);

                $this->syncSections($page, $sections);
            });

            return redirect()->route('admin.pages.index')->with('success', 'Halaman berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui halaman', [
                'page_id' => $page->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'sections_input' => $request->input('sections', []),
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
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $keywordsArray,
            'display_order' => $validated['display_order'] ?? 0,
        ];

        if ($isPublished) {
            $data['status'] = 'published';
            // Auto-fill published_at with current time if not already set
            $data['published_at'] = $page?->published_at ?? now();
        } else {
            $data['status'] = 'draft';
            $data['published_at'] = null;
        }

        return $data;
    }

    private function syncSections(Page $page, array $sections): void
    {
        $ids = [];
        $usedSlugs = [];

        foreach ($sections as $order => $section) {
            // Provide default title if empty
            $title = isset($section['title']) && trim((string) $section['title']) !== ''
                ? trim((string) $section['title'])
                : 'Section '.($order + 1);

            $sectionId = $section['id'] ?? null;

            // Generate base slug
            $baseSlug = isset($section['slug']) && trim((string) $section['slug']) !== ''
                ? Str::slug($section['slug'])
                : Str::slug($title);

            // Handle duplicate slugs within this batch
            $slug = $baseSlug;
            $counter = 1;
            while (in_array($slug, $usedSlugs, true)) {
                $slug = $baseSlug.'-'.$counter;
                $counter++;
            }
            $usedSlugs[] = $slug;

            // Also check against existing sections (excluding current one if updating)
            $existsInDb = function ($checkSlug) use ($page, $sectionId): bool {
                $query = $page->sections()->where('slug', $checkSlug);
                if ($sectionId) {
                    $query->where('id', '!=', $sectionId);
                }

                return $query->exists();
            };

            while ($existsInDb($slug)) {
                $slug = $baseSlug.'-'.$counter;
                $counter++;
            }

            $payload = [
                'title' => $title,
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

    /**
     * Process sections and replace __PENDING_FILE__ placeholders with uploaded file URLs.
     */
    private function processSectionFiles(PageRequest $request, array $sections): array
    {
        $sectionFiles = $request->file('section_files', []);

        if (empty($sectionFiles)) {
            return $sections;
        }

        foreach ($sections as $sectionIdx => &$section) {
            if (! isset($section['content'])) {
                continue;
            }

            // Parse content JSON to find and replace placeholders
            $content = $section['content'];
            $contentData = null;

            try {
                $contentData = json_decode($content, true);
            } catch (\Exception $e) {
                // Not JSON content, skip
                continue;
            }

            if (! is_array($contentData)) {
                continue;
            }

            // Process the content data recursively to replace placeholders
            $filesForSection = $sectionFiles[$sectionIdx] ?? [];
            if (! is_array($filesForSection)) {
                $filesForSection = [];
            }

            $contentData = $this->replacePlaceholdersInData(
                $contentData,
                $filesForSection,
                $sectionIdx
            );

            $section['content'] = json_encode($contentData);
        }

        return $sections;
    }

    /**
     * Recursively replace __PENDING_FILE__ placeholders with uploaded file URLs.
     */
    private function replacePlaceholdersInData(mixed $data, array $files, int $sectionIdx): mixed
    {
        if (is_string($data) && str_starts_with($data, '__PENDING_FILE__:')) {
            // Extract the field path from placeholder
            $fieldPath = substr($data, strlen('__PENDING_FILE__:'));

            // Find the corresponding file
            $file = $this->findFileByPath($files, $fieldPath, $sectionIdx);

            if ($file instanceof UploadedFile) {
                return $this->uploadFile($file);
            }

            // If file not found, return empty string or keep placeholder for debugging
            Log::warning('File not found for placeholder', [
                'placeholder' => $data,
                'field_path' => $fieldPath,
            ]);

            return '';
        }

        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = $this->replacePlaceholdersInData($value, $files, $sectionIdx);
            }
        }

        return $data;
    }

    /**
     * Find uploaded file by field path.
     * Field path format: section_files[{sectionIdx}][{key}] or section_files[{sectionIdx}][{key}][{itemIdx}][{prop}]
     */
    private function findFileByPath(array $files, string $fieldPath, int $sectionIdx): ?UploadedFile
    {
        // Parse the field path to extract keys
        // Example: "section_files[0][image]" => ['image']
        // Example: "section_files[0][items][0][image]" => ['items', '0', 'image']

        $pattern = '/section_files\['.$sectionIdx.'\](.+)/';
        if (! preg_match($pattern, $fieldPath, $matches)) {
            return null;
        }

        $remaining = $matches[1];

        // Extract all bracketed keys
        preg_match_all('/\[([^\]]+)\]/', $remaining, $keyMatches);
        $keys = $keyMatches[1] ?? [];

        if (empty($keys)) {
            return null;
        }

        // Navigate through the files array
        $current = $files;
        foreach ($keys as $key) {
            if (! is_array($current) || ! array_key_exists($key, $current)) {
                return null;
            }
            $current = $current[$key];
        }

        return $current instanceof UploadedFile ? $current : null;
    }

    /**
     * Upload a file and return its public URL.
     */
    private function uploadFile(UploadedFile $file): string
    {
        $filename = time().'_'.Str::random(10).'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('images/sections', $filename, 'public');

        return Storage::url($path);
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
            'target' => '/'.ltrim($page->full_path, '/'),
            'parent_id' => $parentId,
            'display_order' => $maxOrder + 1,
            'is_active' => true,
        ]);
    }
}
