(function($m) {

    "use strict";

    /**
     * @controller ProductController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductController',

        ['$scope', '$http', '$parameters', '$productHelper', '$window', '$location', '$rootScope',

            function ProductController($scope, $http, $parameters, $productHelper, $window, $location,
                                       $rootScope) {

                /**
                 * @property product
                 * @type {}
                 */
                $scope.product = null;

                /**
                 * @property adding
                 * @type {Boolean}
                 * @default false
                 */
                $scope.adding = false;

                /**
                 * @method dismiss
                 * Responsible for closing the product in focus.
                 * @return {void}
                 */
                $scope.dismiss = function dismiss() {
                    var url = $location.$$path.replace($scope.product.ident, '');
                    $location.path(url);
                };

                /**
                 * @on mao/product/loaded
                 * Responsible for changing the URL and opening up the product's modal window
                 * when the user selects a product.
                 * @return {void}
                 */
                $scope.$on('mao/product/loaded', function onProductLoaded() {

                    // Finds the product by its ident once the content has been loaded.
                    $productHelper.hasLoaded().then(function() {

                        $scope.product = $productHelper.pluckBy('ident', $parameters.product);

                        var url     = '/Magento-on-Angular/api/public/product/' + $scope.product.id,
                            request = $http({method: 'GET', url: url });

                        request.success(function(response) {
                            $scope.product = _.extend($scope.product, response);
                        });

                    });

                });

                /**
                 * @on mao/product/unloaded
                 * Unload the product from the DOM.
                 */
                $scope.$on('mao/product/unloaded', function onProductUnloaded() {
                    $scope.product = null;
                });

                /**
                 * @on unloadProduct
                 * Unloads the product.
                 */
                $scope.$on('mao/product/unload', function onProductUnload() {
                    $scope.dismiss();
                });

                /**
                 * @on mao/basket/updated
                 * When the basket has been updated we can reset the `adding`.
                 */
                $scope.$on('mao/basket/updated', function onBasketUpdated() {
                    $scope.adding = false;
                });

                /**
                 * @method addBasket
                 * @return {void}
                 */
                $scope.addBasket = function addBasket(id) {
                    $scope.adding = true;
                    $rootScope.$broadcast('mao/basket/add', id);
                }

            }
    ]);


})(window.mao);