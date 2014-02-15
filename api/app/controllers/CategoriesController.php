<?php

class CategoriesController extends BaseAPIController {

    /**
     * @method getCategories
     * @return string
     */
    public function getCategories() {
        return Response::json($this->api->getCategories());
    }

}