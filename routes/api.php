<?php

use App\Http\Middleware\CollectStatistics;
use App\Models\StatisticLog;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/statistics', function () {
    return StatisticLog::all();
})->name('statistics');


Route::get('/hello', function () {
    return ["hello" => "world"];
})->name('hello')->middleware(CollectStatistics::class);

