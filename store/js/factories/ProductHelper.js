(function($m, $j) {

    "use strict";

    /**
     * @factory $productHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$productHelper',

        ['$rootScope', '$http', '$q', '$crossfilterHelper',

        function ProductHelper($rootScope, $http, $q, $crossfilterHelper) {

        /**
         * @property service
         * @type {Object}
         */
        var service = {};

        service.colour          = [];
        service.manufacturer    = [];

        // Create our request and our promise which will be resolved when the AJAX
        // request is successful.
        var request     = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'}),
            deferred    = $q.defer();

        request.success(function(response) {

            // Initiate our Crossfilter object.
            var crossfilter = $crossfilterHelper.create(response);

            // Create all of the necessary dimensions.
            $crossfilterHelper.addDimension('id');
            $crossfilterHelper.addDimension('categories');
            $crossfilterHelper.addDimension('colour');
            $crossfilterHelper.addDimension('manufacturer');

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
            return deferred.promise;
        };

        /**
         * @method fetch
         * @return {Array}
         */
        service.fetch = function fetch() {
            return $crossfilterHelper.get('id').top(Infinity);
        };

        /**
         * @method setCategoryId
         * @param id {Number}
         * @return {void}
         */
        service.setCategoryId = function setCategoryId(id) {

            var dimension = $crossfilterHelper.get('categories');

            // Clear the filter before we apply another category.
            dimension.filterAll();

            dimension.filterFunction(function(ids) {
                return ($j.inArray(id, ids) !== -1);
            });

            $rootScope.$broadcast('contentUpdated');

        };

        service.addRemoveById = function addRemoveById(type, id) {

            // Obtain the current list for the type, and determine if it exists
            // in the list already.
            var list            = service[type],
                positionIndex   = list.indexOf(id);

            if (positionIndex !== -1) {
                // We'll need to remove it from the list, because it already exists!
                list.splice(positionIndex, 1);
            } else {
                // Otherwise we'll add it because it's not there already.
                list.push(id);
            }

            // Find the dimension that relates to the current type.
            var dimension = $crossfilterHelper.get(type);

            dimension.filterFunction(function(id) {
                console.log($j.inArray(id, list) === -1);
                return ($j.inArray(id, list) === -1);
            });

            $rootScope.$broadcast('contentUpdated');

        };

        return service;

    }]);

})(window.mao, window.jQuery);