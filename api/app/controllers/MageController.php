<?php

class MageController extends BaseController {

    public function __construct() {
        Mage::app('default');
    }

    protected function _createIdent($name) {

        $name   = strtolower($name);
        $name   = preg_replace('~[^A-Z0-9\s]~i', '', $name);
        $name   = str_replace(' ', '-', $name);

        return $name;

    }

}