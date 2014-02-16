<?php
namespace Moa\API\Provider\Magento;

/**
 * Magento API provider traits for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
trait Cart {

    /**
     * @method addCartItem
     * @param int $productId
     * @param int $quantity
     * @return array
     */
    public function addCartItem($productId, $quantity)
    {
        $response = array('success' => true, 'error' => null, 'models' => array());

        try {

            $this->frontEndSession();

            $product = \Mage::getModel('catalog/product')->load((int) $productId);

            $basket = \Mage::getSingleton('checkout/cart');
            $basket->addProduct($product, $quantity ?: 1);
            $basket->save();

            // Fetch the items from the user's basket.
            $response['models'] = $this->getCartItems();

        } catch (\Exception $e) {

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

        return $response;
    }

    /**
     * @method removeCartItem
     * @param int $id
     * @return array
     */
    public function removeCartItem($id)
    {
        \Mage::getSingleton('checkout/cart')->getQuote()->removeItem($id)->save();

        return array(
            'success' => \Mage::getModel('checkout/cart')->save(),
            'models'  => $this->getCartItems()
        );
    }

    /**
     * @method getCartItems
     * @return array
     */
    public function getCartItems()
    {
        $this->frontEndSession();

        $session    = \Mage::getSingleton('checkout/session');
        $quote      = $session->getQuote();
        $items      = $quote->getAllItems();
        $data       = array();

        // Calculate all of the totals.
        $totals     = $quote->getTotals();
        $subTotal   = $totals['subtotal']->getValue();
        $grandTotal = $totals['grand_total']->getValue();

        foreach ($items as $item) {

            if ($item->getProduct()->getTypeId() === 'simple') {
                $parentIds = \Mage::getResourceSingleton('catalog/product_type_configurable')
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