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
        $service.crossfilters = { master: null, slave: null };

        /**
         * @property dimensions
         * @type {Object}
         */
        $service.dimensions = { master: [], slave: [] };

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
            $service.crossfilters.master    = $c(products);
            $service.crossfilters.slave     = $c(products);

            var keys = _.keys(products[0]);

            // An assumption that the primary key is the first key in the first model.
            $service.primaryKey = keys[0];

            // Create a dimension for each and every property in the collection.
            keys.forEach(function(property) {

                $service.dimensions.master[property] = $service.crossfilters.master.dimension(function(model) {
                    return model[property];
                });

                $service.dimensions.slave[property] = $service.crossfilters.slave.dimension(function(model) {
                    return model[property];
                });

            });

            return $service.crossfilters;

        };

        /**
         * @method getContent
         * @return {Array}
         */
        $service.getContent = function getContent() {

            var dimension   = $service.dimensions.master[$service.primaryKey],
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

            var dimension = $service.dimensions.master.categories;

            if (!category) {
                // Remove the filters altogether if no category was passed.
                return dimension.filterAll();
            }

            // Otherwise we can apply the filter.
            return dimension.filterFunction(function(d) {
                return _.contains(d, category.id);
            });

        };

        /**
         * @method pluck
         * @param details {Object}
         * @return {Object}
         */
        $service.pluck = function pluck(details) {

            // Locate the dimension and filter it against the details that we have.
            var dimension = $service.dimensions.slave[details.property];
            dimension.filterExact(details.value);

            // Extract the row from the Crossfilter.
            var row = dimension.top(1)[0];

            // Reset the dimension and return the row we've found.
            dimension.filterAll();
            return row;

        };

        return $service;

    }]);

})(window.mao, window.crossfilter);