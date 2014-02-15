<?php

namespace Moa\API\Provider;

/**
 * Provider Interface for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 */
interface ProviderInterface {

    /**
     * Start sessions, leave empty if not needed for API provider
     * @return void
     */
    public function startSession();

    /**
     * Returns product information for one product.
     * @method getProduct
     * @param int $productId
     * @return array
     */
    public function getProduct($productId);

    /**
     * Returns product information for child SKUs of product (colors, sizes, etc).
     * @method getProductVariations
     * @param int $productId
     * @return array
     */
    public function getProductVariations($productId);

    /**
     * @method getProductOptions
     * @param  string $attributeName
     * @param  bool $processCounts
     * @return array
     */
    public function getProductOptions($attributeName, $processCounts);

    public function getCurrencies();

    /**
     * @method getCategories
     * @return array
     */
    public function getCategories();

    /**
     * @method getCartItems
     * @return array
     */
    public function getCartItems();

    /**
     * @method addCartItem
     * @param int $productId
     * @return array
     */
    public function addCartItem($productId);

    /**
     * @method removeCartItem
     * @param int $id
     * @return array
     */
    public function removeCartItem($id);

    public function getCollectionForCache(callable $infolog = null);

}
