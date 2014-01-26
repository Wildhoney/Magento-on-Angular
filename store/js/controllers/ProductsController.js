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

        /**
         * @property statistics
         * @type {Object}
         */
        $scope.statistics = {};

        /**
         * @property maxPrice
         * @type {Number}
         */
        $scope.maxPrice = 0;

        // When we have the products loaded from the Node.js middleware.
        socket.node.on('snapshot/products/contentUpdated', function contentUpdated(models, statistics) {

            $scope.$apply(function() {

                $scope.statistics = statistics;
                $scope.products = gateway.resolve(models);

                if ($scope.maxPrice === 0) {

                    // Update with the overall maximum price.
                    $scope.maxPrice = $scope.statistics.ranges.price.max;

                }

            });

        });

        /**
         * @method nextPage
         * @return {void}
         */
        $scope.nextPage = function nextPage() {
            socket.node.emit('snapshot/products/pageNumber', $scope.statistics.pages.current + 1);
        };

        /**
         * @method previousPage
         * @return {void}
         */
        $scope.previousPage = function previousPage() {
            socket.node.emit('snapshot/products/pageNumber', $scope.statistics.pages.current - 1);
        };

    }]);

})(window.maoApp);