<?php

use App\Http\Middleware\CollectStatistics;
use App\Models\StatisticLog;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Jobs\ProcessStatistic;

Route::get('/statistics', function () {
    return response()->json(json_decode(Redis::get("statistics")));

})->name('statistics');


Route::get('/hello', function () {
    return ["hello" => "world"];
})->name('hello')->middleware(CollectStatistics::class);

