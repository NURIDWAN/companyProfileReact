<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/blog-posts/Index', [
            'posts' => BlogPost::query()->latest('published_at')->paginate(10),
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
            'is_published' => ['nullable'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['is_published'] = $request->boolean('is_published');

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
