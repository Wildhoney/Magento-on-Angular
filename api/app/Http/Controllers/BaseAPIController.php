<?php

namespace App\Http\Controllers;

use Moa\API\Provider\ProviderInterface;

class BaseAPIController extends Controller
{

    protected $api;

    /**
     * @constructor
     */
    public function __construct(ProviderInterface $api)
    {
        $this->api = $api;
        $this->api->startSession();
    }

    protected function setupLayout()
    {
        if (!is_null($this->layout)) {
            $this->layout = View::make($this->layout);
        }
    }

}
