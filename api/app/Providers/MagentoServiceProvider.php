<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class MagentoServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * @todo  $ns_class will be changed.
         * @fixme Use dynamic ns_class provider like old library.
         *
         */
        $this->app->bind(
            'Moa\API\Provider\ProviderInterface', function ($app) {
            $provider = $app['config']->get('moa.api.provider');
            $config = $app['config']->get('moa.' . $provider);
            $class = studly_case($provider) . 'Provider';
//            $ns_class = '\Moa\API\Provider\\' . $class;
            $ns_class = '\Moa\API\Provider\MagentoProvider';

            $api = new $ns_class($config);
            return $api;
        }
        );
    }
}
