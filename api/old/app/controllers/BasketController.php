<?php

class BasketController extends BaseAPIController {

    /**
     * @method getItems
     * @return string
     */
    public function getItems() {
        return Response::json($this->api->getCartItems());
    }

    /**
     * @method addItem
     * @param int $productId
     * @param int $quantity
     * @return string
     */
    public function addItem($productId, $quantity) {
        return Response::json($this->api->addCartItem($productId, $quantity));
    }

    /**
     * @method removeItem
     * @param int $id
     * @return string
     */
    public function removeItem($id) {
        return Response::json($this->api->removeCartItem($id));
    }

}