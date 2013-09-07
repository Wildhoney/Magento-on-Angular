(function($m) {

    "use strict";

    /**
     * @controller CategoryController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoryController',

        ['$scope', '$routeParams', '$categoryHelper', '$productHelper', '$attributeHelper',

        function CategoryController($scope, $routeParams, $categoryHelper, $productHelper, $attributeHelper) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = [];

            /**
             * @property colours
             * @type {Array}
             */
            $scope.colours = [];

            /**
             * @property manufacturers
             * @type {Array}
             */
            $scope.manufacturers = [];

            /**
             * @property query
             * @type {String}
             */
            $scope.query = '';

            /**
             * @property manufacturersFilter
             * Responsible for filtering down the list of manufacturers.
             * @type {String}
             */
            $scope.manufacturersFilter = '';

            /**
             * @method toggle
             * @param model {Object}
             * Responsible for toggling attributes.
             * @return {Boolean}
             */
            $scope.toggle = $attributeHelper.toggle;

            /**
             * @method sortBy
             * @param property {String}
             * Responsible for sorting the products by any given property.
             * @return {Boolean}
             */
            $scope.sortBy = $productHelper.sortBy;

            /**
             * @on contentUpdated
             * Responsible for updating the content whenever the $productHelper service
             * tells us that it's been updated.
             */
            $scope.$on('contentUpdated', function onContentUpdated(event, products) {
                $scope.products = products;
            });

            /**
             * @watch query
             * Responsible for updating the products based on what the user enters into
             * the search box.
             * @return {void}
             */
            $scope.$watch('query', function queryChanged() {
                $productHelper.setQuery($scope.query);
            });

            // Once the categories have been loaded then we'll perform some actions.
            $categoryHelper.hasLoaded().then(function categoriesLoaded() {

                // We'll first find the category and subCategory from the URL parameters.
                var subCategory = $routeParams.subCategory || null,
                    details     = $categoryHelper.find($routeParams.category, subCategory);

                // And assign them to the scope variables.
                $scope.category     = details.category;
                $scope.subCategory  = details.subCategory;

                // We'll then find the ID to filter products on, where subCategory ID takes
                // precedence over the category ID because the subCategory ID is more specific.
                var id = (!$scope.subCategory) ? $scope.category.id : $scope.subCategory.id;

                // We'll then wait until the products have been loaded.
                $productHelper.hasLoaded().then(function productsLoaded() {

                    // And find all of the products by the ID we resolved earlier.
                    $productHelper.setCategoryId(id);
                    $scope.products = $productHelper.getProducts();

                });

                // We'll also wait for the colours to load, and then assign them to the scope variable.
                $attributeHelper.hasLoaded('colours').then(function coloursLoaded() {
                    $scope.colours = $attributeHelper.getColours();
                });

                // We'll do the same with manufacturers as we did with colours.
                $attributeHelper.hasLoaded('manufacturers').then(function manufacturersLoaded() {
                    $scope.manufacturers = $attributeHelper.getManufacturers();
                });

            });

    }]);

})(window.mao);