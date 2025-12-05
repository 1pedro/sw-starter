<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if(!Schema::hasTable("statistic_logs")){
            Schema::connection("sqlite")->create("statistic_logs", function (Blueprint $table){
                $table->id();
                $table->string('route_name')->nullable()->index();
                $table->string('method', 10);
                $table->float('response_time_ms', 8, 3);
                $table->integer('status_code');
                $table->string("ip");
                $table->string("hour");
                $table->timestamps();
                $table->index('created_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("statistic_logs");
    }
};
