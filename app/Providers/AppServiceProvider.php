<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

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
        //
            Artisan::call('migrate', [
                    '--database' => 'sqlite', // Replace with your connection name
                    '--force' => true, // Use with caution, forces migrations in production
            ]);
           /* Log::emergency("MigrateOnBootServiceProvider started");
        if (! $this->app->runningInConsole()) {
            Log::emergency("[sqlite] Migrating connection");
            Artisan::call('migrate', [
                    '--database' => 'sqlite', // Replace with your connection name
                    '--force' => true, // Use with caution, forces migrations in production
            ]);
            Log::emergency("[sqlite] Migration completed");
        } */
    }
}
