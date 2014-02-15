(function($moa) {

    "use strict";

    /**
     * @service http
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('http', ['$q', '$http', function httpService($q, $http) {

        var service = {};

        /**
         * @property url
         * @type {String}
         */
        service.url = '../api/public/';

        /**
         * @method _request
         * @return {$q.promise}
         * @private
         */
        service._request = function _request() {

            var deferred = $q.defer();

            // Fetch the data from the backend, and resolve the promise with `response.data`.
            $http.get(service.url + 'currencies').then(function then(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;

        };

        /**
         * @method getAttribute
         * @param name {String}
         * @return {$q.promise}
         */
        service.getAttribute = function getAttribute(name) {
            return $http.get(service.url + 'attributes/' + name);
        };

        /**
         * @method getProduct
         * @param id {Number}
         * @return {$q.promise}
         */
        service.getProduct = function getProduct(id) {
            return $http.get(service.url + 'product/' + id);
        };

        /**
         * @method getCurrencies
         * @return {$q.promise}
         */
        service.getCurrencies = function getCurrencies() {
            return service._request(service.url + 'currencies');
        };

        /**
         * @method getBasket
         * @return {$q.promise}
         */
        service.getBasket = function getProduct() {
            return $http.get(service.url + 'basket');
        };

        /**
         * @method addBasket
         * @param id {Number}
         * @return {$q.promise}
         */
        service.addBasket = function addBasket(id) {
            return $http.get(service.url + 'basket/add/' + id);
        };

        /**
         * @method removeBasket
         * @param id {Number}
         * @return {$q.promise}
         */
        service.removeBasket = function removeBasket(id) {
            return $http.get(service.url + 'basket/remove/' + id);
        };

        return service;

    }]);

})(window.moaApp);