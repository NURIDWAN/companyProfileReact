<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

pest()->extend(Tests\TestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');

uses(Tests\TestCase::class)
    ->in('Unit');

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

function createUserWithManageUsersPermission(): \App\Models\User
{
    $user = \App\Models\User::factory()->create();

    $permission = \App\Models\Permission::firstOrCreate([
        'slug' => 'manage-users',
    ], [
        'name' => 'Manage Users',
    ]);

    $role = \App\Models\Role::firstOrCreate([
        'slug' => 'admin',
    ], [
        'name' => 'Administrator',
    ]);

    $role->permissions()->syncWithoutDetaching([$permission->id]);
    $user->roles()->syncWithoutDetaching([$role->id]);

    return $user;
}

function actingAsAdmin(): \App\Models\User
{
    return createUserWithManageUsersPermission();
}

function fakeRecaptcha(bool $success = true): void
{
    Http::fake([
        'www.google.com/recaptcha/api/siteverify' => Http::response([
            'success' => $success,
        ], 200),
    ]);
}
