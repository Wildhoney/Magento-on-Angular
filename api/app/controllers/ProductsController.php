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

//        if (!Cache::has(self::PRODUCTS_CACHE_KEY)) {
//
//            // Invoke the "products" command if it hasn't been cached already.
//            Artisan::call('products');
//
//        }

        // Response with the collection from the cache.
        return Cache::get(self::PRODUCTS_CACHE_KEY);

    }

}