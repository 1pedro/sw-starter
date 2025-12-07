<?php

use App\Http\Controllers\StarWarsController;
use App\Http\Middleware\CollectStatistics;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

Route::get('/statistics', function () {
    return response()->json(Cache::get("statistics"));
})->name('statistics');

Route::get('/search/{kind}', [StarWarsController::class, "search"])
    ->name('search')
    ->middleware(CollectStatistics::class);

Route::get('/{kind}/{id}', [StarWarsController::class, "getById"])
    ->name('getById')
    ->middleware(CollectStatistics::class);
