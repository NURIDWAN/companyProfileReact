<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
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

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                Product::create($data);
            });

            return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dibuat.');
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
            'category' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'clients' => ['nullable', 'integer', 'min:0'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'popular' => ['nullable'],
            'demo' => ['nullable'],
            'is_active' => ['nullable'],
        ]);

        $data['features'] = collect(preg_split('/\r?\n/', $request->input('features', '')))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->values()
            ->all();

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

        unset($data['cover_image_file'], $data['thumbnail_file']);

        return $data;
    }
}
