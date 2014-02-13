(function($moa) {

    "use strict";

    /**
     * @controller BasketController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('BasketController', ['$scope', function BasketController($scope) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        // When the items in the basket have been updated.
        $scope.$on('basket/updated', function basketUpdated(event, items) {
            $scope.products = items;
            console.log(items);
        });
        
    }]);

})(window.moaApp);