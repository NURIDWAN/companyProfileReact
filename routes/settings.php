<?php

use App\Http\Controllers\Admin\CompanySettingController;
use App\Http\Controllers\Admin\LandingContentController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/backup', function () {
        return Inertia::render('settings/backup');
    })->middleware('can:manage-users')->name('settings.backup');

    Route::get('settings/backup/download', [CompanySettingController::class, 'downloadBackup'])
        ->middleware('can:manage-users')
        ->name('settings.backup.download');

    Route::get('settings/content', [LandingContentController::class, 'edit'])->name('settings.content.edit');
    Route::post('settings/content/hero', [LandingContentController::class, 'updateHero'])->name('settings.content.hero');
    Route::post('settings/content/about', [LandingContentController::class, 'updateAbout'])->name('settings.content.about.update');
    Route::post('settings/content/final-cta', [LandingContentController::class, 'updateFinalCta'])->name('settings.content.cta.update');
    Route::post('settings/content/metrics', [LandingContentController::class, 'updateMetrics'])->name('settings.content.metrics.update');
    Route::post('settings/content/navigation', [LandingContentController::class, 'updateNavigation'])->name('settings.content.navigation.update');
    Route::post('settings/content/product-cta', [LandingContentController::class, 'updateProductCta'])->name('settings.content.product-cta.update');
    Route::post('settings/content/product-stats', [LandingContentController::class, 'updateProductStats'])->name('settings.content.product-stats.update');
    Route::post('settings/content/product/hero', [LandingContentController::class, 'updateProductHero'])->name('settings.content.product.hero.update');
    Route::post('settings/content/project/hero', [LandingContentController::class, 'updateProjectHero'])->name('settings.content.project.hero.update');
    Route::post('settings/content/career/hero', [LandingContentController::class, 'updateCareerHero'])->name('settings.content.career.hero.update');
    Route::post('settings/content/blog/hero', [LandingContentController::class, 'updateBlogHero'])->name('settings.content.blog.hero.update');
    Route::post('settings/content/service/hero', [LandingContentController::class, 'updateServiceHero'])->name('settings.content.service.hero.update');
    Route::post('settings/content/service/summary', [LandingContentController::class, 'updateServiceSummary'])->name('settings.content.service.summary.update');
    Route::post('settings/content/service/offerings', [LandingContentController::class, 'updateServiceOfferings'])->name('settings.content.service.offerings.update');
    Route::post('settings/content/service/tech-stack', [LandingContentController::class, 'updateServiceTechStack'])->name('settings.content.service.tech-stack.update');
    Route::post('settings/content/service/process', [LandingContentController::class, 'updateServiceProcess'])->name('settings.content.service.process.update');
    Route::post('settings/content/service/advantages', [LandingContentController::class, 'updateServiceAdvantages'])->name('settings.content.service.advantages.update');
    Route::post('settings/content/service/faqs', [LandingContentController::class, 'updateServiceFaqs'])->name('settings.content.service.faqs.update');
});
