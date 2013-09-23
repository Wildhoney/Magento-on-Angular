(function($m) {

    $m.controller('ProductsController',

        ['$rootScope', '$scope', '$productsService',

        function ProductsController($rootScope, $scope, $productsService) {

            /**
             * @property products
             * @type {Array}
             */
            $scope.products = $productsService.getProducts();

            /**
             * @property queue
             * @type {Array}
             * Responsible for storing methods to invoke once products have been loaded.
             */
            $scope.queue = [];

            /**
             * @property category
             * @type {Object}
             */
            $scope.category = '';

            /**
             * @on mao/products/loaded
             * Responsible for invoking any delayed methods.
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {
                $scope.queue.forEach(function(delayedMethod) {
                    delayedMethod();
                });
            });

            /**
             * @on mao/categories/change
             * @param event {Object}
             * @param category {Object}
             * Responsible for updating the products when the category has been changed.
             */
            $scope.$on('mao/categories/set', function categoriesSet(event, category) {

                console.log(category.name);
                var setCategory = function setCategory() {
                    $productsService.set('category', category);
                    $scope.products = $productsService.getProducts();
                    $scope.category = category;
                };

                if (!$productsService.hasLoaded()) {
                    $scope.queue.push(setCategory);
                    return;

                }

                setCategory();

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