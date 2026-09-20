<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'company' => 'DIGIHUB INNOVATION CENTER PVT. LTD.',
        'status' => 'online',
        'api_version' => 'v1',
        'api_docs' => '/api/v1/health',
    ]);
});
