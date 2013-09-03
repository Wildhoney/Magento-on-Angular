(function($m, $j) {

    "use strict";

    /**
     * @controller ProductsController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductsController',

        ['$rootScope', '$scope', '$http', '$productHelper', '$routeParams',

        function ProductsController($rootScope, $scope, $http, $productHelper, $routeParams) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        /**
         * @property perPage
         * @type {Number}
         */
        $scope.perPage = 10;

        /**
         * @property currentPage
         * @type {Number}
         */
        $scope.currentPage = $routeParams.pageNumber;

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
         * @on switchedCategory
         * Responsible for switching the category.
         * @return {void}
         */
        $scope.$on('switchedCategory', function(event, id) {

            $productHelper.hasLoaded().then(function() {

                $productHelper.setCategoryId(id);

                var offset      = ($scope.currentPage * $scope.perPage) - $scope.perPage,
                    products    = $productHelper.fetch(),
                    totalPages  = Math.ceil(products.length / $scope.perPage);

                $scope.products     = products.slice(offset, $scope.perPage + offset);
                $scope.hasLoaded    = true;

                for (var index = 0; index < totalPages; index++) {
                    // Populate the pages array with the page range.
                    $scope.pages[index] = (index + 1);
                }

            });

        });

    }]);

})(window.mao, window.jQuery);