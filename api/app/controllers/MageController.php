<?php

class MageController extends BaseController {

    /**
     * @constructor
     */
    public function __construct() {
//        Mage::app('default');
        Mage::app();
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

        $product    = Mage::getModel('catalog/product')->load((int) $productId);
        $products   = array();
        $models     = array();

        if ($product->getTypeId() === 'configurable') {

            $products   = $this->_getProductChildren($productId);
            $productIds = array_flatten(array_map(function($product) {
                return $product['id'];
            }, $products['collection']));

            foreach ($productIds as $productId) {
                array_push($models, $this->_getProduct($productId));
            }

        }

        return array(
            'id'            => $product->getId(),
            'sku'           => $product->getSku(),
            'name'          => $product->getName(),
            'type'          => $product->getTypeId(),
            'price'         => (float) $product->getPrice(),
            'colour'        => (int) $product->getData('color'),
            'manufacturer'  => (int) $product->getData('manufacturer'),
            'description'   => trim($product->getDescription()),
//            'largeImage'    => $product->getImageUrl(),
            'largeImage'    => (string) $product->getMediaConfig()->getMediaUrl($product->getData('image')),
            'similar'       => $product->getRelatedProductIds(),
            'gallery'       => $product->getMediaGalleryImages(),
            'products'      => $products,
            'models'        => $models
        );

    }

    /**
     * @method _getProductChildren
     * @param int $productId
     * @return array
     * @protected
     */
    protected function _getProductChildren($productId) {

        $product    = Mage::getModel('catalog/product')->load((int) $productId);
        $children   = Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null, $product);
        $attributes = $product->getTypeInstance(true)->getConfigurableAttributesAsArray($product);
        $products   = array('label' => null, 'collection' => array());

        foreach ($children as $child) {

            foreach ($attributes as $attribute) {

                $products['label'] = $attribute['store_label'];

                foreach ($attribute['values'] as $value) {

                    $childValue = $child->getData($attribute['attribute_code']);

                    if ($value['value_index'] == $childValue) {
                        $products['collection'][] = array(
                            'id'    => (int) $child->getId(),
                            'label' => $value['store_label']
                        );
                    }

                }

            }

        }

        return $products;

    }

}