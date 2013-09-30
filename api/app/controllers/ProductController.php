<?php

class ProductController extends MageController {

    public function getProduct($productId) {

        $model = $this->_getProduct($productId);

//        $childProducts = Mage::getModel('catalog/product_type_configurable')
//                            ->getUsedProducts(null, $product);

//        foreach ($childProducts as $childProduct) {
//            $model['children'][] = array(
//                'id'        => $childProduct->getId(),
//                'sku'       => $childProduct->getSku(),
//                'name'      => $childProduct->getName(),
//                'colour'    =>
//            );
//        }

        return Response::json($model);

    }

    public function getShoe($productId) {

        $model = $this->_getProduct($productId);
        die(var_dump($model));

    }

    /**
     * @method _getProduct
     * @param int $productId
     * @return array
     * @private
     */
    private function _getProduct($productId) {

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

}