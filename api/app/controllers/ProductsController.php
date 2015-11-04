<?php

class ProductsController extends BaseAPIController {

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
        Artisan::call('products');
        return Cache::get(self::PRODUCTS_CACHE_KEY);
    }

}