(function($m) {

    "use strict";

    /**
     * @factory $productsService
     * @contributors Adam Timberlake
     */
    $m.factory('$productsService',

        ['$rootScope', '$http', '$request', '$crossfilter',

        function ProductHelper($rootScope, $http, $request, $crossfilter) {

            var $service = {};

//            /**
//             * @property products
//             * @type {Array}
//             */
//            $service.products = [];

            $service.hasLoaded = function hasLoaded() {
                return Boolean($crossfilter.crossfilter);
            };

            /**
             * @method getProducts
             * @return {Array}
             */
            $service.getProducts = function getProducts() {

                if ($crossfilter.crossfilter) {
                    return $crossfilter.getContent();
                }

                return $request.getContent('products', function(response) {
                    $service.products = response;
                    $crossfilter.create(response);
                    $rootScope.$broadcast('mao/products/loaded', response);
                });

            };

            /**
             * @method set
             * @param property {Object}
             * @param category {Object}
             * Responsible for filtering by a property on the products.
             * @return {Object}
             */
            $service.set = function set(property, category) {
                $crossfilter.setCategory(category);
                return category;
            };

            /**
             * @property pluck
             * @value {Mixed}
             * @key {String}
             * Responsible for plucking products from the array whilst ignoring
             * any other filters applied.
             * @return {Object|Array}
             */
            $service.pluck = function pluck(value, key) {
                return $crossfilter.pluck({ key: key || 'id', value: value});
            };

            return $service;

    }]);

})(window.mao);