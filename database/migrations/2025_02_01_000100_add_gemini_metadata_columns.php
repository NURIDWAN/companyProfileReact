<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('excerpt');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->string('og_title')->nullable()->after('meta_description');
            $table->json('cta_variants')->nullable()->after('faqs');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('excerpt');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->string('og_title')->nullable()->after('meta_description');
            $table->json('cta_variants')->nullable()->after('og_title');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'og_title', 'cta_variants']);
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'og_title', 'cta_variants']);
        });
    }
};
