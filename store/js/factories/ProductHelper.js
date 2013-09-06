(function($m, $j) {

    "use strict";

    /**
     * @factory $productHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$productHelper',

        ['$rootScope', '$crossfilterHelper', '$http', '$q',

        function ProductHelper($rootScope, $crossfilterHelper, $http, $q) {

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

            // Create our request and our promise which will be resolved when the AJAX
            // request is successful.
            var request     = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'}),
                deferred    = $q.defer();

            request.success(function(response) {

                // Initiate our Crossfilter object.
                var crossfilter = $crossfilterHelper.create(response);

                // Create all of the necessary dimensions.
                $crossfilterHelper.addDimension('id', 'id');
                $crossfilterHelper.addDimension('categories', 'categories');
                $crossfilterHelper.addDimension('colours', 'colour');
                $crossfilterHelper.addDimension('manufacturers', 'manufacturer');

                // Resolve our promise!
                deferred.resolve();

                $service.loaded = true;

            });

            /**
             * @on attributeUpdated
             * @broadcasts contentUpdated
             * Responsible for updating the products based on any attribute that has
             * been changed by anything anywhere.
             */
            $rootScope.$on('attributeUpdated', function(event, type, ids) {

                // Find the dimension from the type of the attribute.
                var dimension = $crossfilterHelper.get(type);

                // Update the filter based on the active IDs that have been passed through.
                dimension.filterFunction(function attributeDimension(id) {
                    return ($j.inArray(id, ids) === -1);
                });

                // Finally we can let everybody know that we've updated the content.
                $rootScope.$broadcast('contentUpdated', $service.getProducts());

            });

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
                return $crossfilterHelper.get('id').top(Infinity);
            };

            /**
             * @method setCategoryId
             * @broadcasts contentUpdated
             * @param id {Number}
             * @return {void}
             */
            $service.setCategoryId = function setCategoryId(id) {

                // Find the dimension that's responsible for managing the categories.
                var dimension = $crossfilterHelper.get('categories');

                // We can then filter the products based on the category ID that we've
                // passed through.
                dimension.filterFunction(function(ids) {
                    return ($j.inArray(id, ids) !== -1);
                });

                // Let all the folks know we've updated thecontent.
                $rootScope.$broadcast('contentUpdated', $service.getProducts());

            };

            return $service;

    }]);

})(window.mao, window.jQuery);