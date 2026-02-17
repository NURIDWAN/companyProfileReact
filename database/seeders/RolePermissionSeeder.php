<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = collect([
            ['name' => 'Manage Users', 'slug' => 'manage-users'],
            ['name' => 'Manage Content', 'slug' => 'manage-content'],
            ['name' => 'View Analytics', 'slug' => 'view-analytics'],
        ])->mapWithKeys(function ($permission) {
            $record = Permission::firstOrCreate(
                ['slug' => $permission['slug']],
                ['name' => $permission['name']]
            );

            return [$permission['slug'] => $record];
        });

        $adminRole = Role::firstOrCreate(
            ['slug' => 'admin'],
            ['name' => 'Administrator', 'description' => 'Full access to all features.']
        );

        $editorRole = Role::firstOrCreate(
            ['slug' => 'editor'],
            ['name' => 'Editor', 'description' => 'Manage content-related resources.']
        );

        $adminRole->permissions()->sync($permissions->pluck('id'));
        $editorRole->permissions()->sync([
            $permissions['manage-content']->id,
        ]);

        $firstUser = User::query()->orderBy('id')->first();
        if ($firstUser && ! $firstUser->roles()->where('roles.id', $adminRole->id)->exists()) {
            $firstUser->roles()->attach($adminRole->id);
        }
    }
}
