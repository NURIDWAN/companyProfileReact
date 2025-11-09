<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders backup settings page', function () {
    $this->actingAs(createUserWithManageUsersPermission())
        ->get(route('settings.backup'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('settings/backup'));
});
