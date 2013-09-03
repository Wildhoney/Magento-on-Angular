(function($m, $j) {

    "use strict";

    /**
     * @factory $productHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$productHelper',

        ['$rootScope', '$http', '$crossfilterHelper',

        function ProductHelper($rootScope, $http, $crossfilterHelper) {

        /**
         * @property service
         * @type {Object}
         */
        var service = {};

        // Create our request and our promise which will be reolved when the AJAX
        // request is successful.
        var request     = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'}),
            deferred    = $j.Deferred();

        request.success(function(response) {

            // Initiate our Crossfilter object.
            var crossfilter = $crossfilterHelper.create(response);

            // Create all of the necessary dimensions.
            $crossfilterHelper.addDimension('id');
            $crossfilterHelper.addDimension('categories');

            // Store the products, and resolve our promise!
            service.products = crossfilter;
            deferred.resolve();

        });

        /**
         * @method hasLoaded
         * Determines whether the products have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded() {
            return deferred.promise();
        };

        service.fetch = function fetch() {

            return $crossfilterHelper.get('id').top(Infinity);

        };

        service.setCategoryId = function setCategoryId(id) {

            var dimension = $crossfilterHelper.get('categories');
//
            // Clear the filter before we apply another category.
            dimension.filterAll();

            dimension.filterFunction(function(ids) {
                return ($j.inArray(id, ids) !== -1);
            });

        };

        /**
         * @on loadedProducts
         * @param event {Object}
         * @param products {Array}
         * Invoked when the products have been loaded by the `ProductsController`.
         * Responsible for resolving the promise.
         */
//        $rootScope.$on('loadedProducts', function(event, products) {
//
//            // Store the products, and resolve our promise!
//            service.products = products;
//            deferred.resolve();
//
//        });

        return service;

    }]);

})(window.mao, window.jQuery);