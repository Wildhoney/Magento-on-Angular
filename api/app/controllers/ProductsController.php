<?php

class ProductsController extends MageController {

    public function getProducts() {

        $products   = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('*');
        $collection = array();

        foreach ($products as $product) {

            $ids = array();

            foreach ($product->getCategoryIds() as $id) {
                array_push($ids, (int) $id);
            }

            $collection[] = array(
                'id'            => $product->getId(),
                'name'          => $product->getName(),
                'price'         => $product->getPrice(),
                'image'         => basename($product->getThumbnailUrl()),
                'categories'    => $ids
            );

        }

        return Response::json($collection);

    }

}