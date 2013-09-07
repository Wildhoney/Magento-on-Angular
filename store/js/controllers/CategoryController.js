(function($m) {

    "use strict";

    /**
     * @controller CategoryController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoryController',

        ['$scope', '$routeParams', '$categoryHelper', '$productHelper', '$attributeHelper',
         '$pagination',

        function CategoryController($scope, $routeParams, $categoryHelper, $productHelper,
                                    $attributeHelper, $pagination) {

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
             * @property currentPage
             * @type {Number}
             * @default 1
             */
            $scope.currentPage = $pagination.getPageNumber();

            /**
             * @property pages
             * @type {Array}
             */
            $scope.pages = [];

            /**
             * @property perPage
             * @type {Number}
             * @default 10
             */
            $scope.perPage = 10;

            /**
             * @property paginateProducts
             * Responsible for taking the content and paginating them based on the page number,
             * and the total amount of products.
             * @return {Array}
             */
            $scope.paginateProducts = function paginateProducts() {

                var products            = $productHelper.getProducts();
                $scope.totalProducts    = products.length;
                $scope.pages            = _.range(1, products.length / $scope.perPage);

                var offset = ($scope.currentPage * $scope.perPage) - $scope.perPage;

                return products.slice(offset, offset + $scope.perPage);

            };

            /**
             * @on contentUpdated
             * Responsible for updating the content whenever the $productHelper service
             * tells us that it's been updated.
             */
            $scope.$on('contentUpdated', function onContentUpdated(event, products) {
                $scope.products = $scope.paginateProducts();
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
                    $scope.products = $scope.paginateProducts();

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