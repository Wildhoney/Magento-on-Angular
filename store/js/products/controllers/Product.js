(function($m) {

    /**
     * @controller ProductController
     * @author Adam Timberlake
     */
    $m.controller('ProductController',

        ['$rootScope', '$scope', '$productsService', '$routeParams', '$request',

        function ProductController($rootScope, $scope, $productsService, $routeParams, $request) {

            /**
             * @property product
             * @type {Object}
             */
            $scope.product = {};

            /**
             * @property selectedProduct
             * @type {Boolean|Object}
             */
            $scope.selectedProduct = false;

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = $productsService.getProducts();

            /**
             * @method selectProduct
             * @param product {Object}
             * Responsible for selecting a child product if the current is a configurable.
             * @return {void}
             */
            $scope.selectProduct = function selectProduct(product) {

                $scope.selectedProduct = {
                    meta    : product,
                    model   : $productsService.pluck(product.id, 'id')
                };

            };

            /**
             * @method getProduct
             * Responsible for plucking the product from the Crossfilter, and issuing an AJAX request
             * to load more data for the product, mixing it in with the Crossfilter returned object.
             * @return {void}
             */
            $scope.getProduct = function getProduct() {

                if (!$productsService.hasLoaded()) {
                    return;
                }

                $scope.product = $productsService.pluck($routeParams.ident, 'ident');

                $request.getContent('product/' + $scope.product.id).then(function(response) {

                    $scope.product = _.extend($scope.product, response);

                    if (!response.products.collection.length) {

                        // If we don't have any children then the one we're viewing is assumed
                        // to be a simple product type.
                        $scope.selectedProduct = true;
                        return;

                    }

                    // Load the simple products into the service.
                    $productsService.loadProducts(response.models);

                });

            };

            /**
             * @on $viewContentLoaded
             */
            $rootScope.$on('$viewContentLoaded', $scope.getProduct);

            /**
             * @on mao/products/loaded
             */
            $scope.$on('mao/products/loaded', $scope.getProduct);

            /**
             * @method addBasket
             * @param product {Object}
             * Responsible for adding a product into the basket.
             * @return {void}
             */
            $scope.addBasket = function addBasket(product) {
                $rootScope.$broadcast('mao/basket/add', product);
            }

    }]);

})(window.mao);