<?php

class ProductController extends BaseAPIController {

    /**
     * @method getProduct
     * @param integer $productId
     * @return string
     */
    public function getProduct($productId) {
        return Response::json($this->api->getProduct($productId));
    }

}