<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use stdClass;

class ProcessStatistic implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $last5minutes = now()->subMinutes(5);
        $last24Hours = now()->subHours(24);
        $topRoutesCount = 5;
        $topIpsCount = 5;

        Log::info("####### [ProcessStatistic] Processing started #######");

        $responseTime = $this->getResponseTimeMetrics($last5minutes);
        $routesMetrics = $this->getRouteMetrics($last5minutes, $topRoutesCount);
        $errorCount = $this->getErrorCountMetrics($last5minutes);
        $errorRate = $this->getErrorRateMetrics($responseTime, $errorCount);
        $ipMetrics = $this->getIpMetrics($last5minutes, $topIpsCount);
        $popularHour = $this->getPopularHourMetric($last24Hours);

        $statistics =  [
            'updated_at_utc' => now()->utc()->toDateTimeString(),
            'total_requests' => (int) $responseTime->total_requests,
            'avg_response_time_ms' => round((float) $responseTime->avg_response_time_ms, 3),
            'max_response_time_ms' => round((float) $responseTime->max_response_time_ms, 3),
            'error_rate_percent' => $errorRate,
            'top_routes_by_volume' => $routesMetrics,
            'top_ip_address_by_volume' => $ipMetrics,
            'popular_hour' => $popularHour,
        ];

        Cache::put('statistics', $statistics, 300); // 5 minutes

        Log::info("####### [ProcessStatistic] Processing finished #######");
    }
    /**
     * @return Carbon
     */
    private function getResponseTimeMetrics(Carbon $period): stdClass
    {
        return DB::table('statistic_logs')
            ->where('created_at', '>=', $period)
            ->select(
                DB::raw('COUNT(*) as total_requests'),
                DB::raw('AVG(response_time_ms) as avg_response_time_ms'),
                DB::raw('MAX(response_time_ms) as max_response_time_ms'),
            )
            ->first();
    }
    /**
     * @return array
     */
    private function getRouteMetrics(Carbon $period, int $count): array
    {
        $routeMetrics = DB::table('statistic_logs')
                   ->where('created_at', '>=', $period)
                   ->groupBy('route_name')
                   ->select(
                       'route_name',
                       DB::raw('COUNT(*) as count'),
                       DB::raw('AVG(response_time_ms) as avg_time')
                   )
                   ->orderByDesc('count')
                   ->limit($count)
                   ->get()
                   ->toArray();
        return $routeMetrics;
    }

    private function getErrorCountMetrics(Carbon $period): int
    {
        $errorCount = DB::table('statistic_logs')
                    ->where('created_at', '>=', $period)
                    ->where('status_code', '>=', 400)
                    ->count();
        return $errorCount;
    }

    /**
     * @param array $responseTime
     */
    private function getErrorRateMetrics(stdClass $responseTime, int $count): float|int
    {
        $errorRate = $responseTime->total_requests > 0
                   ? round(($count / $responseTime->total_requests) * 100, 2)
                   : 0;
        return $errorRate;
    }

    /**
     * @return array<TKey,mixed>
     */
    private function getIpMetrics(Carbon $period, int $count): array
    {
        $ipMetrics = DB::table('statistic_logs')
                    ->where('created_at', '>=', $period)
                    ->groupBy('ip')
                    ->select(
                        'ip',
                        DB::raw('COUNT(*) as count'),
                        DB::raw('AVG(response_time_ms) as avg_time')
                    )
                    ->orderByDesc('count')
                    ->limit($count)
                    ->get()
                    ->toArray();
        return $ipMetrics;
    }

    private function getPopularHourMetric(Carbon $period): stdClass
    {
        $popularHour = DB::table('statistic_logs')
                    ->select('hour', DB::raw('COUNT(*) as count'))
                    ->where('created_at', '>=', $period)
                    ->groupBy('hour')
                    ->orderByDesc('count')
                    ->get()
            ->first();

        return $popularHour;
    }
}
