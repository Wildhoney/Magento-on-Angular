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

}
