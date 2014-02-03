<?php

class ProductsController extends MageController {

    /**
     * @const PRODUCTS_CACHE_KEY
     * @type string
     */
    const PRODUCTS_CACHE_KEY = 'products';

    /**
     * @method getProducts
     * @return string
     */
    public function getProducts() {

        // Respond with the collection from the cache.
        return Cache::get(self::PRODUCTS_CACHE_KEY);

    }

}