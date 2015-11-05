<?php

namespace App\Console\Commands;

/**
 * Magento Products Caching Class
 *
 * @author Vallabh Kansagara <vrkansagara@gmail.com>
 */

use Illuminate\Console\Command;
use Cache;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Moa\API\Provider\ProviderInterface;

class Products extends Command
{

    /**
     * @const IMAGE_PATH
     * @type string
     */
    const IMAGE_PATH = 'localhost';

    /**
     * @const PRODUCTS_CACHE_KEY
     * @type string
     */
    const PRODUCTS_CACHE_KEY = 'products';


    /**
     * @property $api
     * @var Moa\API\Provider\ProviderInterface
     */
    private $api;


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products';

    /**
     * @property string $description
     * @type string
     */
    protected $description = 'Generate a cache of the products in the Magento database.';


    /**
     * @constructor
     * @return \Products
     */
    public function __construct(ProviderInterface $api)
    {
        $this->api = $api;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if (Cache::get(self::PRODUCTS_CACHE_KEY)) {
            return;
        }

        $log = array($this, 'info');

        ini_set('memory_limit', '2048M');
        $collection = $this->api->getCollectionForCache($log);

        // Cache the results of the collection for 30 days (43200 min).
        Cache::put(self::PRODUCTS_CACHE_KEY, json_encode($collection), 43200);
    }


    /**
     * @method getArguments
     * @return array
     * @todo get console arguments
     */
    protected function getArguments()
    {
        return array();
    }

    /**
     * @method getOptions
     * @return array
     * @todo get more option for the artisan commands.
     */
    protected function getOptions()
    {
        return array();
    }


}
