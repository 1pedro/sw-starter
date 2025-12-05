<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class MigrateOnBootServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
            Log::info("MigrateOnBootServiceProvider started");
        if (! $this->app->runningInConsole()) {
            Log::info("[sqlite] Migrating connection");
            Artisan::call('migrate', [
                    '--database' => 'sqlite', // Replace with your connection name
                    '--force' => true, // Use with caution, forces migrations in production
            ]);
            Log::info("[sqlite] Migration completed");
            }
    }
}
