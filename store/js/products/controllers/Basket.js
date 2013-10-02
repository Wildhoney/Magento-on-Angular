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

            /**
             * @on mao/products/loaded
             * Responsible for finding products already added in the basket via the session.
             * @return {void}
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {

                $request.getContent('basket', function(response) {

                    response.forEach(function(product) {

                        // Iterate over each item in the basket, obtaining their model.
                        var model = $productsService.pluck(product.id, 'id'),
                            merge = function merge(model) {
                                return _.extend(_.clone(model), { quantity: product.quantity });
                            };

                        if (!model) {

                            // If we don't currently have the model then it must be a simple product
                            // that is a child of a configurable, so we'll load it and then add
                            // it to the list.
                            $request.getContent('product/' + product.id).then(function(model) {

                                console.log(model);
                                $scope.products.push(merge(model));
                                $productsService.loadProducts([model]);

                            });

                            return;
                        }

                        $scope.products.push(merge(model));
                    });

                });

            });

            /**
             * @on mao/basket/add
             * @param event {Object}
             * @param product {Object}
             * Responsible for updating the basket with any added products.
             * @return {void}
             */
            $scope.$on('mao/basket/add', function basketAdd(event, product, quantity) {
                var mergedModel = _.extend(_.clone(product), { quantity: quantity || 1 });
                $scope.products.push(mergedModel);
                $request.getContent('basket/add/' + mergedModel.id);
            });

            /**
             * @method count
             * Reduces the products to a value taking into consideration the quantities.
             * @return {Number}
             */
            $scope.count = function count() {
                return +_.reduce($scope.products, function(value, model) {
                    return value + model.quantity;
                }, 0);
            };

    }]);

})(window.mao);