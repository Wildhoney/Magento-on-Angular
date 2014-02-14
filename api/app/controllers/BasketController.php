<?php

class BasketController extends MageController {

    /**
     * @method getItems
     * @return string
     */
    public function getItems() {

        Mage::getSingleton('core/session', array('name' => 'frontend'));

        return Response::json($this->_getItems());

    }

    /**
     * @method addItem
     * @param int $productId
     * @return string
     */
    public function addItem($productId) {

        $response = array('success' => true, 'error' => null, 'models' => array());

        try {

            Mage::getSingleton('core/session', array('name' => 'frontend'));
            $session = Mage::getSingleton("customer/session");

            $product = Mage::getModel('catalog/product')->load((int) $productId);

            $basket = Mage::getSingleton('checkout/cart');
            $basket->addProduct($product, 1);
            $basket->save();

            // Fetch the items from the user's basket.
            $response['models'] = $this->_getItems();

        } catch (Exception $e) {

            $response['success'] = false;

            switch ($e->getMessage()) {

                case 'This product is currently out of stock.':
                    $response['error'] = 'stock';
                    break;

                default:
                    $response['error'] = 'unknown';
                    break;

            }

        }

        return Response::json($response);

    }

    /**
     * @method _getItems
     * @return array
     * @private
     */
    private function _getItems() {

        $session    = Mage::getSingleton('checkout/session');
        $items      = $session->getQuote()->getAllItems();
        $data       = array();

        foreach ($items as $item) {

            $data[] = array(
                'id'        => (int) $item->getProduct()->getEntityId(),
                'quantity'  => (int) $item->getQty(),
                'name'      => $item->getProduct()->getName()
            );
        }

        return $data;

    }

}