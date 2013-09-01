<?php

class CategoriesController extends MageController {

    public function getCategories() {

        $categories = Mage::helper('catalog/category')->getStoreCategories();
        $collection = array();

//        echo '<pre>';
        foreach ($categories as $category) {

            // Determine if the category is currently active.
            $isActive = (bool) $category->getIsActive();

            if (!$isActive) {

                // If the category isn't active then there's no sense in continuing.
                continue;

            }

            // Load the category's model because it's active.
            $category = Mage::getModel('catalog/category')->load($category->getId());

            // Begin constructing the response by placing the name of the category into the array.
            $current = array(
                'id'        => (int) $category->getId(),
                'name'      => $category->getName(),
                'children'  => array()
            );

            // Discover the category's sub-categories.
            $subCategoryIds = explode(',', $category->getChildren());

            foreach ($subCategoryIds as $subCategoryId) {

                // Load the sub-categories one-by-one, pushing them into the array.
                $subCategory = Mage::getModel('catalog/category')->load($subCategoryId);

                // Prepare the model for appending to the collection.
                $model = array(
                    'id'    => (int) $subCategory->getId(),
                    'name'  => $subCategory->getName()
                );

                $current['children'][] = $model;

            }

            // Finally we can place the category in the list of categories.
            $collection[] = $current;

        }

        return Response::json($collection);

    }

}