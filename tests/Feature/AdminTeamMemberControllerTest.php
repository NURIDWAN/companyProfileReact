<?php

use App\Models\TeamMember;

it('can create a team member', function () {
    $admin = actingAsAdmin();

    $response = $this->actingAs($admin)->post(route('admin.team-members.store'), [
        'name' => 'Anisa',
        'role' => 'CEO',
        'email' => 'anisa@example.com',
        'phone' => '+6212345678',
        'linkedin' => 'https://www.linkedin.com/in/anisa',
        'display_order' => 1,
        'bio' => 'Bio singkat',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.team-members.index'));
    $this->assertDatabaseHas('team_members', ['name' => 'Anisa']);
});

it('can update a team member', function () {
    $admin = actingAsAdmin();
    $member = TeamMember::factory()->create();

    $response = $this->actingAs($admin)->put(route('admin.team-members.update', $member), [
        'name' => 'Rizky',
        'role' => 'CTO',
        'email' => 'rizky@example.com',
        'phone' => '+62123456789',
        'linkedin' => 'https://www.linkedin.com/in/rizky',
        'display_order' => 2,
        'bio' => 'Bio baru',
        'is_active' => false,
    ]);

    $response->assertRedirect(route('admin.team-members.index'));
    expect($member->refresh()->role)->toBe('CTO');
    expect($member->is_active)->toBeFalse();
});

it('can delete a team member', function () {
    $admin = actingAsAdmin();
    $member = TeamMember::factory()->create();

    $response = $this->actingAs($admin)->delete(route('admin.team-members.destroy', $member));

    $response->assertRedirect(route('admin.team-members.index'));
    $this->assertDatabaseMissing('team_members', ['id' => $member->id]);
});
