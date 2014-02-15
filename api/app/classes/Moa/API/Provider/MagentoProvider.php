<?php

namespace Moa\API\Provider;

/**
 * Magento API provider for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
class MagentoProvider extends AbstractProvider implements ProviderInterface {

    /**
     * Initialize the Mage environment.
     * @constructor
     */
    public function __construct($config) {
        umask(0);
        chdir($config['path']);
        require_once $config['path'] . '/app/Mage.php';
        \Mage::app($config['store']);
    }

    /**
     * Start sessions for Magento.
     *
     * @method startSession
     * @return void
     */
    public function startSession() {
        session_start();
        \Mage::getSingleton('customer/session')->start();
    }

    /**
     * Returns product information for one product.
     *
     * @method getProduct
     * @param int $productId
     * @return array
     */
    public function getProduct($productId) {

        /** @var \Mage_Catalog_Model_Product $product */
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

        /** @var \Mage_Sendfriend_Model_Sendfriend $friendModel */
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

        /** @var \Mage_Catalog_Model_Product $product */
        $product = \Mage::getModel('catalog/product')->load((int) $productId);

        /** @var \Mage_Catalog_Model_Product $children */
        $children = \Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null, $product);

        /** @var \Mage_Catalog_Model_Product $attributes */
        $attributes = $product->getTypeInstance(true)->getConfigurableAttributesAsArray($product);

        $products = array('label' => null, 'collection' => array());

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

    /**
     * @method getProductOptions
     * @param string $attributeName
     * @param bool $processCounts
     * @return string
     */
    public function getProductOptions($attributeName, $processCounts) {
        /**
         * @method getCount
         * @param number $value
         * @return int
         */
        $getCount = function ($value) use ($attributeName) {
            $collection = \Mage::getModel('catalog/product')->getCollection();
            $collection->addFieldToFilter(array(array('attribute' => $attributeName, 'eq' => $value)));
            return count($collection);
        };

        $attribute = \Mage::getSingleton('eav/config')->getAttribute('catalog_product', $attributeName);
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

            if ($processCounts) {

                // Process the counts if the developer wants them to be!
                $response['count'] = $getCount($option['value']);

            }

            $response[] = $current;

        }

        return $response;
    }

    /**
     * @method getCurrencies
     * @return array
     */
    public function getCurrencies() {
        $baseCode = \Mage::app()->getBaseCurrencyCode();
        $options  = array();

        $allowedCurrencies = \Mage::getModel('directory/currency')->getConfigAllowCurrencies();
        $rates = \Mage::getModel('directory/currency')->getCurrencyRates($baseCode, array_values($allowedCurrencies));

        if (count($rates) > 0) {
            foreach ($rates as $symbol => $rate) {
                array_push($options, array(
                    'code'   => $symbol,
                    'symbol' => \Mage::app()->getLocale()->currency($symbol)->getSymbol(),
                    'rate'   => round($rate, 20),
                    'base'   => ($symbol === $baseCode)
                ));
            }
        } else {
            $options[] = array(
                'code'   => $baseCode,
                'symbol' => \Mage::app()->getLocale()->currency($baseCode)->getSymbol(),
                'rate'   => 1,
                'base'   => true
            );
        }

        return $options;
    }

    /**
     * @method getCategories
     * @return array
     */
    public function getCategories() {

        $categories = \Mage::helper('catalog/category')->getStoreCategories();
        $collection = array();

        foreach ($categories as $category) {

            // Determine if the category is currently active.
            $isActive = (bool) $category->getIsActive();

            if (!$isActive) {

                // If the category isn't active then there's no sense in continuing.
                continue;

            }

            $productCount = function($categoryId) {

                $products = \Mage::getModel('catalog/category')->load($categoryId)
                            ->getProductCollection()
                            ->addAttributeToSelect('entity_id')
                            ->addAttributeToFilter('status', 1)
                            ->addAttributeToFilter('visibility', 4);

                return count($products);

            };

            // Load the category's model because it's active.
            $category = \Mage::getModel('catalog/category')->load($category->getId());

            // Begin constructing the response by placing the name of the category into the array.
            $current = array(
                'id'            => (int) $category->getId(),
                'ident'         => $this->createIdent($category->getName()),
                'name'          => $category->getName(),
                'productCount'  => $productCount($category->getId()),
                'children'      => array()
            );

            // Discover the category's sub-categories.
            $subCategoryIds = explode(',', $category->getChildren());

            foreach ($subCategoryIds as $subCategoryId) {

                // Load the sub-categories one-by-one, pushing them into the array.
                $subCategory = \Mage::getModel('catalog/category')->load($subCategoryId);

                // Prepare the model for appending to the collection.
                $model = array(
                    'id'            => (int) $subCategory->getId(),
                    'ident'         => $this->_createIdent($subCategory->getName()),
                    'name'          => $subCategory->getName(),
                    'productCount'  => $productCount($subCategory->getId()),
                );

                $current['children'][] = $model;

            }

            // Finally we can place the category in the list of categories.
            $collection[] = $current;

        }

        return $collection;
    }

    /**
     * @method addCartItem
     * @param int $productId
     * @return array
     */
    public function addCartItem($productId) {

        $response = array('success' => true, 'error' => null, 'models' => array());

        try {

            $this->frontEndSession();

            $product = \Mage::getModel('catalog/product')->load((int) $productId);

            $basket = \Mage::getSingleton('checkout/cart');
            $basket->addProduct($product, 1);
            $basket->save();

            // Fetch the items from the user's basket.
            $response['models'] = $this->getCartItems();

        } catch (\Exception $e) {

            $response['success'] = false;

            switch ($e->getMessage()) {

                case 'This product is currently out of stock.':
                    $response['error'] = 'stock';
                    break;

                default:
                    $response['error'] = 'unknown';
                    break;

            }

        }

        return $response;
    }

    /**
     * @method removeCartItem
     * @param int $id
     * @return array
     */
    public function removeCartItem($id) {
        \Mage::getSingleton('checkout/cart')->getQuote()->removeItem($id)->save();

        return array(
            'success' => \Mage::getModel('checkout/cart')->save(),
            'models'  => $this->getCartItems()
        );
    }

    /**
     * @method getCartItems
     * @return array
     */
    public function getCartItems() {
        $this->frontEndSession();

        $session    = \Mage::getSingleton('checkout/session');
        $quote      = $session->getQuote();
        $items      = $quote->getAllItems();
        $data       = array();

        // Calculate all of the totals.
        $totals     = $quote->getTotals();
        $subTotal   = $totals['subtotal']->getValue();
        $grandTotal = $totals['grand_total']->getValue();

        foreach ($items as $item) {

            if ($item->getProduct()->getTypeId() === 'simple') {
                $parentIds = \Mage::getResourceSingleton('catalog/product_type_configurable')
                                 ->getParentIdsByChild($item->getProduct()->getEntityId());
                $parentId = (int) $parentIds[0];
            }

            $data[] = array(
                'id'        => (int) $item->getProduct()->getEntityId(),
                'parentId'  => $parentId ?: null,
                'itemId'    => (int) $item->getItemId(),
                'quantity'  => (int) $item->getQty(),
                'name'      => $item->getProduct()->getName(),
                'price'     => $item->getPrice()
            );
        }

        return array('subTotal' => $subTotal, 'grandTotal' => $grandTotal, 'items' => $data);
    }

    /**
     * @method getCollectionForCache
     * @param callable $infolog
     * @return array
     */
    public function getCollectionForCache(callable $infolog = null) {
        $collection = array();
        $index = 1;

        $products = \Mage::getResourceModel('catalog/product_collection');
        $products->addAttributeToSelect('*');
        $products->addAttributeToFilter('visibility', array('neq' => 1));
        $products->addAttributeToFilter('status', 1);
        $products->load();

        foreach ($products as $product) {

            if (!is_null($infolog)) {
                $infolog(sprintf('Resolving model %d/%d', $index++, count($products)));
            }

            $ids         = array();
            $categoryIds = (int) $product->getCategoryIds();
            $categoryId  = $categoryIds[0];
            $type        = \Mage::getModel('catalog/category')->load($categoryId);

            foreach ($product->getCategoryIds() as $id) {
                array_push($ids, (int) $id);

                // Add any parent IDs as well.
                $category = \Mage::getModel('catalog/category')->load($id);

                if ($category->parent_id) {
                    $parentCategory = \Mage::getModel('catalog/category')->load($category->parent_id);

                    if ($parentCategory->parent_id) {;
                        array_push($ids, (int) $parentCategory->parent_id);
                    }

                    array_push($ids, (int) $category->parent_id);
                }
            }

            $collection[] = array(
                'id'                => (int) $product->getId(),
                'name'              => trim($product->getName()),
                'ident'             => trim($this->createIdent($product->getName())),
                'price'             => (float) $product->getPrice(),
                'image'             => (string) $product->getMediaConfig()->getMediaUrl($product->getData('image')),
                'colour'            => (int) $product->getData('color'),
                'manufacturer'      => (int) $product->getData('manufacturer'),
                'categories'        => array_unique($ids),
                'type'              => $type
            );
        }

        return $collection;
    }

    /**
     * @method getCustomerModel
     * @return Mage_Customer_Model_Customer
     * @private
     */
    private function getCustomerModel() {

        // Gather the website and store preferences.
        $websiteId = \Mage::app()->getWebsite()->getId();
        $store     = \Mage::app()->getStore();

        // Update the customer model to reflect the current user.
        $customer = \Mage::getModel('customer/customer');
        $customer->website_id = $websiteId;
        $customer->setStore($store);

        return $customer;

    }

    /**
     * @method login
     * @param string $email
     * @param string $password
     * @return array
     */
    public function login($email, $password) {

        $response = array('success' => true, 'error' => null, 'model' => array());

        $customer = $this->getCustomerModel();
        $customer->loadByEmail($email);

        try {

            // Attempt the login procedure.
            $session = \Mage::getSingleton('customer/session');
            $session->login($email, $password);

            $account = $this->getAccount();
            $response['model'] = $account['model'];
            
        } catch (\Exception $e) {

            $response['success'] = false;

            switch ($e->getMessage()) {

                case 'Invalid login or password.':
                    $response['error'] = 'credentials';
                    break;

                default:
                    $response['error'] = 'unknown';
                    break;

            }

        }

        return $response;

    }

    /**
     * @method logout
     * @return array
     */
    public function logout() {
        \Mage::getSingleton('customer/session')->logout();
        $account = $this->getAccount();
        return array('success' => true, 'error' => null, 'model' => $account['model']);
    }

    /**
     * @method getAccount
     * @return array
     */
    public function getAccount() {

        $isLoggedIn = \Mage::getSingleton('customer/session')->isLoggedIn();

        if (!$isLoggedIn) {

            // User isn't logged in.
            return array('loggedIn' => false, 'model' => array());

        }

        // Gather the user data, and MD5 the email address for use with Gravatar.
        $datum = \Mage::helper('customer')->getCustomer()->getData();
        $datum['gravatar'] = md5($datum['email']);

        // Otherwise the user is logged in. Voila!
        return array('success' => true, 'model' => $datum);

    }

    /**
     * @method register
     * @param string $firstName
     * @param string $lastName
     * @param string $email
     * @param string $password
     * @return array
     */
    public function register($firstName, $lastName, $email, $password) {

        $response = array('success' => true, 'error' => null, 'model' => array());
        $customer = $this->getCustomerModel();

        try {

            // If new, save customer information
            $customer->firstname     = $firstName;
            $customer->lastname      = $lastName;
            $customer->email         = $email;
            $customer->password_hash = md5($password);
            $customer->save();

            // Log in the newly created user.
            $this->login($email, $password);

            $account = $this->getAccount();
            $response['model'] = $account['model'];

        } catch (\Exception $e) {

            $response['success'] = false;

            switch ($e->getMessage()) {

                case 'Customer email is required':
                    $response['error'] = 'email';
                    break;

                case 'This customer email already exists':
                    $response['error'] = 'exists';
                    break;

                default:
                    $response['error'] = 'unknown';
                    break;

            }

        }

        return $response;

    }

    /**
     * @method frontEndSession
     * @return void
     */
    private function frontEndSession() {
        \Mage::getSingleton('core/session', array('name' => 'frontend'));
    }

}
