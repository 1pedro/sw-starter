<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\StatisticLog;

class ProcessStatistic implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $last5minutes = now()->subMinutes(5);
        $last24Hours = now()->subHours(24);
        $topRoutes = 5;
        $topIps = 5;

        Log::info("####### [ProcessStatistic] Processing started #######");
        $overall = DB::table('statistic_logs')
            ->where('created_at', '>=', $last5minutes)
            ->select(
                DB::raw('COUNT(*) as total_requests'),
                DB::raw('AVG(response_time_ms) as avg_response_time_ms'),
                DB::raw('MAX(response_time_ms) as max_response_time_ms'),
            )
            ->first();

        $routeMetrics = DB::table('statistic_logs')
            ->where('created_at', '>=', $last5minutes)
            ->groupBy('route_name')
            ->select('route_name',
                DB::raw('COUNT(*) as count'),
                DB::raw('AVG(response_time_ms) as avg_time')
            )
            ->orderByDesc('count')
            ->limit($topRoutes)
            ->get()
            ->toArray();

        $errorCount = DB::table('statistic_logs')
            ->where('created_at', '>=', $last5minutes)
            ->where('status_code', '>=', 400)
            ->count();

        $errorRate = $overall->total_requests > 0
            ? round(($errorCount / $overall->total_requests) * 100, 2)
            : 0;

        $ipMetrics = DB::table('statistic_logs')
            ->where('created_at', '>=', $last5minutes)
            ->groupBy('ip')
            ->select(
                'ip',
                DB::raw('COUNT(*) as count'),
                DB::raw('AVG(response_time_ms) as avg_time')
            )
            ->orderByDesc('count')
            ->limit($topIps)
            ->get()
            ->toArray();

        $popularHour = DB::table('statistic_logs')
            ->select('hour', DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', $last24Hours)
            ->groupBy('hour')
            ->orderByDesc('count')
            ->get()
            ->first();

        $statistics =  [
            'updated_at_utc' => now()->utc()->toDateTimeString(),
            'total_requests' => (int) $overall->total_requests,
            'avg_response_time_ms' => round((float) $overall->avg_response_time_ms, 3),
            'max_response_time_ms' => round((float) $overall->max_response_time_ms, 3),
            'error_rate_percent' => $errorRate,
            'top_routes_by_volume' => $routeMetrics,
            'top_ip_address_by_volume' => $ipMetrics,
            'popular_hour' => $popularHour
        ];

        Redis::set('statistics', json_encode($statistics));

        Log::info("####### [ProcessStatistic] Processing finished #######");
    }
}
