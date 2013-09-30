(function($m, $j) {

    "use strict";

    /**
     * @factory $productHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$productHelper',

        ['$rootScope', '$crossfilterHelper', '$http', '$q',

        function ProductHelper($rootScope, $crossfilterHelper, $http, $q) {

            /**
             * @property _defaultDimension
             * @type {String}
             * @default 'id'
             */
            var _defaultDimension = 'name';

            /**
             * @property $service
             * @type {Object}
             */
            var $service = {};

            /**
             * @property products
             * @type {Array}
             * @default []
             */
            $service.products = [];

            /**
             * @property loaded
             * @type {Boolean}
             * @default false
             */
            $service.loaded = false;

            /**
             * @property records
             * @type {Array}
             */
            $service.records = [];

            // Create our request and our promise which will be resolved when the AJAX
            // request is successful.
            var request     = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'}),
                deferred    = $q.defer();

            request.success(function ajaxSuccess(response) {

                // Initiate our Crossfilter object.
                var crossfilter = $crossfilterHelper.create(response);

                // Create all of the necessary dimensions.
                $crossfilterHelper.addDimension('id', 'id');
                $crossfilterHelper.addDimension('name', 'name');
                $crossfilterHelper.addDimension('price', 'price');
                $crossfilterHelper.addDimension('categories', 'categories');
                $crossfilterHelper.addDimension('colours', 'colour');
                $crossfilterHelper.addDimension('manufacturers', 'manufacturer');

                // Calculate top and bottom price.
                // Todo: Make this dynamic that does all of the dimensions.
                $service.records.price = {
                    top     : ($crossfilterHelper.get('price').top(1)[0]),
                    bottom  : ($crossfilterHelper.get('price').bottom(1)[0])
                };

                // Resolve our promise!
                deferred.resolve();

                $service.loaded = true;
                $rootScope.$broadcast('mao/products/loaded');

            });

            /**
             * @on mao/attribute/updated
             * @broadcasts mao/products/updated
             * Responsible for updating the products based on any attribute that has
             * been changed by anything anywhere.
             */
            $rootScope.$on('mao/attribute/updated', function onAttributeUpdated(event, type, ids) {

                // Find the dimension from the type of the attribute.
                var dimension = $crossfilterHelper.get(type);

                // Update the filter based on the active IDs that have been passed through.
                dimension.filterFunction(function attributeDimension(id) {
                    return ($j.inArray(id, ids) === -1);
                });

                // Finally we can let everybody know that we've updated the content.
                $rootScope.$broadcast('mao/products/updated', $service.getProducts());

            });

            /**
             * @method record
             * @param $dimension
             * @param $topBottom
             * Responsible for gathering the top or bottom for any given dimension.
             * @return {Number,String}
             */
            $service.record = function record($dimension, $topBottom) {

                if (!$service.records[$dimension]) {
                    return 0;
                }

                return $service.records[$dimension][$topBottom][$dimension];
                
            };

            /**
             * @method sortBy
             * @param property {String}
             * Responsible for sorting the products by any given property.
             * @return {Boolean}
             */
            $service.sortBy = function sortBy(property) {

                // Since Crossfilter orders by the dimension in which you obtain the `top` (or `bottom)
                // from, we can simply update that variable which determines the default dimension, and
                // whenever Crossfilter attempts to obtain the `top` it will automatically be ordered
                // by that property.
                _defaultDimension = property;

                // Broadcast the `mao/products/updated` event using the updated default dimension property.
                $rootScope.$broadcast('mao/products/updated', $service.getProducts());

                return true;

            };

            /**
             * @method hasLoaded
             * Determines whether the products have been loaded yet.
             * @return {Object}
             */
            $service.hasLoaded = function hasLoaded() {
                return deferred.promise;
            };

            /**
             * @method getProducts
             * @return {Array}
             */
            $service.getProducts = function getProducts() {
                return $crossfilterHelper.get(_defaultDimension).top(Infinity).reverse();
            };

            /**
             * @method _applyDimension
             * @param name {String}
             * @param $block {Function}
             * @private
             */
            var _applyDimension = function _applyDimension(name, $block) {

                // Find the dimension that pertains to the name passed.
                var dimension = $crossfilterHelper.get(name);

                if (!dimension) {
                    return;
                }

                // Apply the Crossfilter based on the block.
                $block.apply(dimension);

                // Let all the folks know we've updated the content.
                $rootScope.$broadcast('mao/products/updated', $service.getProducts());

            };

            /**
             * @method setQuery
             * @broadcasts mao/products/updated
             * @param query {String}
             * Responsible for updating the products based on their name matching against the
             * user query.
             * @return {void}
             */
            $service.setQuery = function setQuery(query) {

                if (!query) {
                    // If there is no query then it's a simple `filterAll`!
                    _applyDimension('name', function() {
                        this.filterAll();
                    });
                    return;
                }

                var regExp = new RegExp(query, 'i');

                // Otherwise it's a regular expression match.
                _applyDimension('name', function() {

                    this.filterFunction(function(name) {
                        return name.match(regExp);
                    });
                });

            };

            /**
             * @method setCategoryId
             * @broadcasts mao/products/updated
             * @param id {Number}
             * @return {void}
             */
            $service.setCategoryId = function setCategoryId(id) {

                _applyDimension('categories', function() {

                    this.filterFunction(function(ids) {
                        return ($j.inArray(id, ids) !== -1);
                    });

                });

            };

            /**
             * @method setPriceRange
             * @param minimum {Number}
             * @param maximum {Number}
             * @return {void}
             */
            $service.setPriceRange = function setPriceRange(minimum, maximum) {

                _applyDimension('price', function() {
                    this.filterRange([minimum, maximum]);
                });

            };

            /**
             * @method pluck
             * Responsible for plucking a product from the vast array by its ID/ident.
             * @param field {String}
             * @param value {Number|String|Array}
             * @return {Object|Array}
             */
            $service.pluckBy = function pluckBy(field, value) {
                return $crossfilterHelper.getBy(field, value);
            };

            return $service;

    }]);

})(window.mao, window.jQuery);