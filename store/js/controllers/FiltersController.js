(function($mao) {

    "use strict";

    /**
     * @controller FiltersController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('FiltersController', ['$scope', 'gateway', 'http',

    function filtersController($scope, gateway, http) {

        

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
            $scope.price.actual.minimum = min = (($scope.immutableStatistics.ranges.price.max / 100) * min);
            $scope.price.actual.maximum = max = (($scope.immutableStatistics.ranges.price.max / 100) * max);

            if (min > max) {

                // Keep the two in line if the minimum goes above the maximum.
                if (propertyChanging === 'maximum') {
                    $scope.price.percentage.minimum = $scope.price.percentage.maximum;
                } else {
                    $scope.price.percentage.maximum = $scope.price.percentage.minimum;
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

})(window.maoApp);