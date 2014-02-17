(function($moa) {

    "use strict";

    /**
     * @controller ProductController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('ProductController', ['$scope', 'http', 'basket',

    function ProductController($scope, http, basket) {

        /**
         * @property product
         * @type {Object}
         */
        $scope.product = {};

        /**
         * @property selectedProductId
         * @type {Number}
         */
        $scope.selectedProductId = null;

        /**
         * @property quantity
         * @type {Number}
         */
        $scope.quantity = 1;

        /**
         * @constant ERRORS
         * @type {Object}
         */
        $scope.ERRORS = {
            stock: 'Unfortunately the product is currently out of stock.',
            choose: 'Please choose an option from the product dropdown.',
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
         * @param quantity {Number}
         * @return {void}
         */
        $scope.addBasket = function addBasket(id, quantity) {

            if (!id) {

                // User hasn't selected a simple product from the configurable.
                $scope.errorMessage = $scope.ERRORS['choose'];
                return;

            }

            $scope.basketAdding = true;

            // Add the item to the basket with the selected quantity.
            http.addBasket(id, quantity).then(function then(response) {

                if (response.data.error) {

                    // We encountered an error!
                    $scope.errorMessage = $scope.ERRORS[response.data.error];
                    $scope.basketAdding = false;
                    return;

                }

                $scope.errorMessage = '';
                $scope.basketAdding = false;

                // Update the user's basket!
                basket.setBasket(response.data.models);

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
                $scope.selectedProductId = null;
                return;

            }

            if (product.type !== 'configurable') {

                // Setup the product ID if the product being added isn't a configurable.
                $scope.selectedProductId = product.id;

            }

        }

    }]);

})(window.moaApp);