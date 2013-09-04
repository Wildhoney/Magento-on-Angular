<?php

class AttributesController extends MageController {

    public function getOptions($attributeName) {

        $attribute = Mage::getSingleton('eav/config')->getAttribute('catalog_product', $attributeName);

        if ($attribute->usesSource()) {
            $options = $attribute->getSource()->getAllOptions(false);
        }

        return Response::json($options);

    }

}