<?php

class AttributesController extends MageController {

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

        /**
         * @method getCount
         * @param number $value
         * @return int
         */
        $getCount = function ($value) use ($attributeName) {
            $collection = Mage::getModel('catalog/product')->getCollection();
            $collection->addFieldToFilter(array(array('attribute' => $attributeName, 'eq' => $value)));
            return count($collection);
        };

        $attribute = Mage::getSingleton('eav/config')->getAttribute('catalog_product', $attributeName);
        $options   = array();

        if ($attribute->usesSource()) {
            $options = $attribute->getSource()->getAllOptions(false);
        }

        $response = array();

        foreach ($options as $option) {

            $current = array(
                'id'    => (int) $option['value'],
                'label' => $option['label']
            );

            if (self::PROCESS_COUNTS) {

                // Process the counts if the developer wants them to be!
                $response['count'] = $getCount($option['value']);

            }

            $response[] = $current;

        }

        return Response::json($response);

    }

}