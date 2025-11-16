<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\GeminiRequest;
use App\Jobs\ProcessGeminiRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/Index', [
            'products' => Product::query()->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/Form');
    }

    public function enrich(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:120'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'features' => ['nullable', 'array'],
            'features.*' => ['nullable', 'string', 'max:255'],
            'target_market' => ['nullable', 'string', 'max:255'],
            'tone' => ['nullable', 'string', 'max:255'],
            'value_proposition' => ['nullable', 'string', 'max:255'],
            'call_to_action' => ['nullable', 'string', 'max:255'],
        ]);

        $data['features'] = $this->cleanList(collect($data['features'] ?? []));

        $model = config('services.gemini.model', 'gemini-2.0-flash');

        $geminiRequest = GeminiRequest::create([
            'user_id' => $request->user()?->id,
            'type' => 'product',
            'model' => $model,
            'summary' => Str::limit($data['name'], 120),
            'options' => $data,
        ]);

        ProcessGeminiRequest::dispatch($geminiRequest);

        return response()->json([
            'request_id' => $geminiRequest->uuid,
            'status' => $geminiRequest->status,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                Product::create($data);
            });

            return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dibuat.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal membuat produk', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan produk.'])->withInput();
        }
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/products/Form', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $product) {
                $data = $this->validatedData($request, $product);
                $product->update($data);
            });

            return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui produk', [
                'product_id' => $product->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui produk.'])->withInput();
        }
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus.');
    }

    private function validatedData(Request $request, ?Product $product = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($product?->id),
            ],
            'cover_image' => ['nullable', 'string', 'max:255'],
            'cover_image_file' => ['nullable', 'image', 'max:2048'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'thumbnail_file' => ['nullable', 'image', 'max:2048'],
            'excerpt' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'og_title' => ['nullable', 'string', 'max:255'],
            'marketing_summary' => ['nullable', 'string'],
            'marketing_highlights' => ['nullable', 'string'],
            'faqs' => ['nullable', 'array'],
            'faqs.*.question' => ['nullable', 'string', 'max:255'],
            'faqs.*.answer' => ['nullable', 'string'],
            'cta_variants' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'price_variants' => ['nullable', 'array'],
            'price_variants.*.name' => ['nullable', 'string', 'max:120'],
            'price_variants.*.price' => ['nullable', 'numeric', 'min:0'],
            'price_variants.*.compare_at_price' => ['nullable', 'numeric', 'min:0'],
            'price_variants.*.sku' => ['nullable', 'string', 'max:120'],
            'price_variants.*.stock' => ['nullable', 'integer', 'min:0'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'string', 'max:500'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['nullable', 'image', 'max:4096'],
            'purchase_url' => ['nullable', 'url', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:30'],
            'clients' => ['nullable', 'integer', 'min:0'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'popular' => ['nullable'],
            'demo' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $data['marketing_summary'] = $request->filled('marketing_summary')
            ? trim((string) $request->input('marketing_summary'))
            : null;

        $data['marketing_highlights'] = $this->normalizeLines($request->input('marketing_highlights'));

        $data['faqs'] = $this->prepareFaqs(collect($request->input('faqs', [])));
        $data['cta_variants'] = $this->normalizeLines($request->input('cta_variants'));

        $data['features'] = $this->normalizeLines($request->input('features'));

        $data['price'] = $request->filled('price') ? (float) $request->input('price') : null;
        $data['clients'] = $request->filled('clients') ? (int) $request->input('clients') : null;
        $data['rating'] = $request->filled('rating') ? (float) $request->input('rating') : null;
        $data['popular'] = $request->boolean('popular');
        $data['demo'] = $request->boolean('demo');
        $data['is_active'] = $request->boolean('is_active');

        if ($file = $request->file('cover_image_file')) {
            if ($product && $product->cover_image) {
                Storage::disk('public')->delete($product->cover_image);
            }

            $data['cover_image'] = $file->store('products', 'public');
        } else {
            $data['cover_image'] = $data['cover_image'] ?: ($product?->cover_image ?? null);
        }

        if ($file = $request->file('thumbnail_file')) {
            if ($product && $product->thumbnail) {
                Storage::disk('public')->delete($product->thumbnail);
            }

            $data['thumbnail'] = $file->store('products', 'public');
        } else {
            $data['thumbnail'] = $data['thumbnail'] ?: ($product?->thumbnail ?? null);
        }

        $gallery = $this->prepareGallery(
            collect($request->input('gallery', [])),
            collect($request->file('gallery_files', [])),
            $product
        );

        if ($product) {
            $this->cleanupRemovedGallery($product, $gallery);
        }

        $data['gallery'] = $gallery->values()->all();

        $variants = $this->prepareVariants(collect($request->input('price_variants', [])));

        if ($variants->isNotEmpty() && !$request->filled('price')) {
            $data['price'] = $variants
                ->map(fn (array $variant) => $variant['price'] ?? null)
                ->filter()
                ->min();
        }

        $data['price_variants'] = $variants->values()->all();

        unset($data['cover_image_file'], $data['thumbnail_file'], $data['gallery_files']);

        return $data;
    }

    private function normalizeLines(?string $value): array
    {
        if (!$value) {
            return [];
        }

        return $this->cleanList(collect(preg_split('/\r?\n/', $value)));
    }

    /**
     * @param  Collection<int, mixed>  $items
     * @return array<int, array{question: string, answer: string}>
     */
    private function prepareFaqs(Collection $items): array
    {
        return $items
            ->map(function ($item) {
                if (!is_array($item)) {
                    return null;
                }

                $question = trim((string) ($item['question'] ?? ''));
                $answer = trim((string) ($item['answer'] ?? ''));

                if ($question === '' || $answer === '') {
                    return null;
                }

                return [
                    'question' => $question,
                    'answer' => $answer,
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, mixed>|array<int, mixed>  $items
     * @return array<int, string>
     */
    private function cleanList(Collection|array $items): array
    {
        return collect($items)
            ->map(fn ($item) => trim((string) $item))
            ->filter()
            ->values()
            ->all();
    }

    private function prepareGallery(Collection $existing, Collection $files, ?Product $product): Collection
    {
        $gallery = $existing
            ->map(fn ($value) => is_string($value) ? trim($value) : null)
            ->filter(fn ($value) => $value !== null && $value !== '')
            ->values();

        $files->filter()
            ->each(function ($file) use (&$gallery): void {
                if ($file) {
                    $gallery->push($file->store('products', 'public'));
                }
            });

        return $gallery;
    }

    private function cleanupRemovedGallery(Product $product, Collection $updatedGallery): void
    {
        $previous = collect($product->gallery ?? []);

        $previous
            ->filter(fn ($path) => Str::startsWith($path, 'products/'))
            ->diff($updatedGallery)
            ->each(fn ($path) => Storage::disk('public')->delete($path));
    }

    private function prepareVariants(Collection $variants): Collection
    {
        return $variants
            ->map(function ($variant) {
                if (!is_array($variant)) {
                    return null;
                }

                $name = trim((string) ($variant['name'] ?? ''));
                $price = $this->normalizeMoney($variant['price'] ?? null);
                $compareAt = $this->normalizeMoney($variant['compare_at_price'] ?? null);
                $sku = trim((string) ($variant['sku'] ?? ''));
                $stock = $variant['stock'] ?? null;
                $stock = $stock === '' || $stock === null ? null : (int) $stock;

                if ($name === '' && $price === null) {
                    return null;
                }

                return array_filter([
                    'name' => $name !== '' ? $name : null,
                    'price' => $price,
                    'compare_at_price' => $compareAt,
                    'sku' => $sku !== '' ? $sku : null,
                    'stock' => $stock,
                ], fn ($value) => $value !== null);
            })
            ->filter()
            ->values();
    }

    private function normalizeMoney($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_string($value)) {
            $normalized = str_replace(',', '.', $value);
            $normalized = preg_replace('/[^0-9.]/', '', $normalized) ?? '';

            if ($normalized === '') {
                return null;
            }

            if (substr_count($normalized, '.') > 1) {
                $parts = explode('.', $normalized);
                $decimal = array_pop($parts);
                $normalized = implode('', $parts) . '.' . $decimal;
            }

            return (float) $normalized;
        }

        return (float) $value;
    }
}
