<?php
namespace Moa\Laravel; 

use Illuminate\Support\ServiceProvider;

/**
 * Backend store API service provider
 *
 * @author Raja Kapur <raja.kapur@gmail.com> 
 */
class APIServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Binds the API provider specified in config.json@moa.api.provider to
     * Moa\API\Provider\ProviderInterface.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('Moa\API\Provider\ProviderInterface', function($app) {
            $provider = $app['config']->get('moa.api.provider');
            $config   = $app['config']->get('moa.' . $provider);
            $class    = studly_case($provider) . 'Provider';
            $ns_class = '\Moa\API\Provider\\' . $class;

            $api = new $ns_class($config);
            return $api;
        });
    }
}