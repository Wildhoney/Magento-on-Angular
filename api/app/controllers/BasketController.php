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
     * @method removeItem
     * @param int $id
     * @return string
     */
    public function removeItem($id) {

        Mage::getSingleton('checkout/cart')->getQuote()->removeItem($id)->save();

        return Response::json(array(
            'success' => Mage::getModel('checkout/cart')->save(),
            'models'  => $this->_getItems()
        ));

    }

    /**
     * @method _getItems
     * @return array
     * @private
     */
    private function _getItems() {

        $session    = Mage::getSingleton('checkout/session');
        $quote      = $session->getQuote();
        $items      = $quote->getAllItems();
        $data       = array();

        // Calculate all of the totals.
        $totals     = $quote->getTotals();
        $subTotal   = $totals['subtotal']->getValue();
        $grandTotal = $totals['grand_total']->getValue();

        foreach ($items as $item) {

            if ($item->getProduct()->getTypeId() === 'simple') {
                $parentIds = Mage::getResourceSingleton('catalog/product_type_configurable')
                                 ->getParentIdsByChild($item->getProduct()->getEntityId());
                $parentId = (int) $parentIds[0];
            }

            $data[] = array(
                'id'        => (int) $item->getProduct()->getEntityId(),
                'parentId'  => $parentId ?: null,
                'itemId'    => (int) $item->getItemId(),
                'quantity'  => (int) $item->getQty(),
                'name'      => $item->getProduct()->getName(),
                'price'     => $item->getPrice()
            );
        }

        return array('subTotal' => $subTotal, 'grandTotal' => $grandTotal, 'items' => $data);

    }

}