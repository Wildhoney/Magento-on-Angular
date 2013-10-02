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

            /**
             * @property products
             * @type {Array}
             */
            $service.products = [];

            /**
             * @property childProducts
             * Updated when a configurable model is loaded that has child products, which
             * aren't part of the Crossfilter, but need to be accessible when plucking (`pluck`).
             * @type {Array}
             */
            $service.childProducts = [];

            /**
             * @method hasLoaded
             * @return {Boolean}
             */
            $service.hasLoaded = function hasLoaded() {
                return Boolean($crossfilter.crossfilters.master);
            };

            /**
             * @method sortBy
             * @param property {String}
             * @param ascending {Boolean}
             */
            $service.sortBy = $crossfilter.sortBy;

            /**
             * @method getProducts
             * @return {Array}
             */
            $service.getProducts = function getProducts() {

                if ($crossfilter.crossfilters.master) {
                    return $crossfilter.getContent();
                }

                return $request.getContent('products', function(response) {
                    $service.products = response;
                    $crossfilter.create(response);
                    $rootScope.$broadcast('mao/products/loaded', response);
                });

            };

            /**
             * @method loadProducts
             * @param models {Array}
             * @return {void}
             */
            $service.loadProducts = function loadProducts(models) {

                // Iterate over each model in the collection.
                for (var index = 0, len = models.length; index < len; index++) {

                    var model = models[index];

                    // Simple identity map with the `id` as the hash key.
                    $service.childProducts[model.id] = model;

                }

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
             * @param value {Number|String|Boolean}
             * @param property {String}
             * Responsible for plucking products from the array whilst ignoring
             * any other filters applied.
             * @return {Object|Array}
             */
            $service.pluck = function pluck(value, property) {

                // todo: Support all properties for the searching of `childProducts`.
                if (property === 'id') {

                    if ($service.childProducts[value]) {

                        // If we're using the `id` to find products then we can attempt
                        // to look into the `childProducts` first.
                        return $service.childProducts[value];

                    }

                }

                return $crossfilter.pluck({ property: property || 'id', value: value});

            };

            return $service;

    }]);

})(window.mao);