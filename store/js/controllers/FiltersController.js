(function($mao) {

    /**
     * @controller FiltersController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('FiltersController', ['$scope', 'gateway', 'http',

    function filtersController($scope, gateway, http) {

        /**
         * @property name
         * @type {String}
         */
        $scope.name = '';

        /**
         * @property colours
         * @type {Object}
         */
        $scope.colours = {

            /**
             * All variations of the colours.
             *
             * @property options
             */
            options: http.getAttribute('color'),

            /**
             * List of colour IDs that have been selected.
             *
             * @property selected
             */
            selected: []

        };

        /**
         * @property price
         * @type {Object}
         */
        $scope.price = {

            /**
             * Values for the range itself.
             *
             * @property percentage
             */
            percentage: { minimum: 0, maximum: 100 },

            /**
             * What the values above equate to based on the maximum price.
             *
             * @property actual
             */
            actual: { minimum: 0, maximum: 0 }

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
         * @method setName
         * @param text {String}
         * @return {void}
         */
        $scope.setName = gateway.setName;

        /**
         * @method toggleColour
         * @return {void}
         */
        $scope.toggleColour = function toggleColour() {

            var colours = [];

            _.forEach($scope.colours.selected, function forEach(selected, index) {

                if (selected) {
                    colours.push(index);
                }

            });

            gateway.setColours(colours);

        };

        /**
         * @method open
         * @return {void}
         */
        $scope.open = function open() {
            $scope.$parent.filtersOpen = true;
        };

        /**
         * @method close
         * @return {void}
         */
        $scope.close = function close() {
            $scope.$parent.filtersOpen = false;
        };

    }]);

})(window.maoApp);