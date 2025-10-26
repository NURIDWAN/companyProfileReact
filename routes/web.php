<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\CompanySettingController;
use App\Http\Controllers\Admin\JobPositionController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\LandingContentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Landing\LandingController;
use App\Http\Controllers\LanguageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Landing Page / Frontend Routes
|--------------------------------------------------------------------------
|
| Dikelompokkan untuk kerapian, tanpa prefix pada nama route.
|
*/
Route::group([], function () {
    Route::get('/', [LandingController::class, 'home'])->name('home');

    Route::get('/about', function () {
        return Inertia::render('landingPage/About');
    })->name('about');

    Route::get('/service', [LandingController::class, 'services'])->name('service');

    Route::get('/career', [LandingController::class, 'career'])->name('career');
    Route::get('/career/{jobPosition:slug}', [LandingController::class, 'careerShow'])->name('career.show');

    Route::get('/blog', [LandingController::class, 'blog'])->name('blog');
    Route::get('/blog/{blogPost:slug}', [LandingController::class, 'blogShow'])->name('blog.show');

    Route::get('/product', [LandingController::class, 'products'])->name('product');
    Route::get('/product/{product:slug}', [LandingController::class, 'productShow'])->name('product.show');

    Route::get('/project', [LandingController::class, 'projects'])->name('project');
    Route::get('/project/{project:slug}', [LandingController::class, 'projectShow'])->name('project.show');

    Route::get('/contact', [LandingController::class, 'contact'])->name('contact');

    Route::post('/language', LanguageController::class)->name('language.switch');
});


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('services', ServiceController::class);
        Route::resource('products', ProductController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('job-positions', JobPositionController::class);
        Route::resource('blog-posts', BlogPostController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('team-members', TeamMemberController::class);
        Route::resource('settings', CompanySettingController::class)->except(['show']);
        Route::get('landing', [LandingContentController::class, 'edit'])->name('landing.edit');
        Route::post('landing/hero', [LandingContentController::class, 'updateHero'])->name('landing.hero');
        Route::post('landing/about', [LandingContentController::class, 'updateAbout'])->name('landing.about.update');
        Route::post('landing/cta', [LandingContentController::class, 'updateFinalCta'])->name('landing.cta.update');
        Route::post('landing/metrics', [LandingContentController::class, 'updateMetrics'])->name('landing.metrics.update');
    });
});


/*
|--------------------------------------------------------------------------
| Other Route Files
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
