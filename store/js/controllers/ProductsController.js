(function($m) {

    "use strict";

    /**
     * @controller ProductsController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductsController',

        ['$rootScope', '$scope', '$http', '$productHelper', '$routeParams',

        function ProductsController($rootScope, $scope, $http, $productHelper, $routeParams) {

        /**
         * @method _getPageNumber
         * @param params {Object}
         * @return {Number}
         * @private
         */
        $scope._getPageNumber = function _getPageNumber(params) {

            if (!params.pageNumber && !params.subCategory) {
                return 1;
            }

            if (params.pageNumber) {

                // If the page number has been set then it's probably fine, because we're
                // more than likely on the subCategory page.
                return params.pageNumber;

            }

            var pageNumber  = 1,
                isNumber    = (params.subCategory) && params.subCategory.match(/^\d+$/);

            if (isNumber) {

                // Because the Angular routing isn't so great as to distinguish between
                // different types of URL params, we'll have to detect if the subCategory
                // is in fact the page number for the category page.
                pageNumber = params.subCategory;
                delete params.subCategory;

            }

            return pageNumber;

        };

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        /**
         * @property productCount
         * @type {Number}
         * @default 0
         * Number of products before the pagination slicing takes over.
         */
        $scope.productCount = 0;

        /**
         * @property perPage
         * @type {Number}
         */
        $scope.perPage = 10;

        /**
         * @property currentPage
         * @type {Number}
         */
        $scope.currentPage = $scope._getPageNumber($routeParams);

        /**
         * @property pagination
         * @type {Array}
         */
        $scope.pagination = [];

        /**
         * @property hasLoaded
         * @type {Boolean}
         * @default false
         */
        $scope.hasLoaded = false;

        /**
         * @property pages
         * @type {Array}
         */
        $scope.pages = [];

        /**
         * @on contentUpdated
         * Responsible for updating the array when the content has been changed.
         * @return {void}
         */
        $scope.$on('contentUpdated', function contentUpdated(event) {

            var offset      = ($scope.currentPage * $scope.perPage) - $scope.perPage,
                products    = $productHelper.fetch(),
                totalPages  = Math.ceil(products.length / $scope.perPage);

            $scope.productCount = products.length;
            $scope.products     = products.slice(offset, $scope.perPage + offset);
            $scope.hasLoaded    = true;

            for (var index = 0; index < totalPages; index++) {
                // Populate the pages array with the page range.
                $scope.pages[index] = (index + 1);
            }

        });

        /**
         * @on switchedCategory
         * Responsible for switching the category.
         * @return {void}
         */
        $scope.$on('switchedCategory', function switchedCategory(event, id) {
            $productHelper.hasLoaded().then(function() {
                $productHelper.setCategoryId(id);
            });
        });

        /**
         * @method toggleColour
         * @param id {Number}
         * @return {void}
         */
        $scope.toggleColour = function toggleColour(id) {
            $productHelper.addRemoveById('colour', id);
        }

    }]);

})(window.mao);