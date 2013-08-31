<?php

class ProductController extends MageController {

    public function getProduct($productId) {

        $product = Mage::getModel('catalog/product')->load((int) $productId);

        $model = array(
            'id'            => $product->getId(),
            'sku'           => $product->getSku(),
            'name'          => $product->getName(),
            'description'   => trim($product->getDescription())
        );

        return Response::json($model);

    }

}