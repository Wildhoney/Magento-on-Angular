(function($moa) {

    "use strict";

    /**
     * @controller ProductsController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('ProductsController', ['$scope', '$rootScope', 'socket', 'gateway', 'http', 'currency',

    function productsController($scope, $rootScope, socket, gateway, http, currency) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        /**
         * @property loaded
         * @type {Boolean}
         */
        $scope.loaded = false;

        /**
         * @property groupStatistics
         * @type {Object}
         */
        $scope.groupStatistics = {};

        /**
         * @property sortProperties
         * @type {Array}
         */
        $scope.sortProperties = ['name', 'price'];

        /**
         * @property perPage
         * @type {Number}
         */
        $scope.perPage = 15;

        /**
         * @property perPageSteps
         * @type {Number}
         */
        $scope.perPageSteps = 5;

        /**
         * @property maximumPerPage
         * @type {Number}
         */
        $scope.maximumPerPage = 100;

        /**
         * @property currency
         * @type {Object}
         */
        $scope.currency = currency.model;

        // When the currency has been changed by the user.
        $scope.$on('currency/changed', function currencyChanged(event, value) {
            $scope.currency = value;
        });

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
         * @method openProduct
         * @param productId {Number}
         * @param event {Object}
         * @return {void}
         */
        $scope.openProduct = function openProduct(productId, event) {

            if (event) {
                event.stopPropagation();
            }

            $scope.modalOpen = true;
            $rootScope.$broadcast('modal/reset');

            http.getProduct(productId).then(function then(response) {

                $scope.openModal('modals/product.html', {
                    model: response.data
                });

            });

        };

        /**
         * @method closeFilters
         * @return {void}
         */
        $scope.closeFilters = function() {
            $rootScope.$broadcast('filters/close');
        };

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

                $scope.loaded = true;
                $scope.statistics = statistics;
                $scope.products = gateway.resolve(models);
                $scope.groupStatistics = statistics.groups;

                if (!$scope.immutableStatistics) {

                    // Update with the initial statistics
                    $scope.immutableStatistics = $scope.statistics;

                }

            });

        });

        /**
         * @method gotoPage
         * @param pageNumber {Number}
         * @return {void}
         */
        $scope.gotoPage = function gotoPage(pageNumber) {
            socket.node.emit('snapshot/products/pageNumber', pageNumber);
        };

        /**
         * @method nextPage
         * @return {void}
         */
        $scope.nextPage = function nextPage() {
            $scope.gotoPage($scope.statistics.pages.current + 1);
        };

        /**
         * @method decreasePerPage
         * @return {void}
         */
        $scope.decreasePerPage = function decreasePerPage() {

            if ($scope.perPage !== $scope.perPageSteps) {
                socket.node.emit('snapshot/products/perPage', ($scope.perPage -= $scope.perPageSteps));
            }

        };

        /**
         * @method increasePerPage
         * @return {void}
         */
        $scope.increasePerPage = function increasePerPage() {

            if ($scope.perPage !== $scope.maximumPerPage) {
                socket.node.emit('snapshot/products/perPage', ($scope.perPage += $scope.perPageSteps));
            }

        };

        /**
         * @method previousPage
         * @return {void}
         */
        $scope.previousPage = function previousPage() {
            $scope.gotoPage($scope.statistics.pages.current - 1);
        };

        // When the "paging/next" or "page/previous" events are broadcast.
        $scope.$on('paging/previous', $scope.previousPage);
        $scope.$on('paging/next', $scope.nextPage);

        // When the "paging/increase" or "page/decrease" events are broadcast.
        $scope.$on('paging/decrease', $scope.decreasePerPage);
        $scope.$on('paging/increase', $scope.increasePerPage);

    }]);

})(window.moaApp);
