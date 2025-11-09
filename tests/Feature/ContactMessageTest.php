<?php

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ContactMessageReceived;

it('stores contact messages from landing page', function () {
    Notification::fake();
    $admin = User::factory()->create(['email' => 'admin@example.id']);

    fakeRecaptcha();

    $this->post(route('contact.store'), [
        'name' => 'Andi',
        'email' => 'andi@example.com',
        'phone' => '08123456789',
        'subject' => 'Diskusi project',
        'message' => 'Ingin berdiskusi tentang proyek.',
        'recaptcha_token' => 'token',
    ])
        ->assertRedirect();

    $this->assertDatabaseHas('contact_messages', [
        'name' => 'Andi',
        'email' => 'andi@example.com',
        'status' => 'new',
    ]);

    Notification::assertSentTo($admin, ContactMessageReceived::class);
});
