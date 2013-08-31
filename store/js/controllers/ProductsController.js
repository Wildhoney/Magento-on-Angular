(function($m) {

    "use strict";

    /**
     * @controller ProductsController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductsController', ['$scope', '$http', function ProductsController($scope, $http) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        var request = $http({method: 'GET', url: '/Magento-on-Angular/api/public/products'});

        request.success(function(response) {
            $scope.products = response;
        });

    }]);

})(window.mao);