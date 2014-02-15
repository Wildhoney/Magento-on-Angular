(function($moa) {

    "use strict";

    /**
     * @service Basket
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('basket', ['$rootScope', 'http', function basketService($rootScope, http) {

        var service = {};

        /**
         * @property items
         * @type {Array}
         */
        service.items = [];

        // Get the items from the customer's basket.
        http.getBasket().then(function then(response) {

            service.items  = response.data.items;
            service.totals = response.data.totals;

            $rootScope.$broadcast('basket/updated', response.data);

        });

        /**
         * @method setBasket
         * @param items {Array}
         * @return {void}
         */
        service.setBasket = function setBasket(items) {
            service.items = items;
            $rootScope.$broadcast('basket/updated', service.items);
        };

        /**
         * @method itemCount
         * @param items {Array}
         * @return {Number}
         */
        service.itemCount = function itemCount(items) {

            var count = 0;

            // Count the amount of items in the basket, taking into consideration the
            // quantity as well.
            _.forEach(items, function forEach(item) {
                count += +item.quantity;
            });

            return count;

        };

        return service;

    }]);

})(window.moaApp);