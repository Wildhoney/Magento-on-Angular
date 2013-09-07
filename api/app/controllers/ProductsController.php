<?php

class ProductsController extends MageController {

    public function getProducts() {

        $products   = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('*');
        $collection = array();

        foreach ($products as $product) {

            $ids = array();

            foreach ($product->getCategoryIds() as $id) {

                array_push($ids, (int) $id);

                // Add any parent IDs as well.
                $category = Mage::getModel('catalog/category')->load($id);

                if ($category->parent_id) {
                    array_push($ids, (int) $category->parent_id);
                }

            }

            $collection[] = array(
                'id'            => (int) $product->getId(),
                'name'          => trim($product->getName()),
                'ident'         => trim($this->_createIdent($product->getName())),
                'price'         => (float) $product->getPrice(),
                'image'         => $product->getThumbnailUrl(),
                'colour'        => (int) $product->getData('color'),
                'manufacturer'  => (int) $product->getData('manufacturer'),
                'categories'    => $ids
            );

        }

        return Response::json($collection);

    }

}