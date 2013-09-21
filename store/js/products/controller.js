(function($m) {

    $m.controller('ProductsController', ['$rootScope', '$scope', '$request',

        function ProductsController($rootScope, $scope, $request) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = $request.getContent('products', function() {
                $rootScope.$broadcast('mao/products/loaded');
            });

        }]);

})(window.mao);