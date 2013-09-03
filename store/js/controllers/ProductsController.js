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