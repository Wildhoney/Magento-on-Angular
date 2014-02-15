<?php

use Moa\API\Provider\ProviderInterface;

class BaseAPIController extends BaseController {

    protected $api;

    /**
     * @constructor
     */
    public function __construct(ProviderInterface $api) {
        $this->api = $api;
        $this->api->startSession();
    }

}
