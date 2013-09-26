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
             * @property products
             * @type {Array}
             */
            $scope.products = $productsService.getProducts();

            /**
             * @method getProduct
             * Responsible for plucking the product from the Crossfilter, and issuing an AJAX request
             * to load more data for the product, mixing it in with the Crossfilter returned object.
             * @return {void}
             */
            $scope.getProduct = function getProduct() {

                $scope.product = $productsService.pluck($routeParams.ident, 'ident');

                $request.getContent('product/' + $scope.product.id).then(function(response) {
                    $scope.product = _.extend($scope.product, response);
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