<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class Products extends Command {

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
     * @constructor
     * @return \Products
     */
	public function __construct()
	{
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

        ini_set('memory_limit', '2048M');
        Mage::app();

        $collection = array();
        $index = 1;

        $products = Mage::getResourceModel('catalog/product_collection');
        $products->addAttributeToSelect('*');
        $products->addAttributeToFilter('visibility', array('neq' => 1));
        $products->addAttributeToFilter('status', 1);
        $products->load();

        foreach ($products as $product) {

            $this->info(sprintf('Resolving model %d/%d', $index++, count($products)));

            $ids         = array();
            $categoryIds = (int) $product->getCategoryIds();
            $categoryId  = $categoryIds[0];
            $type        = Mage::getModel('catalog/category')->load($categoryId);

            foreach ($product->getCategoryIds() as $id) {

                array_push($ids, (int) $id);

                // Add any parent IDs as well.
                $category = Mage::getModel('catalog/category')->load($id);

                if ($category->parent_id) {

                    $parentCategory = Mage::getModel('catalog/category')->load($category->parent_id);

                    if ($parentCategory->parent_id) {;
                        array_push($ids, (int) $parentCategory->parent_id);
                    }

                    array_push($ids, (int) $category->parent_id);
                }

            }

            $collection[] = array(
                'id'                => (int) $product->getId(),
                'name'              => trim($product->getName()),
                'ident'             => trim($this->_createIdent($product->getName())),
                'price'             => (float) $product->getPrice(),
                'image'             => (string) $product->getMediaConfig()->getMediaUrl($product->getData('image')),
                'colour'            => (int) $product->getData('color'),
                'manufacturer'      => (int) $product->getData('manufacturer'),
                'categories'        => array_unique($ids),
                'type'              => $type
            );

        }

        // Cache the results of the collection for 30 days (43200 hours).
        Cache::put(self::PRODUCTS_CACHE_KEY, json_encode($collection), 43200);

	}

    /**
     * @method _createIdent
     * @param string $name
     * @return string
     */
    private function _createIdent($name) {

        $name   = strtolower($name);
        $name   = preg_replace('~[^A-Z0-9\s]~i', '', $name);
        $name   = str_replace(' ', '-', $name);

        return $name;

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