/**
 * @param $m {Object} Mao
 * @param $c {Function} Crossfilter
 */
(function($m, $c) {

    "use strict";

    /**
     * @factory $crossfilterHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$crossfilterHelper', ['$rootScope', function($rootScope) {

        var $service = {};

        /**
         * @property crossfilter
         * @type {Object}
         */
        $service.crossfilter = {};

        /**
         * @property simple
         * Responsible for managing only simple Crossfilters, such as the selecting of
         * models by the ID irrespective of other filters.
         * @type {}
         */
        $service.simple = { crossfilter: {}, dimensions: {} };

        /**
         * @property dimensions
         * @type {Array}
         */
        $service.dimensions = [];

        /**
         * @method create
         * @param data {Array}
         * Responsible for creating the Crossfilter from the data supplied.
         * @return {Object}
         */
        $service.create = function create(data) {

            // Create the Crossfilter that's responsible for the plucking of items by their ID.
            $service.simple.crossfilter     = $c(data);
            $service.simple.dimensions.id   = $service.simple.crossfilter.dimension(function(d) {
                return d.ident;
            });

            return ($service.crossfilter = $c(data));

        };

        /**
         * @method addDimension
         * @param name {String}
         * @param property {String}
         * @return {Object}
         */
        $service.addDimension = function addDimension(name, property) {

            return ($service.dimensions[name] = $service.crossfilter.dimension(function(d) {
                return d[property];
            }));

        };

        /**
         * @method get
         * @param field {String}
         * @return {Object}
         */
        $service.get = function get(field) {
            return $service.dimensions[field];
        };

        /**
         * @method getById
         * @param id {Number}
         * @return {Object}
         */
        $service.getById = function getById(id) {

            var dimension = $service.simple.dimensions.id;
            dimension.filterExact(id);
            return dimension.top(1)[0];

        };

        return $service;

    }]);

})(window.mao, window.crossfilter);