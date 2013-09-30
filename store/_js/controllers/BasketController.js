(function($m) {

    "use strict";

    /**
     * @controller BasketController
     * @contributors Adam Timberlake
     */
    $m.controller('BasketController', ['$rootScope', '$scope', '$http', '$productHelper',

        function BasketController($rootScope, $scope, $http, $productHelper) {

            /**
             * @property items
             * @type {Array}
             */
            $scope.items = [];

            var request = $http({method: 'GET', url: '/Magento-on-Angular/api/public/basket'});

            request.success(function(items) {

                var idMap = _.map(items, function(item) {
                    return item.id;
                });

                $productHelper.hasLoaded().then(function() {
                    $scope.items = $productHelper.pluckBy('id', idMap);
                    $rootScope.$emit('mao/basket/loaded', $scope.items);
                });
            });

            /**
             * @on mao/basket/add
             * @param event {Object}
             * @param id {Number}
             */
            $scope.$on('mao/basket/add', function onBasketAdd(event, id) {

                var request = $http({
                    method  : 'GET',
                    url     : '/Magento-on-Angular/api/public/basket/add/' + id}
                );

                request.success(function() {

                    var product = $productHelper.pluckBy('id', id);
                    $rootScope.$broadcast('mao/basket/updated', product);
                    $scope.items.push(product);

                });

            });

    }]);


})(window.mao);