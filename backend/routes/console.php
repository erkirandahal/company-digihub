<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Scheduled tasks for Digihub Innovation Center
Schedule::command('sanctum:prune-expired --hours=24')->daily();
Schedule::command('queue:work --stop-when-empty')->everyFiveMinutes();
