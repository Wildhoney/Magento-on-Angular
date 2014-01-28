(function($mao) {

    "use strict";

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
         * @property sorting
         * @type {Object}
         */
        $scope.sorting = { property: 'name', direction: 'asc' };

        /**
         * @property statistics
         * @type {Object}
         */
        $scope.statistics = {};

        /**
         * @property immutableStatistics
         * @type {Object|null}
         * @default null
         */
        $scope.immutableStatistics = null;

        /**
         * @method setSorting
         * @param property {String}
         * @return {void}
         */
        $scope.setSorting = function setSorting(property) {

            // Determine if the user has clicked on the same property again, which means
            // we'll be inverting the current sort order.
            if ($scope.sorting.property === property) {
                $scope.sorting.direction = ($scope.sorting.direction === 'asc' ? 'desc' : 'asc');
            }

            // Update the sorting property.
            $scope.sorting.property = property;

            // ...And finally we can emit the event to the Node.js server.
            socket.node.emit('snapshot/products/sortBy', $scope.sorting.property, $scope.sorting.direction);

        };

        // When we have the products loaded from the Node.js middleware.
        socket.node.on('snapshot/products/contentUpdated', function contentUpdated(models, statistics) {

            $scope.$apply(function() {

                $scope.statistics = statistics;
                $scope.products = gateway.resolve(models);

                if (!$scope.immutableStatistics) {

                    // Update with the initial statistics
                    $scope.immutableStatistics = $scope.statistics;

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