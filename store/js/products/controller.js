(function($m) {

    $m.controller('ProductsController', ['$rootScope', '$scope', '$productsService',

        function ProductsController($rootScope, $scope, $productsService) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = $productsService.getProducts();

            /**
             * @on mao/categories/change
             * @param event {Object}
             * @param category {Object}
             * Responsible for updating the products when the category has been changed.
             */
            $scope.$on('mao/categories/set', function categoriesSet(event, category) {
                $productsService.set('category', category);
                $scope.products = $productsService.getProducts();
            });

            /**
             * @on mao/categories/unset
             * Responsible for removing the category constrains altogether.
             */
            $scope.$on('mao/categories/unset', function categoriesUnset() {
                $productsService.set('category');
                $scope.products = $productsService.getProducts();
            });

        }]);

})(window.mao);