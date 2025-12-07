<?php

use App\Http\Middleware\CollectStatistics;
use App\Models\StatisticLog;
use Illuminate\Support\Facades\Route;

it('shold collect statistics from endpoint', function () {
    Route::middleware(CollectStatistics::class)
        ->get('/mock-endpoint', fn () => response()->noContent(204))
        ->name('mock');

    $this->withServerVariables(['REMOTE_ADDR' => '1.2.3.4'])
        ->get('/mock-endpoint')
        ->assertNoContent(204);

    expect(StatisticLog::count())->toBe(1);
    $log = StatisticLog::first();

    expect($log->route_name)->toBe('mock');
    expect($log->method)->toBe('GET');
    expect($log->status_code)->toBe(204);
    expect($log->ip)->toBe('1.2.3.4');
    expect((int) $log->hour)->toBe(now()->hour);
    expect((float) $log->response_time_ms)->toBeGreaterThanOrEqual(0.0);
});


