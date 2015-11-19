<?php
namespace Moa\API\Provider\Magento;

/**
 * Magento API provider traits for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
trait Category {

    /**
     * @method getCategories
     * @return array
     */
    public function getCategories()
    {
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
                    'ident'         => $this->createIdent($subCategory->getName()),
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

}