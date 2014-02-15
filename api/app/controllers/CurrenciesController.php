<?php

class CurrenciesController extends BaseAPIController {

    public function getCurrencies() {
        $options = $this->api->getCurrencies();
        return Response::json($options);
    }

}