<?php


namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Matriphe\Md5Hash\Md5Hasher;

class HashServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the application services.
     *
     */
    public function register()
    {
        $this->app->singleton('hash', function ($app) {
            return new Md5Hasher();
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['hash'];
    }
}