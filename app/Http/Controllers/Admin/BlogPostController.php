<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\User;
use App\Services\GeminiBlogGenerator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function generate(Request $request, GeminiBlogGenerator $generator): JsonResponse
    {
        $validated = $request->validate([
            'topic' => ['required', 'string', 'max:255'],
            'tone' => ['nullable', 'string', 'max:120'],
            'audience' => ['nullable', 'string', 'max:255'],
            'keywords' => ['nullable', 'string', 'max:500'],
            'call_to_action' => ['nullable', 'string', 'max:255'],
            'word_count' => ['nullable', 'integer', 'min:300', 'max:1500'],
        ]);

        try {
            $result = $generator->generate($validated);
        } catch (Throwable $e) {
            Log::error('Gagal generate artikel dengan Gemini', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Gagal menghubungi layanan Gemini. Periksa API key atau coba ulang beberapa saat lagi.',
            ], 422);
        }

        return response()->json($result);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $data = $request->validate([
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $path = $request->file('image')->store('blog/content', 'public');

        return response()->json([
            'url' => Storage::disk('public')->url($path),
            'path' => $path,
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('admin/blog-posts/Index', [
            'posts' => BlogPost::latest('published_at')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/blog-posts/Form', [
            'users' => $this->authorOptions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                BlogPost::create($data);
            });

            return redirect()->route('admin.blog-posts.index')->with('success', 'Artikel berhasil dibuat.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal membuat artikel', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan artikel.'])->withInput();
        }
    }

    public function edit(BlogPost $blogPost): Response
    {
        return Inertia::render('admin/blog-posts/Form', [
            'post' => $blogPost,
            'users' => $this->authorOptions(),
        ]);
    }

    public function update(Request $request, BlogPost $blogPost): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $blogPost) {
                $data = $this->validatedData($request, $blogPost);
                $blogPost->update($data);
            });

            return redirect()->route('admin.blog-posts.index')->with('success', 'Artikel berhasil diperbarui.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui artikel', [
                'blog_post_id' => $blogPost->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui artikel.'])->withInput();
        }
    }

    public function destroy(BlogPost $blogPost): RedirectResponse
    {
        $blogPost->delete();

        return redirect()->route('admin.blog-posts.index')->with('success', 'Artikel berhasil dihapus.');
    }

    private function validatedData(Request $request, ?BlogPost $post = null): array
    {
        $post = $post ?? $request->route('blog_post');

        $data = $request->validate([
            'author_id' => ['nullable', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blog_posts', 'slug')->ignore($post?->id),
            ],
            'excerpt' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string', 'max:255'],
            'cover_image_file' => ['nullable', 'image', 'max:4096'],
            'is_published' => ['nullable'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['is_published'] = $request->boolean('is_published');

        if ($data['is_published']) {
            $data['published_at'] = $data['published_at']
                ? Carbon::parse($data['published_at'])
                : now();
        } else {
            $data['published_at'] = null;
        }

        if ($file = $request->file('cover_image_file')) {
            if ($post && $post->cover_image && Str::startsWith($post->cover_image, 'blog/')) {
                Storage::disk('public')->delete($post->cover_image);
            }

            $data['cover_image'] = $file->store('blog', 'public');
        } else {
            if (($data['cover_image'] ?? null) === '') {
                if ($post && $post->cover_image && Str::startsWith($post->cover_image, 'blog/')) {
                    Storage::disk('public')->delete($post->cover_image);
                }

                $data['cover_image'] = null;
            } else {
                $data['cover_image'] = $data['cover_image'] ?? ($post?->cover_image ?? null);
            }
        }

        unset($data['cover_image_file']);

        return $data;
    }

    private function authorOptions()
    {
        return User::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }
}
