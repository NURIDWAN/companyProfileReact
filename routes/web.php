<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\CompanySettingController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\JobApplicationController;
use App\Http\Controllers\Admin\JobPositionController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Landing\LandingController;
use App\Http\Controllers\Landing\PageController as LandingPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Landing Page / Frontend Routes
|--------------------------------------------------------------------------
|
| Dikelompokkan untuk kerapian, tanpa prefix pada nama route.
|
*/
Route::group([], function () {
    Route::get('/', [LandingController::class, 'home'])
        ->middleware('landing.page:home')
        ->name('home');

    // Redirect /home ke root agar home hanya diakses lewat /
    Route::redirect('/home', '/')->name('home.redirect');

    Route::get('/about', [LandingController::class, 'about'])
        ->middleware('landing.page:about')
        ->name('about');

    Route::get('/service', [LandingController::class, 'services'])
        ->middleware('landing.page:service')
        ->name('service');

    Route::get('/career', [LandingController::class, 'career'])
        ->middleware('landing.page:career')
        ->name('career');
    Route::get('/career/{jobPosition:slug}', [LandingController::class, 'careerShow'])
        ->middleware('landing.page:career')
        ->name('career.show');
    Route::get('/career/{jobPosition:slug}/apply', [\App\Http\Controllers\Landing\CareerApplicationController::class, 'create'])
        ->middleware('landing.page:career')
        ->name('career.apply');
    Route::post('/career/{jobPosition:slug}/apply', [\App\Http\Controllers\Landing\CareerApplicationController::class, 'store'])
        ->middleware('landing.page:career')
        ->name('career.apply.store');

    Route::get('/blog', [LandingController::class, 'blog'])
        ->middleware('landing.page:blog')
        ->name('blog');
    Route::get('/blog/kategori/{category:slug}', [LandingController::class, 'blogByCategory'])
        ->middleware('landing.page:blog')
        ->name('blog.category');
    Route::get('/blog/{blogPost:slug}', [LandingController::class, 'blogShow'])
        ->middleware('landing.page:blog')
        ->name('blog.show');

    Route::get('/product', [LandingController::class, 'products'])
        ->middleware('landing.page:product')
        ->name('product');
    Route::get('/product/{product:slug}', [LandingController::class, 'productShow'])
        ->middleware('landing.page:product')
        ->name('product.show');

    Route::get('/project', [LandingController::class, 'projects'])
        ->middleware('landing.page:project')
        ->name('project');
    Route::get('/project/{project:slug}', [LandingController::class, 'projectShow'])
        ->middleware('landing.page:project')
        ->name('project.show');

    Route::get('/contact', [LandingController::class, 'contact'])
        ->middleware('landing.page:contact')
        ->name('contact');
    Route::post('/contact', [LandingController::class, 'submitContact'])
        ->middleware('landing.page:contact')
        ->name('contact.store');

});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserManagementController::class)
            ->except(['show'])
            ->middleware('can:manage-users');
        Route::resource('services', ServiceController::class);

        Route::post('products/enrich', [ProductController::class, 'enrich'])->name('products.enrich');
        Route::resource('products', ProductController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('job-positions', JobPositionController::class);
        Route::resource('contact-messages', ContactMessageController::class)->only(['index', 'show', 'update', 'destroy']);
        Route::resource('job-applications', JobApplicationController::class)->only(['index', 'show', 'destroy']);
        Route::patch('job-applications/{jobApplication}/status', [JobApplicationController::class, 'updateStatus'])
            ->name('job-applications.status');
        Route::get('job-applications/{jobApplication}/resume', [JobApplicationController::class, 'downloadResume'])
            ->name('job-applications.resume');
        Route::post('blog-posts/generate', [BlogPostController::class, 'generate'])->name('blog-posts.generate');
        Route::post('blog-posts/upload-image', [BlogPostController::class, 'uploadImage'])->name('blog-posts.upload-image');
        Route::resource('blog-posts', BlogPostController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('team-members', TeamMemberController::class);
        Route::resource('settings', CompanySettingController::class)->except(['show']);
        Route::post('settings/company', [CompanySettingController::class, 'updateCompany'])->name('settings.company.update');
        Route::post('settings/address', [CompanySettingController::class, 'updateAddress'])->name('settings.address.update');
        Route::post('settings/contacts', [CompanySettingController::class, 'updateContacts'])->name('settings.contacts.update');
        Route::post('settings/socials', [CompanySettingController::class, 'updateSocials'])->name('settings.socials.update');
        Route::post('settings/security/otp', [CompanySettingController::class, 'updateSecurity'])->name('settings.security.otp');
        Route::post('settings/footer/cta', [CompanySettingController::class, 'updateFooterCta'])->name('settings.footer.cta.update');
        Route::post('settings/footer/legal', [CompanySettingController::class, 'updateFooterLegal'])->name('settings.footer.legal.update');
        Route::post('settings/ai', [CompanySettingController::class, 'updateAiSettings'])->name('settings.ai.update');
        Route::post('settings/branding', [CompanySettingController::class, 'updateBranding'])->name('settings.branding.update');
        Route::resource('pages', AdminPageController::class);
        Route::resource('menus', MenuItemController::class)->only(['index', 'store', 'destroy']);
        Route::get('menus/page/{page}/sections', [MenuItemController::class, 'sections'])->name('menus.page.sections');
        Route::patch('menus/{menu}/status', [MenuItemController::class, 'updateStatus'])->name('menus.status');
        Route::put('menus/page/{page}/sections', [MenuItemController::class, 'updatePageSections'])->name('menus.page-sections');
        Route::post('menus/reorder', [MenuItemController::class, 'reorder'])->name('menus.reorder');
        Route::post('menus/page/{page}/sections/reorder', [MenuItemController::class, 'reorderSections'])->name('menus.sections.reorder');
        Route::post('menus/reset', [MenuItemController::class, 'reset'])->name('menus.reset');

        // Image upload routes
        Route::post('upload/image', [ImageUploadController::class, 'upload'])->name('upload.image');
        Route::delete('upload/image', [ImageUploadController::class, 'delete'])->name('upload.image.delete');
    });
});

/*
|--------------------------------------------------------------------------
| Other Route Files
|--------------------------------------------------------------------------
*/
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Catch-all untuk halaman statis dengan path (termasuk nested path seperti tentang-kami/profil)
Route::get('/{path}', [LandingPageController::class, 'show'])
    ->where('path', '^(?!admin|dashboard|settings|login|register|password|logout|api|storage|sanctum|_ignition)[a-z0-9\-\/]+$')
    ->name('pages.show');
