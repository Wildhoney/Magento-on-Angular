(function($m) {

    /**
     * @controller ProductController
     * @author Adam Timberlake
     */
    $m.controller('ProductController',

        ['$rootScope', '$scope', '$productsService', '$routeParams',

        function ProductController($rootScope, $scope, $productsService, $routeParams) {

            /**
             * @constructor
             */
            $productsService.getProducts();

            /**
             * @on mao/products/loaded
             * Responsible for invoking any delayed methods.
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {
                $scope.product = $productsService.pluck($routeParams.ident, 'ident');
            });

    }]);

})(window.mao);