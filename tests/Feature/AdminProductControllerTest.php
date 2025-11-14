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
        'gallery' => ['https://example.com/gallery-1.jpg', ''],
        'excerpt' => 'Ringkasan produk',
        'description' => 'Deskripsi lengkap',
        'category' => 'Software',
        'features' => "Integrasi\nDashboard",
        'price' => 1250000,
        'price_variants' => [
            [
                'name' => 'Starter',
                'price' => 1250000,
                'compare_at_price' => 1500000,
                'sku' => 'CRM-START',
                'stock' => 25,
            ],
            [
                'name' => 'Professional',
                'price' => 2750000,
                'sku' => 'CRM-PRO',
                'stock' => 10,
            ],
        ],
        'purchase_url' => 'https://shop.example.com/crm-platform',
        'whatsapp_number' => '+62 811-2233-4455',
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
        'whatsapp_number' => '+62 811-2233-4455',
    ]);

    $product = Product::firstOrFail();

    Storage::disk('public')->assertExists($product->cover_image);
    Storage::disk('public')->assertExists($product->thumbnail);
    expect($product->gallery)->toContain('https://example.com/gallery-1.jpg');
    expect($product->price_variants)->toHaveCount(2);
    expect(data_get($product->price_variants, '0.name'))->toBe('Starter');
    expect($product->purchase_url)->toBe('https://shop.example.com/crm-platform');
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
        'gallery' => ['https://example.com/updated-gallery.jpg'],
        'excerpt' => 'Ringkasan baru',
        'description' => 'Deskripsi baru',
        'category' => 'Software',
        'features' => "SLA\nSupport",
        'price' => '',
        'price_variants' => [
            [
                'name' => 'Enterprise',
                'price' => 3500000,
                'compare_at_price' => 4000000,
                'sku' => 'CRM-ENT',
                'stock' => 5,
            ],
        ],
        'purchase_url' => 'https://shop.example.com/crm-platform-enterprise',
        'whatsapp_number' => '0811992233',
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
    expect($product->gallery)->toContain('https://example.com/updated-gallery.jpg');
    expect($product->price_variants)->toHaveCount(1);
    expect(data_get($product->price_variants, '0.price'))->toEqual(3500000.0);
    expect($product->price)->toEqual(3500000.0);
    expect($product->purchase_url)->toBe('https://shop.example.com/crm-platform-enterprise');
    expect($product->whatsapp_number)->toBe('0811992233');

    Storage::disk('public')->assertExists($product->cover_image);
    Storage::disk('public')->assertExists($product->thumbnail);
});
