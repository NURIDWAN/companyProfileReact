<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\CompanySettingController;
use App\Http\Controllers\Admin\JobPositionController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\LandingContentController;
use App\Http\Controllers\Admin\JobApplicationController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GeminiRequestController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Landing\LandingController;
use App\Http\Controllers\Landing\PageController as LandingPageController;
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
        Route::get('gemini-requests/{geminiRequest:uuid}', [GeminiRequestController::class, 'show'])->name('gemini-requests.show');
        Route::get('gemini/status', [GeminiRequestController::class, 'health'])->name('gemini.status');
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
        Route::post('settings/about/overview', [CompanySettingController::class, 'updateAboutOverview'])->name('settings.about.overview.update');
        Route::post('settings/about/vision', [CompanySettingController::class, 'updateAboutVision'])->name('settings.about.vision.update');
        Route::post('settings/about/values', [CompanySettingController::class, 'updateAboutValues'])->name('settings.about.values.update');
        Route::post('settings/about/statistics', [CompanySettingController::class, 'updateAboutStatistics'])->name('settings.about.statistics.update');
        Route::post('settings/about/team', [CompanySettingController::class, 'updateAboutTeam'])->name('settings.about.team.update');
        Route::post('settings/about/cta', [CompanySettingController::class, 'updateAboutCta'])->name('settings.about.cta.update');
        Route::get('landing', [LandingContentController::class, 'edit'])->name('landing.edit');
        Route::post('landing/hero', [LandingContentController::class, 'updateHero'])->name('landing.hero');
        Route::post('landing/about', [LandingContentController::class, 'updateAbout'])->name('landing.about.update');
        Route::post('landing/cta', [LandingContentController::class, 'updateFinalCta'])->name('landing.cta.update');
        Route::post('landing/product-cta', [LandingContentController::class, 'updateProductCta'])->name('landing.product-cta.update');
        Route::post('landing/metrics', [LandingContentController::class, 'updateMetrics'])->name('landing.metrics.update');
        Route::post('landing/navigation', [LandingContentController::class, 'updateNavigation'])->name('landing.navigation.update');
        Route::post('landing/sections', [LandingContentController::class, 'updateSectionVisibility'])->name('landing.sections.update');
        Route::post('landing/product-stats', [LandingContentController::class, 'updateProductStats'])->name('landing.product-stats.update');
        Route::post('landing/product/hero', [LandingContentController::class, 'updateProductHero'])->name('landing.product.hero.update');
        Route::post('landing/project/hero', [LandingContentController::class, 'updateProjectHero'])->name('landing.project.hero.update');
        Route::post('landing/career/hero', [LandingContentController::class, 'updateCareerHero'])->name('landing.career.hero.update');
        Route::post('landing/blog/hero', [LandingContentController::class, 'updateBlogHero'])->name('landing.blog.hero.update');
        Route::post('landing/service/hero', [LandingContentController::class, 'updateServiceHero'])->name('landing.service.hero.update');
        Route::post('landing/service/summary', [LandingContentController::class, 'updateServiceSummary'])->name('landing.service.summary.update');
        Route::post('landing/service/offerings', [LandingContentController::class, 'updateServiceOfferings'])->name('landing.service.offerings.update');
        Route::post('landing/service/tech-stack', [LandingContentController::class, 'updateServiceTechStack'])->name('landing.service.tech-stack.update');
        Route::post('landing/service/process', [LandingContentController::class, 'updateServiceProcess'])->name('landing.service.process.update');
        Route::post('landing/service/advantages', [LandingContentController::class, 'updateServiceAdvantages'])->name('landing.service.advantages.update');
        Route::post('landing/service/faqs', [LandingContentController::class, 'updateServiceFaqs'])->name('landing.service.faqs.update');
        Route::resource('pages', AdminPageController::class);
        Route::resource('menus', MenuItemController::class)->only(['index', 'store', 'destroy']);
        Route::get('menus/page/{page}/sections', [MenuItemController::class, 'sections'])->name('menus.page.sections');
        Route::patch('menus/{menu}/status', [MenuItemController::class, 'updateStatus'])->name('menus.status');
        Route::put('menus/page/{page}/sections', [MenuItemController::class, 'updatePageSections'])->name('menus.page-sections');
        Route::post('menus/reorder', [MenuItemController::class, 'reorder'])->name('menus.reorder');
        Route::post('menus/page/{page}/sections/reorder', [MenuItemController::class, 'reorderSections'])->name('menus.sections.reorder');
        Route::post('menus/reset', [MenuItemController::class, 'reset'])->name('menus.reset');
    });
});


/*
|--------------------------------------------------------------------------
| Other Route Files
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Catch-all untuk halaman statis dengan slug tanpa prefix (ditempatkan paling akhir)
Route::get('/{slug}', [LandingPageController::class, 'show'])
    ->where('slug', '^(?!admin|dashboard|settings|login|register|password|logout|api|storage|sanctum|_ignition).+$')
    ->name('pages.show');
