<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use App\Models\StatisticLog;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {


            #Log::info("MigrateOnBootServiceProvider started");
            #Artisan::call('migrate', [
            #        '--database' => 'sqlite', // Replace with your connection name
            #        '--force' => true, // Use with caution, forces migrations in production
            #]);
            #StatisticLog::truncate();
            #Log::info("[sqlite] Migration completed");
    }
}
