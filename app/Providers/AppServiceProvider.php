<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Filesystem;
use League\Flysystem\Sftp\SftpAdapter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Carbon::setLocale(config("app.locale"));
        $throttleRate = config('mail.throttleToMessagesPerMin');
        if ($throttleRate) {
            $throttlerPlugin = new \Swift_Plugins_ThrottlerPlugin($throttleRate, \Swift_Plugins_ThrottlerPlugin::MESSAGES_PER_MINUTE);
            Mail::getSwiftMailer()->registerPlugin($throttlerPlugin);
        }
        Storage::extend('sftp', function ($app, $config) {
            return new Filesystem(new SftpAdapter($config));
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
