<?php

namespace Moa\Laravel; 

use Illuminate\Support\ServiceProvider;

/**
 * Magento service provider
 *
 * @author Raja Kapur <raja.kapur@gmail.com> 
 */
class MageServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $path = $this->app['config']->get('moa.magento.path');
        umask(0); chdir($path);
        require_once $path . '/app/Mage.php';
        \Mage::app($this->app['config']->get('moa.magento.store'));
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array('mage');
    }
}
