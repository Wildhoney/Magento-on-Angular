(function($m, $j) {

    "use strict";

    /**
     * @factory $productHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$productHelper', ['$rootScope', function($rootScope) {

        var service = {};

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