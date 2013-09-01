<?php

class ProductsController extends MageController {

    public function getProducts() {

        $products   = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('*');
        $collection = array();

        foreach ($products as $product) {

            $collection[] = array(
                'id'    => $product->getId(),
                'name'  => $product->getName(),
                'price' => $product->getPrice(),
                'image' => basename($product->getThumbnailUrl())
            );

        }

        return Response::json($collection);

    }

}