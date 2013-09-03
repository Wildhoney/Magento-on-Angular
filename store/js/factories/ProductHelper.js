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

        var request = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'});

        request.success(function(response) {

            // Initiate our Crossfilter object.
            $crossfilterHelper.create(response);

            // Create all of the necessary dimensions.
            $crossfilterHelper.addDimension('id');
            $crossfilterHelper.addDimension('categories');

            // Let everybody know we've loaded the products!
            $rootScope.$broadcast('loadedProducts');

        });

        // Resolved when the products are loaded.
        var deferred = $j.Deferred();

        /**
         * @method hasLoaded
         * Determines whether the products have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded() {
            return deferred.promise();
        };

        /**
         * @on loadedProducts
         * @param event {Object}
         * @param products {Array}
         * Invoked when the products have been loaded by the `ProductsController`.
         * Responsible for resolving the promise.
         */
        $rootScope.$on('loadedProducts', function(event, products) {

            // Store the products, and resolve our promise!
            service.products = products;
            deferred.resolve();

        });

        return service;

    }]);

})(window.mao, window.jQuery);