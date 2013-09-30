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

    /**
     * @method getShoe
     * @param int $productId
     * @return string
     */
    public function getShoe($productId) {

        $model      = $this->_getProduct($productId);
        $children   = $this->_getProductChildren($productId);

//        die(var_dump($children));

//        foreach ($childProducts as $childProduct) {
//            $model['children'][] = array(
//                'id'        => $childProduct->getId(),
//                'sku'       => $childProduct->getSku(),
//                'name'      => $childProduct->getName(),
//                'colour'    =>
//            );
//        }
    }

}