(function($m, $c) {

    "use strict";

    /**
     * @factory $crossfilter
     * @contributors Adam Timberlake
     */
    $m.factory('$crossfilter', ['$rootScope', function($rootScope) {

        var $service = {};

        /**
         * @property crossfilter
         * @type {Object}
         */
        $service.crossfilter = null;

        /**
         * @property dimensions
         * @type {Array}
         */
        $service.dimensions = [];

        /**
         * @property primaryKey
         * @type {String}
         */
        $service.primaryKey = '';

        /**
         * @property isAscending
         * @type {Boolean}
         */
        $service.isAscending = true;

        /**
         * @method create
         * @param products {Array}
         * Responsible for creating the Crossfilter and all its necessary dimensions.
         * @return {Object}
         */
        $service.create = function create(products) {

            // Create the dimension and extract the keys from the first model.
            $service.crossfilter = $c(products);
            var keys = _.keys(products[0]);

            // An assumption that the primary key is the first key in the first model.
            $service.primaryKey = keys[0];

            // Create a dimension for each and every property in the collection.
            keys.forEach(function(property) {
                $service.dimensions[property] = $service.crossfilter.dimension(function(model) {
                    return model[property];
                });
            });

            return $service.crossfilter;

        };

        /**
         * @method getContent
         * @return {Array}
         */
        $service.getContent = function getContent() {

            var dimension   = $service.dimensions[$service.primaryKey],
                method      = ($service.isAscending) ? 'top' : 'bottom';

            return dimension[method](Infinity);

        };

        /**
         * @method sortBy
         * @param property {String}
         * @param ascending {Boolean}
         * Responsible for sorting the products. If no `ascending` is specified, then the
         * ascending/descending is alternated.
         * @return {void}
         */
        $service.sortBy = function sortBy(property, ascending) {

            $service.primaryKey = property;

            if (typeof ascending !== 'undefined') {

                // Change the `isAscending` specifically if the user has specified it.
                $service.isAscending = ascending;
                return;

            }

            // Otherwise we'll toggle it.
            $service.isAscending = !$service.isAscending;

        };

        /**
         * @method setCategory
         * @param category {Object}
         * @return {Object}
         */
        $service.setCategory = function setCategory(category) {

            var dimension = $service.dimensions.categories;

            if (!category) {
                // Remove the filters altogether if no category was passed.
                return dimension.filterAll();
            }

            // Otherwise we can apply the filter.
            return dimension.filterFunction(function(d) {
                return _.contains(d, category.id);
            });

        };

        return $service;

    }]);

})(window.mao, window.crossfilter);