(function($moa) {

    "use strict";

    /**
     * @controller BasketController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('BasketController', ['$scope', 'http', 'basket', function BasketController($scope, http, basket) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        /**
         * @property grandTotal
         * @type {Object}
         */
        $scope.grandTotal = 0;

        /**
         * @property subTotal
         * @type {Object}
         */
        $scope.subTotal = 0;

        // When the items in the basket have been updated.
        $scope.$on('basket/updated', function basketUpdated(event, response) {
            $scope.products   = response.items;
            $scope.grandTotal = response.grandTotal;
            $scope.subTotal   = response.subTotal;
        });

        /**
         * @method removeItem
         * @param id {Number}
         * @return {void}
         */
        $scope.removeItem = function removeItem(id) {
            http.removeBasket(id).then(function then(response) {
                basket.setBasket(response.data.models);
            });
        }
        
    }]);

})(window.moaApp);