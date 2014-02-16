(function($moa) {

    "use strict";

    /**
     * @controller FiltersController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('FiltersController', ['$scope', '$timeout', 'gateway', 'basket',

    function filtersController($scope, $timeout, gateway, basket) {

        /**
         * @property name
         * @type {String}
         */
        $scope.name = '';

        /**
         * @property price
         * @type {Object}
         */
        $scope.price = { minimum: 0, maximum: 100 };

        /**
         * @property batch
         * @type {Object}
         */
        $scope.batch = { colour: null, brand: null };

        /**
         * @method setName
         * @param text {String}
         * @return {void}
         */
        $scope.setName = gateway.setName;

        /**
         * @property basketCount
         * @type {Number}
         * @default 0
         */
        $scope.basketCount = 0;

        // When the basket has been updated.
        $scope.$on('basket/updated', function basketUpdated(event, model) {
            $scope.basketCount = basket.itemCount(model.items);
        });

        /**
         * @method resetName
         * @return {void}
         */
        $scope.resetName = function resetName() {
            $scope.name = '';
            $scope.setName('');
        };

        /**
         * @method resetAll
         * @return {void}
         */
        $scope.resetAll = function resetAll() {
            $scope.setBatch('brand', 'selectAll');
            $scope.setBatch('colour', 'selectAll');
            $scope.resetPrices();
            $scope.resetName();
        };

        /**
         * @method setBatch
         * @param property {Object}
         * @param value {String}
         * @return {void}
         */
        $scope.setBatch = function setBatch(property, value) {

            $scope.batch[property] = '';

            // Using a timeout to force the property update for all observers.
            $timeout(function timeout() {
                $scope.batch[property] = value;
            }, 1);

        };

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
         * @method resetPrices
         * @return {void}
         */
        $scope.resetPrices = function resetPrices() {
            $scope.price.minimum = 0;
            $scope.price.maximum = $scope.immutableStatistics.ranges.price.max;
            $scope.setPriceRange(null, $scope.price.minimum, $scope.price.maximum);
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
                    $scope.price.minimum = $scope.price.maximum;
                    min = max;
                } else {
                    $scope.price.maximum = $scope.price.minimum;
                    max = min;
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

        // When the "filters/close" event has been broadcast.
        $scope.$on('filters/close', $scope.close);

    }]);

})(window.moaApp);
