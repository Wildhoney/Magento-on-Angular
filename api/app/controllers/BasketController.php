<?php

class BasketController extends MageController {

    public function getItems() {

        Mage::getSingleton('core/session', array('name' => 'frontend'));

        $session    = Mage::getSingleton('checkout/session');
        $items      = $session->getQuote()->getAllItems();
        $data       = array();

        foreach ($items as $item) {

            $data[] = array(
                'id'        => (int) $item->getProduct()->getEntityId(),
                'quantity'  => (int) $item->getQty()
            );
        }

        return Response::json($data);

    }

    public function addItem($productId) {

        Mage::getSingleton('core/session', array('name' => 'frontend'));

        $product = Mage::getModel('catalog/product')->load((int) $productId);

        $basket = Mage::getSingleton('checkout/cart');
        $basket->addProduct($product, 1);
        $basket->save();

    }

}