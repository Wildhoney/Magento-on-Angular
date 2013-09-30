<?php

class MageController extends BaseController {

    /**
     * @constructor
     */
    public function __construct() {
        Mage::app('default');
    }

    /**
     * @method _createIdent
     * @param string $name
     * @return string
     * @protected
     */
    protected function _createIdent($name) {

        $name   = strtolower($name);
        $name   = preg_replace('~[^A-Z0-9\s]~i', '', $name);
        $name   = str_replace(' ', '-', $name);

        return $name;

    }

    /**
     * @method _getProduct
     * @param int $productId
     * @return array
     * @protected
     */
    protected function _getProduct($productId) {

        $product = Mage::getModel('catalog/product')->load((int) $productId);

        return array(
            'id'            => $product->getId(),
            'sku'           => $product->getSku(),
            'name'          => $product->getName(),
            'colour'        => (int) $product->getData('color'),
            'manufacturer'  => (int) $product->getData('manufacturer'),
            'description'   => trim($product->getDescription()),
            'largeImage'    => $product->getSmallImageUrl(),
            'similar'       => $product->getRelatedProductIds(),
            'gallery'       => $product->getMediaGalleryImages()
        );

    }

    /**
     * @method _getProductChildren
     * @param int $productId
     * @return array
     * @protected
     */
    protected function _getProductChildren($productId) {

        $product = Mage::getModel('catalog/product')->load((int) $productId);
        return Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null, $product);

    }

}