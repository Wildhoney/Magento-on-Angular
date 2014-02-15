<?php

namespace Moa\API\Provider;

/**
 * Magento API provider for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 */
class MagentoProvider extends AbstractProvider implements ProviderInterface {

    /**
     * Initialize the Mage environment
     */
    public function __construct($config) {
        umask(0);
        chdir($config['path']);
        require_once $config['path'] . '/app/Mage.php';
        \Mage::app($config['store']);
    }

    /**
     * Start sessions for Magento
     */
    public function startSession() {
        session_start();
        \Mage::getSingleton('customer/session')->start();
    }

    /**
     * Returns product information for one product.
     * @method getProduct
     * @param int $productId
     * @return array
     */
    public function getProduct($productId) {

        $product    = \Mage::getModel('catalog/product')->load((int) $productId);
        $products   = array();
        $models     = array();

        if ($product->getTypeId() === 'configurable') {

            $products   = $this->getProductVariations($productId);
            $productIds = array_flatten(array_map(function($product) {
                return $product['id'];
            }, $products['collection']));

            foreach ($productIds as $productId) {
                array_push($models, $this->getProduct($productId));
            }

        }

        $friendModel = \Mage::getModel('sendfriend/sendfriend');

        return array(
            'id'            => $product->getId(),
            'sku'           => $product->getSku(),
            'name'          => $product->getName(),
            'type'          => $product->getTypeId(),
            'quantity'      => $product->getQty(),
            'friendUrl'     => $friendModel->canEmailToFriend() ? \Mage::app()->getHelper('catalog/product')->getEmailToFriendUrl($product) : null,
            'price'         => (float) $product->getPrice(),
            'colour'        => (int) $product->getData('color'),
            'manufacturer'  => (int) $product->getData('manufacturer'),
            'description'   => trim($product->getDescription()),
            'largeImage'    => (string) $product->getMediaConfig()->getMediaUrl($product->getData('image')),
            'similar'       => $product->getRelatedProductIds(),
            'gallery'       => $product->getMediaGalleryImages(),
            'products'      => $products,
            'models'        => $models
        );

    }

    /**
     * Returns product information for child SKUs of product (colors, sizes, etc).
     * @method getProductVariations
     * @param int $productId
     * @return array
     */
    public function getProductVariations($productId) {

        $product    = \Mage::getModel('catalog/product')->load((int) $productId);
        $children   = \Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null, $product);
        $attributes = $product->getTypeInstance(true)->getConfigurableAttributesAsArray($product);
        $products   = array('label' => null, 'collection' => array());

        foreach ($children as $child) {

            foreach ($attributes as $attribute) {

                $products['label'] = $attribute['store_label'];

                foreach ($attribute['values'] as $value) {

                    $childValue = $child->getData($attribute['attribute_code']);

                    if ($value['value_index'] == $childValue) {
                        $products['collection'][] = array(
                            'id'    => (int) $child->getId(),
                            'label' => $value['store_label']
                        );
                    }

                }

            }

        }

        return $products;

    }

}
