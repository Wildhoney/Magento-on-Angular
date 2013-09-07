/**
 * @param $m {Object} Mao
 * @param $j {Function} jQuery
 * @param $c {Function} Crossfilter
 */
(function($m, $j, $c) {

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
            return ($service.crossfilter = crossfilter(data));
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

        return $service;

    }]);

})(window.mao, window.jQuery, window.crossfilter);