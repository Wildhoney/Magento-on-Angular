(function($moa) {

    "use strict";

    /**
     * @controller ProductController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('ProductController', ['$scope', 'http', function ProductController($scope, http) {

        /**
         * @property productId
         * @type {Number}
         */
        $scope.productId = null;

        /**
         * @constant ERRORS
         * @type {Object}
         */
        $scope.ERRORS = {
            stock: 'Unfortunately the product is currently out of stock.',
            unknown: 'Sorry, but an unknown error occurred.'
        };

        /**
         * @property errorMessage
         * @type {String}
         */
        $scope.errorMessage = '';

        /**
         * @property selectedProduct
         * @type {Object}
         */
        $scope.selectedProduct = {};

        /**
         * @property basketAdding
         * @type {Boolean}
         * @default false
         */
        $scope.basketAdding = false;

        /**
         * @method addBasket
         * @param id {Number}
         * @return {void}
         */
        $scope.addBasket = function addBasket(id) {

            $scope.basketAdding = true;

            http.addBasket(id).then(function then(response) {

                if (response.data.error) {

                    // We encountered an error!
                    $scope.errorMessage = $scope.ERRORS[response.data.error];
                    $scope.basketAdding = false;
                    return;

                }

                $scope.errorMessage = '';
                $scope.basketAdding = false;

            });

        };

        /**
         * @method changeProduct
         * @return {void}
         */
        $scope.changeProduct = function changeProduct() {
            $scope.setProduct($scope.selectedProduct);
        };

        /**
         * @method setProduct
         * @param product {Object}
         * @return {void}
         */
        $scope.setProduct = function setProduct(product) {

            if (!product) {

                // User decided to de-select their product selection.
                $scope.productId = null;
                return;

            }

            if (product.type !== 'configurable') {

                // Setup the product ID if the product being added isn't a configurable.
                $scope.productId = product.id;

            }

        }

    }]);

})(window.moaApp);