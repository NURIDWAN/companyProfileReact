<?php

use App\Models\ContactMessage;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

it('lists contact messages for admin', function () {
    $admin = actingAsAdmin();
    ContactMessage::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.contact-messages.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/contact-messages/Index')
            ->has('messages.data', 1)
        );
});

it('shows a contact message', function () {
    $admin = actingAsAdmin();
    $message = ContactMessage::factory()->create();

    $this->actingAs($admin)
        ->get(route('admin.contact-messages.show', $message))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/contact-messages/Show')
            ->where('message.name', $message->name)
        );
});

it('updates status and notes', function () {
    $admin = actingAsAdmin();
    $message = ContactMessage::factory()->create([
        'status' => 'new',
        'notes' => null,
    ]);

    $now = Carbon::parse('2025-01-01 10:00:00');
    Carbon::setTestNow($now);

    $this->actingAs($admin)
        ->put(route('admin.contact-messages.update', $message), [
            'status' => 'resolved',
            'notes' => 'Sudah dihubungi via email.',
        ])
        ->assertRedirect();

    $message->refresh();
    expect($message->status)->toBe('resolved')
        ->and($message->notes)->toBe('Sudah dihubungi via email.');

    Carbon::setTestNow();
});

it('deletes contact message', function () {
    $admin = actingAsAdmin();
    $message = ContactMessage::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.contact-messages.destroy', $message))
        ->assertRedirect(route('admin.contact-messages.index'));

    $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
});
