(function($m) {

    "use strict";

    /**
     * @controller ProductController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductController',

        ['$scope', '$http', '$parameters', '$productHelper', '$window', '$location',

            function ProductController($scope, $http, $parameters, $productHelper, $window, $location) {

                /**
                 * @property product
                 * @type {}
                 */
                $scope.product = null;

                $scope.$on('loadedProduct', function onLoadedProduct() {

                    // Finds the product by its ident once the content has been loaded.
                    $productHelper.hasLoaded().then(function() {

                        $scope.product = $productHelper.pluck($parameters.product);

                        var url     = '/Magento-on-Angular/api/public/product/' + $scope.product.id,
                            request = $http({method: 'GET', url: url });

                        request.success(function(response) {
                            $scope.product = _.extend($scope.product, response);
                        });

                    });

                });

                $scope.$on('unloadedProduct', function onUnloadedProduct() {
                    $scope.product = null;
                });

                $scope.dismiss = function dismiss() {
                    var url = $location.$$path.replace($scope.product.ident, '');
                    $location.path(url);
                }

            }
    ]);


})(window.mao);