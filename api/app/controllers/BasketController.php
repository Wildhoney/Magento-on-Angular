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
     * @return string
     */
    public function addItem($productId) {

        return Response::json($this->api->addCartItem($productId));

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