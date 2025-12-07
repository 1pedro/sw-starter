<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatisticLog extends Model
{
    protected $connection = "sqlite";
    protected $fillable = [
        "route_name",
        "method",
        "response_time_ms",
        "status_code",
        "ip",
        "hour",
    ];
}
