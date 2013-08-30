<?php

class MageController extends BaseController {

    public function __construct() {
        Mage::app('default');
    }

}