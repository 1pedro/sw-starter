<?php

use App\Jobs\ProcessStatistic;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new ProcessStatistic())->everyFiveMinutes();
