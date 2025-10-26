<?php

use App\Models\BlogPost;

it('can create a blog post', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.blog-posts.store'), [
        'author_id' => $admin->id,
        'title' => 'Artikel Transformasi',
        'slug' => 'artikel-transformasi',
        'excerpt' => 'Ringkasan artikel',
        'body' => 'Konten artikel',
        'is_published' => true,
        'published_at' => now()->toDateTimeString(),
    ]);

    $response->assertRedirect(route('admin.blog-posts.index'));
    $this->assertDatabaseHas('blog_posts', ['title' => 'Artikel Transformasi']);
});

it('can update a blog post', function () {
    $admin = actingAsAdmin();
    $post = BlogPost::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.blog-posts.update', $post), [
        'author_id' => $admin->id,
        'title' => 'Artikel Baru',
        'slug' => 'artikel-baru',
        'excerpt' => 'Ringkasan baru',
        'body' => 'Konten baru',
        'is_published' => false,
    ]);

    $response->assertRedirect(route('admin.blog-posts.index'));
    expect($post->refresh()->title)->toBe('Artikel Baru');
    expect($post->is_published)->toBeFalse();
});

it('can delete a blog post', function () {
    $admin = actingAsAdmin();
    $post = BlogPost::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.blog-posts.destroy', $post));

    $response->assertRedirect(route('admin.blog-posts.index'));
    $this->assertDatabaseMissing('blog_posts', ['id' => $post->id]);
});
