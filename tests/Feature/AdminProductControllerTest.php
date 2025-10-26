<?php

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('can create a product with uploaded images', function () {
    Storage::fake('public');

    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.products.store'), [
        'name' => 'CRM Platform',
        'slug' => 'crm-platform',
        'cover_image_file' => UploadedFile::fake()->image('cover.jpg'),
        'thumbnail_file' => UploadedFile::fake()->image('thumb.jpg'),
        'excerpt' => 'Ringkasan produk',
        'description' => 'Deskripsi lengkap',
        'category' => 'Software',
        'features' => "Integrasi\nDashboard",
        'price' => 1250000,
        'clients' => 10,
        'rating' => 4.5,
        'popular' => true,
        'demo' => true,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.products.index'));
    $this->assertDatabaseHas('products', [
        'name' => 'CRM Platform',
        'slug' => 'crm-platform',
        'category' => 'Software',
        'clients' => 10,
        'popular' => true,
        'demo' => true,
    ]);

    $product = Product::firstOrFail();

    Storage::disk('public')->assertExists($product->cover_image);
    Storage::disk('public')->assertExists($product->thumbnail);
});

it('can update a product and replace images', function () {
    Storage::fake('public');

    $admin = actingAsAdmin();

    $initialCover = UploadedFile::fake()->image('initial-cover.jpg');
    $initialThumb = UploadedFile::fake()->image('initial-thumb.jpg');

    $product = Product::factory()->create([
        'cover_image' => $initialCover->store('products', 'public'),
        'thumbnail' => $initialThumb->store('products', 'public'),
    ]);

    $newCover = UploadedFile::fake()->image('new-cover.jpg');
    $newThumb = UploadedFile::fake()->image('new-thumb.jpg');

    $response = $this->actingAs($admin)->put(route('admin.products.update', $product), [
        'name' => 'CRM Platform Updated',
        'slug' => 'crm-platform-updated',
        'cover_image_file' => $newCover,
        'thumbnail_file' => $newThumb,
        'excerpt' => 'Ringkasan baru',
        'description' => 'Deskripsi baru',
        'category' => 'Software',
        'features' => "SLA\nSupport",
        'price' => 1500000,
        'clients' => 20,
        'rating' => 4.7,
        'popular' => true,
        'demo' => false,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.products.index'));

    $product->refresh();

    expect($product->name)->toBe('CRM Platform Updated');
    expect($product->features)->toBe(['SLA', 'Support']);
    expect($product->demo)->toBeFalse();

    Storage::disk('public')->assertExists($product->cover_image);
    Storage::disk('public')->assertExists($product->thumbnail);
});
