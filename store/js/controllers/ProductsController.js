(function($m, $j) {

    "use strict";

    /**
     * @controller ProductsController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductsController',

        ['$rootScope', '$scope', '$http', '$crossfilterHelper', '$productHelper',

        function ProductsController($rootScope, $scope, $http, $crossfilterHelper, $productHelper) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = [];

            /**
             * @property hasLoaded
             * @type {Boolean}
             * @default false
             */
            $scope.hasLoaded = false;

            var request = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'});

            request.success(function(response) {

                // Initiate our Crossfilter object.
                $crossfilterHelper.create(response);

                // Create all of the necessary dimensions.
                $crossfilterHelper.addDimension('id');
                $crossfilterHelper.addDimension('categories');

                // Let everybody know we've loaded the products!
                $scope.$emit('loadedProducts');

            });

            $scope.$on('switchedCategory', function(event, id) {

                $productHelper.hasLoaded().then(function() {

                    var dimension = $crossfilterHelper.get('categories');

                    // Clear the filter before we apply another category.
                    dimension.filterAll();

                    dimension.filterFunction(function(ids) {
                        return ($j.inArray(id, ids) !== -1);
                    });

                    $scope.products     = dimension.top(Infinity);
                    $scope.hasLoaded    = true;

                });

            });

    }]);

})(window.mao, window.jQuery);