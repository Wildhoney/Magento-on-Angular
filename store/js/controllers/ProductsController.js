(function($mao) {

    /**
     * @controller ProductsController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('ProductsController', ['$scope', 'socket', 'gateway',

    function productsController($scope, socket, gateway) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        // When we have the products loaded from the Node.js middleware.
        socket.node.on('snapshot/products/contentUpdated', function contentUpdated(models, statistics) {
            $scope.products = gateway.resolve(models);
            $scope.$apply();
        });

    }]);

})(window.maoApp);