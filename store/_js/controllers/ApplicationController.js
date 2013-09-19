(function($m) {

    "use strict";

    /**
     * @controller ApplicationController
     * @contributors Adam Timberlake
     */
    $m.controller('ApplicationController', ['$scope', function ApplicationController($scope) {

        /**
         * @property lostFocus
         * @type {Boolean}
         * @default false
         */
        $scope.lostFocus = false;

        /**
         * @on productLoaded
         * Responsible for changing the class on the body so nice effects can occur!
         */
        $scope.$on('mao/product/loaded', function onProductLoaded() {
            $scope.lostFocus = true;
        });

        /**
         * @on unloadedProduct
         * Responsible for removing the fancy out-of-focus effects.
         */
        $scope.$on('mao/product/unloaded', function onUnloadedProduct() {
            $scope.lostFocus = false;
        });

    }]);

})(window.mao);