<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use App\Models\StatisticLog;

class CollectStatistics
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
   $startTime = microtime(true);

        $response = $next($request);

        $endTime = microtime(true);
        $responseTimeMs = round(($endTime - $startTime) * 1000, 3); // Convert to ms

        StatisticLog::create([
            'route_name' => $request->route()?->getName(),
            'method' => $request->method(),
            'response_time_ms' => $responseTimeMs,
            'status_code' => $response->getStatusCode(),
            'hour' => now()->hour,
            'ip' => $request->ip(),
        ]);

        return $response;
    }
}
