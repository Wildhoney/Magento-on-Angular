(function($m) {

    /**
     * @controller BasketController
     * @author Adam Timberlake
     */
    $m.controller('BasketController',

        ['$rootScope', '$scope', '$request', '$productsService',

        function BasketController($rootScope, $scope, $request, $productsService) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = [];

            $scope.$on('mao/products/loaded', function productsLoaded() {

                $request.getContent('basket', function(response) {

                    response.forEach(function(product) {
                        // Iterate over each item in the basket, obtaining their
                        var model = $productsService.pluck(product.id, 'id');
                        $scope.products.push(_.extend(model, product.quantity));
                    });

                });

            });

            /**
             * @on mao/basket/add
             * @param event {Object}
             * @param product {Object}
             * Responsible for updating the basket with any added products.
             */
            $scope.$on('mao/basket/add', function basketAdd(event, product) {
                $scope.products.push(product);
                $request.getContent('basket/add/' + product.id);
            });

    }]);

})(window.mao);