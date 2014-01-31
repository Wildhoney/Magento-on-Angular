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
         * @property name
         * @type {String}
         */
        $scope.name = '';

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
         * @property filters
         * @type {Object}
         */
        $scope.filters = {

            /**
             * @property colours
             * @type {Object}
             */
            colours: { models: [], selected: [] },

            /**
             * @property manufacturers
             * @type {Object}
             */
            manufacturers: { models: [], selected: [] }

        };

        /**
         * @method setName
         * @param text {String}
         * @return {void}
         */
        $scope.setName = gateway.setName;

        // Fetch all of the colours.
        http.getAttribute('color').then(function then(models) {
            $scope.filters.colours.models = models;
            $scope.$broadcast('filters/received', 'colour');
        });

        // Fetch all of the manufacturers.
        http.getAttribute('manufacturer').then(function then(models) {
            $scope.filters.manufacturers.models = models;
            $scope.$broadcast('filters/received', 'manufacturer');
        });

        /**
         * @method resetName
         * @return {void}
         */
        $scope.resetName = function resetName() {
            $scope.name = '';
            $scope.setName($scope.name);
        };

        /**
         * @method resetPriceRange
         * @return {void}
         */
        $scope.resetPriceRange = function resetPriceRange() {

            // Reset the `price` object to the default.
            $scope.price.percentage = { minimum: 0, maximum: 100 };
            $scope.price.actual = { minimum: 0, maximum: 0 }

            // Update the minimum and maximum.
            var min = $scope.immutableStatistics.ranges.price.min,
                max = $scope.immutableStatistics.ranges.price.max;

            gateway.setPriceRange(min, (max + 0.001));

        };

        /**
         * @method invertColours
         * @return {void}
         */
        $scope.invertColours = function invertColours() {

            _.forEach($scope.filters.colours.selected, function forEach(value, index) {
                $scope.filters.colours.selected[index] = !$scope.filters.colours.selected[index];
            });

            $scope.setColour();

        };

        /**
         * @method invertManufacturers
         * @return {void}
         */
        $scope.invertManufacturers = function invertManufacturers() {

            _.forEach($scope.filters.manufacturers.selected, function forEach(value, index) {
                $scope.filters.manufacturers.selected[index] = !$scope.filters.manufacturers.selected[index];
            });

            $scope.setManufacturer();

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
         * @method setColour
         * @return {void}
         */
        $scope.setColour = function setColour() {

            var colours = [];

            _.forEach($scope.filters.colours.selected, function forEach(selected, index) {

                if (selected) {
                    colours.push(index)
                }
            });
            
            gateway.setColour(colours);

        };

        /**
         * @method setManufacturer
         * @return {void}
         */
        $scope.setManufacturer = function setManufacturer() {

            var manufacturers = [];

            _.forEach($scope.filters.manufacturers.selected, function forEach(selected, index) {

                if (selected) {
                    manufacturers.push(index)
                }

            });
            
            gateway.setManufacturer(manufacturers);

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