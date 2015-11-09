<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Artisan Product Cached using console command.
     *
     * @author Vallabh Kansagara <vrkansagara@gmail.com>
     * @var array
     */
    protected $commands
        = [
            \App\Console\Commands\Inspire::class,
            \App\Console\Commands\Products::class,
        ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     *
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('inspire')
            ->hourly();
    }
}
