<?php

class ProductController extends MageController {

    /**
     * @method getProduct
     * @param int $productId
     * @return string
     */
    public function getProduct($productId) {

        return Response::json($this->_getProduct($productId));

    }

}