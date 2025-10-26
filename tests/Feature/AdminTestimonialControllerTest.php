<?php

use App\Models\Testimonial;

it('can create a testimonial', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.testimonials.store'), [
        'author_name' => 'Budi',
        'author_role' => 'CEO',
        'company' => 'PT Maju',
        'quote' => 'Luar biasa',
        'rating' => 5,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.testimonials.index'));
    $this->assertDatabaseHas('testimonials', ['author_name' => 'Budi']);
});

it('can update a testimonial', function () {
    $admin = actingAsAdmin();
    $testimonial = Testimonial::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.testimonials.update', $testimonial), [
        'author_name' => 'Siti',
        'author_role' => 'CMO',
        'company' => 'PT Kreatif',
        'quote' => 'Hebat',
        'rating' => 4,
        'is_active' => false,
    ]);

    $response->assertRedirect(route('admin.testimonials.index'));
    expect($testimonial->refresh()->author_name)->toBe('Siti');
    expect($testimonial->is_active)->toBeFalse();
});

it('can delete a testimonial', function () {
    $admin = actingAsAdmin();
    $testimonial = Testimonial::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.testimonials.destroy', $testimonial));

    $response->assertRedirect(route('admin.testimonials.index'));
    $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
});
