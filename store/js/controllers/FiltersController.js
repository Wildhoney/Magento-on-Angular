(function($mao) {

    /**
     * @controller FiltersController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('FiltersController', ['$scope', 'gateway',

    function filtersController($scope, gateway) {

        /**
         * @property price
         * @type {Object}
         */
        $scope.price = { minimum: 0, maximum: 0 };

        /**
         * @property name
         * @type {String}
         */
        $scope.name = '';

        /**
         * @method setPriceRange
         * @param min {Number}
         * @param max {Number}
         * @return {void}
         */
        $scope.setPriceRange = gateway.setPriceRange;

        /**
         * @method setName
         * @param text {String}
         * @return {void}
         */
        $scope.setName = gateway.setName;

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