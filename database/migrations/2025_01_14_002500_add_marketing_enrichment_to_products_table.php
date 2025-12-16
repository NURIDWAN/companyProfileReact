<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->text('marketing_summary')->nullable()->after('excerpt');
            $table->json('marketing_highlights')->nullable()->after('marketing_summary');
            $table->json('faqs')->nullable()->after('marketing_highlights');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['marketing_summary', 'marketing_highlights', 'faqs']);
        });
    }
};
