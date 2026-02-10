<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Production: Laravel project is in ../laravel (sibling of public_html)
$laravelPath = __DIR__.'/../laravel';

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $laravelPath.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $laravelPath.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once $laravelPath.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
