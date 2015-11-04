<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Moa\API\Provider\ProviderInterface;

class Products extends Command {

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
     * @property string $name
     * @type string
     */
    protected $name = 'products';

    /**
     * @property string $description
     * @type string
     */
    protected $description = 'Generate a cache of the products in the Magento database.';

    /**
     * @property $api
     * @var Moa\API\Provider\ProviderInterface
     */
    private $api;

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
     * @method fire
     * @return void
     */
    public function fire()
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
     */
    protected function getArguments()
    {
        return array();
    }

    /**
     * @method getOptions
     * @return array
     */
    protected function getOptions()
    {
        return array();
    }

}
