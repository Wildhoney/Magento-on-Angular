(function($moa) {

    "use strict";

    /**
     * @service http
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('http', ['$q', '$http', 'config', function httpService($q, $http, config) {

        var service = {};

        /**
         * @property url
         * @type {String}
         */
        service.url = config.api.host + '/';

        /**
         * @method _request
         * @param path {String}
         * @param type {String}
         * @param params {Object}
         * @return {$q.promise}
         * @private
         */
        service._request = function _request(path, type, params) {

            var deferred = $q.defer();

            // Fetch the data from the backend, and resolve the promise with `response.data`.
            $http[type || 'get'](path, (params || {})).then(function then(response) {
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
         * @param quantity {Number}
         * @return {$q.promise}
         */
        service.addBasket = function addBasket(id, quantity) {
            return $http.get(service.url + 'basket/add/' + id + '/' + quantity);
        };

        /**
         * @method removeBasket
         * @param id {Number}
         * @return {$q.promise}
         */
        service.removeBasket = function removeBasket(id) {
            return $http.get(service.url + 'basket/remove/' + id);
        };

        /**
         * @method register
         * @param model {Object}
         * @return {$q.promise}
         */
        service.register = function register(model) {
            return service._request(service.url + 'account/register', 'post', model);
        };

        /**
         * @method login
         * @param model {Object}
         * @return {$q.promise}
         */
        service.login = function login(model) {
            return service._request(service.url + 'account/login', 'post', model);
        };

        /**
         * @method logout
         * @return {$q.promise}
         */
        service.logout = function logout() {
            return service._request(service.url + 'account/logout');
        };

        /**
         * @method getAccount
         * @return {$q.promise}
         */
        service.getAccount = function getAccount() {
            return service._request(service.url + 'account');
        };

        return service;

    }]);

})(window.moaApp);
