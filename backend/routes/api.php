<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SolutionController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\Api\V1\TechnologyController;
use App\Http\Controllers\Api\V1\IndustryController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\TestimonialController;
use App\Http\Controllers\Api\V1\CareerController;
use App\Http\Controllers\Api\V1\JobApplicationController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\LeadController;
use App\Http\Controllers\Api\V1\PopupController;
use App\Http\Controllers\Api\V1\NewsletterController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\MediaController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\AuditLogController;
use App\Http\Controllers\Api\V1\SearchController;
use App\Http\Controllers\Api\V1\PublicationController;

/*
|--------------------------------------------------------------------------
| API Routes — Version 1 (/api/v1/)
| DIGIHUB INNOVATION CENTER PVT. LTD.
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // -------------------------------------------------------------
    // Public Endpoints
    // -------------------------------------------------------------
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'Digihub API v1 operational',
            'timestamp' => now()->toIso8601String(),
            'version' => '1.0.0',
        ]);
    });

    // Public CMS Data
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{slug}', [ServiceController::class, 'show']);

    Route::get('/solutions', [SolutionController::class, 'index']);
    Route::get('/solutions/{slug}', [SolutionController::class, 'show']);

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    Route::get('/technologies', [TechnologyController::class, 'index']);
    Route::get('/industries', [IndustryController::class, 'index']);
    Route::get('/team', [TeamController::class, 'index']);
    Route::get('/clients', [ClientController::class, 'index']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);

    // Blog & Insights
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog-categories', [BlogController::class, 'categories']);
    Route::get('/blog-tags', [BlogController::class, 'tags']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);
    Route::get('/blog/category/{slug}', [BlogController::class, 'byCategory']);
    Route::get('/blog/tag/{slug}', [BlogController::class, 'byTag']);

    // Careers & Application
    Route::get('/careers', [CareerController::class, 'index']);
    Route::get('/careers/{slug}', [CareerController::class, 'show']);
    Route::post('/careers/{slug}/apply', [JobApplicationController::class, 'store']);

    // Contact Inquiries & Lead Generation
    Route::post('/contact', [ContactController::class, 'store']);
    Route::post('/leads', [LeadController::class, 'store']);

    // Dynamic Popups & Announcements
    Route::get('/popups/active', [PopupController::class, 'getActive']);
    Route::post('/popups/{id}/impression', [PopupController::class, 'recordImpression']);
    Route::post('/popups/{id}/click', [PopupController::class, 'recordClick']);

    // Newsletter Subscription
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

    // Settings & Global Search
    Route::get('/settings', [SettingController::class, 'publicSettings']);
    Route::get('/search', [SearchController::class, 'search']);

    // Publications
    Route::get('/publications', [PublicationController::class, 'index']);

    // -------------------------------------------------------------
    // Authentication (Laravel Sanctum)
    // -------------------------------------------------------------
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', [AuthController::class, 'user']);

        // ---------------------------------------------------------
        // Admin CMS & CRM Endpoints
        // ---------------------------------------------------------
        Route::prefix('admin')->group(function () {
            // Dashboard overview & metrics
            Route::get('/dashboard', [DashboardController::class, 'stats']);

            // Services CRUD
            Route::apiResource('services', ServiceController::class)->except(['index', 'show']);

            // Solutions CRUD
            Route::apiResource('solutions', SolutionController::class)->except(['index', 'show']);

            // Projects & Portfolio CRUD
            Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);

            // Blog Posts CRUD
            Route::apiResource('blog', BlogController::class)->except(['index', 'show']);

            // Careers CRUD
            Route::apiResource('careers', CareerController::class)->except(['index', 'show']);

            // Job Applications Management
            Route::get('/job-applications', [JobApplicationController::class, 'index']);
            Route::get('/job-applications/{id}', [JobApplicationController::class, 'show']);
            Route::patch('/job-applications/{id}/status', [JobApplicationController::class, 'updateStatus']);
            Route::delete('/job-applications/{id}', [JobApplicationController::class, 'destroy']);

            // Contact Inquiries (Inbox)
            Route::get('/inquiries', [ContactController::class, 'index']);
            Route::get('/inquiries/{id}', [ContactController::class, 'show']);
            Route::patch('/inquiries/{id}/status', [ContactController::class, 'updateStatus']);
            Route::post('/inquiries/{id}/activities', [ContactController::class, 'addActivity']);
            Route::delete('/inquiries/{id}', [ContactController::class, 'destroy']);

            // CRM Leads & Activities
            Route::apiResource('leads', LeadController::class)->except(['store']);
            Route::post('/leads/{id}/activities', [LeadController::class, 'addActivity']);

            // Popups & Announcements
            Route::apiResource('popups', PopupController::class);

            // Newsletter Subscribers
            Route::get('/subscribers', [NewsletterController::class, 'index']);
            Route::delete('/subscribers/{id}', [NewsletterController::class, 'destroy']);

            // Corporate Entities
            Route::get('/team', [TeamController::class, 'adminIndex']);
            Route::apiResource('team', TeamController::class)->except(['index']);
            Route::get('/clients', [ClientController::class, 'adminIndex']);
            Route::apiResource('clients', ClientController::class)->except(['index']);
            Route::apiResource('testimonials', TestimonialController::class)->except(['index']);
            Route::apiResource('technologies', TechnologyController::class)->except(['index']);
            Route::apiResource('industries', IndustryController::class)->except(['index']);

            // Media Library
            Route::get('/media', [MediaController::class, 'index']);
            Route::post('/media/upload', [MediaController::class, 'upload']);
            Route::delete('/media/{id}', [MediaController::class, 'destroy']);

            // CMS Settings
            Route::get('/settings', [SettingController::class, 'index']);
            Route::post('/settings', [SettingController::class, 'update']);

            // Publications Admin
            Route::get('/publications', [PublicationController::class, 'adminIndex']);
            Route::apiResource('publications', PublicationController::class)->except(['index']);

            // User Management & Access Control
            Route::apiResource('users', UserController::class);

            // Audit Logs
            Route::get('/audit-logs', [AuditLogController::class, 'index']);
        });
    });
});
