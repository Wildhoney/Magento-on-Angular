<?php

class AccountController extends BaseAPIController {

    public function login() {

        $email    = Input::get('email');
        $password = Input::get('password');

        return Response::json($this->api->login($email, $password));

    }

    public function register() {

        $firstName = Input::get('firstName');
        $lastName  = Input::get('lastName');
        $email     = Input::get('email');
        $password  = Input::get('password');

        return Response::json($this->api->register($firstName, $lastName, $email, $password));

    }

    public function getAccount() {
        return Response::json($this->api->getAccount());
    }

}