<?php

class AttributesController extends BaseAPIController {

    /**
     * @const PROCESS_COUNTS
     * @type boolean
     * @default true
     */
    const PROCESS_COUNTS = false;

    /**
     * @method getOptions
     * @param  string $attributeName
     * @return string
     */
    public function getOptions($attributeName) {
        $response = $this->api->getProductOptions($attributeName, self::PROCESS_COUNTS);
        return Response::json($response);
    }

}