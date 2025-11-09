<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('forbids access without manage-users permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.users.index'))
        ->assertForbidden();
});

it('lists users for authorized admin', function () {
    $admin = createUserWithManageUsersPermission();

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/Index')
            ->where('users.0.name', $admin->name)
        );
});

it('creates a new user with roles', function () {
    $admin = createUserWithManageUsersPermission();

    $editorRole = Role::create([
        'name' => 'Editor',
        'slug' => 'editor',
    ]);

    $permission = Permission::create([
        'name' => 'Manage Content',
        'slug' => 'manage-content',
    ]);

    $permission->roles()->attach($editorRole->id);

    $payload = [
        'name' => 'New User',
        'email' => 'new@user.test',
        'password' => 'secret123',
        'roles' => [$editorRole->id],
    ];

    $this->actingAs($admin)
        ->post(route('admin.users.store'), $payload)
        ->assertRedirect(route('admin.users.index'));

    expect(User::where('email', 'new@user.test')->exists())->toBeTrue();
    $created = User::where('email', 'new@user.test')->first();
    expect($created->roles()->where('roles.id', $editorRole->id)->exists())->toBeTrue();
});

it('updates user data and roles', function () {
    $admin = createUserWithManageUsersPermission();
    $user = User::factory()->create();

    $role = Role::create([
        'name' => 'Viewer',
        'slug' => 'viewer',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.users.update', $user), [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'password' => '',
            'roles' => [$role->id],
        ])
        ->assertRedirect(route('admin.users.index'));

    $user->refresh();
    expect($user->name)->toBe('Updated User');
    expect($user->roles()->where('roles.id', $role->id)->exists())->toBeTrue();
});

it('prevents deleting the current authenticated user', function () {
    $admin = createUserWithManageUsersPermission();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $admin))
        ->assertRedirect(route('admin.users.index'))
        ->assertSessionHasErrors();
});
