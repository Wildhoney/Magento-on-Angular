<?php

class ProductController extends MageController {

    /**
     * @method getProduct
     * @param integer $productId
     * @return string
     */
    public function getProduct($productId) {

        return Response::json($this->_getProduct($productId));

    }

}