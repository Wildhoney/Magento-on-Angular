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
     * 
     * @return void
     */
    public function startSession();

    /**
     * Returns product information for one product.
     *
     * @method getProduct
     * @param int $productId
     * @return array
     */
    public function getProduct($productId);

    /**
     * Returns product information for child SKUs of product (colors, sizes, etc).
     * 
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

    /**
     * @method getCollectionForCache
     * @param callable $infolog
     * @return array
     */
    public function getCollectionForCache(callable $infolog = null);

    /**
     * @method getCurrencies
     * @return array
     */
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
     * @param int $quantity
     * @return array
     */
    public function addCartItem($productId, $quantity);

    /**
     * @method removeCartItem
     * @param int $id
     * @return array
     */
    public function removeCartItem($id);

    /**
     * @method login
     * @param string $email
     * @param string $password
     * @return array
     */
    public function login($email, $password);

    /**
     * @method logout
     * @return array
     */
    public function logout();

    /**
     * @method register
     * @param string $firstName
     * @param string $lastName
     * @param string $email
     * @param string $password
     * @return array
     */
    public function register($firstName, $lastName, $email, $password);

    /**
     * @method getAccount
     * @return array
     */
    public function getAccount();
    
}