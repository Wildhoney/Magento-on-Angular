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
             * @constructor
             */
            $scope.products = $productsService.getProducts();

            /**
             * @on mao/products/loaded
             * Responsible for invoking any delayed methods.
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {

                $scope.product = $productsService.pluck($routeParams.ident, 'ident');

                $request.getContent('product/' + $scope.product.id).then(function(response) {
                    $scope.product = _.extend($scope.product, response);
                });

            });

    }]);

})(window.mao);