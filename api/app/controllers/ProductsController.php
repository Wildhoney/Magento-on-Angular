<?php

class ProductsController extends MageController {

    public function all() {

        $products   = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('*');
        $collection = array();

        foreach ($products as $product) {

            $collection[] = array(
                'name'  => $product->getName(),
                'price' => $product->getPrice()
            );

        }

        return Response::json($collection);

    }

}