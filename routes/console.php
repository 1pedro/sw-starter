<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Jobs\ProcessStatistic;

Schedule::job(new ProcessStatistic)->everyFiveSeconds();
