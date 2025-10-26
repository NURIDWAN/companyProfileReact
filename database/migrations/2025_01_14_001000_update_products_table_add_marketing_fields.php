<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('category')->nullable()->after('description');
            $table->unsignedInteger('clients')->default(0)->after('category');
            $table->decimal('rating', 3, 1)->default(0)->after('clients');
            $table->boolean('popular')->default(false)->after('rating');
            $table->boolean('demo')->default(false)->after('popular');
            $table->string('thumbnail')->nullable()->after('cover_image');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['category', 'clients', 'rating', 'popular', 'demo', 'thumbnail']);
        });
    }
};
