(function($m) {

    "use strict";

    /**
     * @controller ProductController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductController',

        ['$scope', '$http', '$routeParams', '$productHelper',

            function ProductController($scope, $http, $routeParams, $productHelper) {

                /**
                 * @property product
                 * @type {}
                 */
                $scope.product = {};

                // Finds the product by its ident once the content has been loaded.
                $productHelper.hasLoaded().then(function() {

                    $scope.product = $productHelper.pluck($routeParams.ident);

                    var url     = '/Magento-on-Angular/api/public/product/' + $scope.product.id,
                        request = $http({method: 'GET', url: url });

                    request.success(function(response) {
                        $scope.product = _.extend($scope.product, response);
                        $scope.$emit('loadedProduct', response);
                    });

                });

    }]);


})(window.mao);