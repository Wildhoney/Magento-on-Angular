(function($moa) {

    "use strict";

    /**
     * @controller FiltersController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('FiltersController', ['$scope', 'gateway',

    function filtersController($scope, gateway) {

        /**
         * @property price
         * @type {Object}
         */
        $scope.price = { minimum: 0, maximum: 100 };

        /**
         * @method setName
         * @param text {String}
         * @return {void}
         */
        $scope.setName = gateway.setName;

        /**
         * @method update
         * @param property {String}
         * @param values {Array}
         */
        $scope.update = function update(property, values) {
            property = property.charAt(0).toUpperCase() + property.substring(1);
            gateway['set' + property](values);
        };

        /**
         * @method setPriceRange
         * @param propertyChanging {String}
         * @param min {Number}
         * @param max {Number}
         * @return {void}
         */
        $scope.setPriceRange = function setPriceRange(propertyChanging, min, max) {

            // Since the range passes a percent (0-100), we can calculate how much that
            // is based on the overall price.
            min = (($scope.immutableStatistics.ranges.price.max / 100) * min);
            max = (($scope.immutableStatistics.ranges.price.max / 100) * max);

            if (min > max) {

                // Keep the two in line if the minimum goes above the maximum.
                if (propertyChanging === 'maximum') {
                    $scope.minimum = $scope.maximum;
                } else {
                    $scope.maximum = $scope.minimum;
                }

            }

            gateway.setPriceRange(min, (max + 0.001));

        };

        /**
         * @method open
         * @param menu {String}
         * @return {void}
         */
        $scope.open = function open(menu) {
            $scope.$parent.filtersOpen = menu;
        };

        /**
         * @method close
         * @return {void}
         */
        $scope.close = function close() {
            $scope.$parent.filtersOpen = '';
        };

    }]);

})(window.moaApp);