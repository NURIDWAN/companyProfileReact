<?php

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
    Route::get('/', function () {
        return Inertia::render('landingPage/Home');
    })->name('home');

    Route::get('/about', function () {
        return Inertia::render('landingPage/About');
    })->name('about');

    Route::get('/service', function () {
        return Inertia::render('landingPage/Service');
    })->name('service');

    Route::get('/career', function () {
        return Inertia::render('landingPage/Career');
    })->name('career');

    Route::get('/blog', function () {
        return Inertia::render('landingPage/Blog');
    })->name('blog');

    Route::get('/product', function () {
        return Inertia::render('landingPage/Product');
    })->name('product');

    Route::get('/project', function () {
        return Inertia::render('landingPage/Project');
    })->name('project');
    Route::get('/contact', function () {
        return Inertia::render('landingPage/Contact');
    })->name('contact');
});


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


/*
|--------------------------------------------------------------------------
| Other Route Files
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';