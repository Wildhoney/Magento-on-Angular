(function($mao) {

    "use strict";

    /**
     * @service http
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.service('http', ['$q', '$http', function httpService($q, $http) {

        var service = {};

        /**
         * @property url
         * @type {String}
         */
        service.url = '../api/public/';

        /**
         * @method getAttribute
         * @param name {String}
         * @return {$q.promise}
         */
        service.getAttribute = function getAttribute(name) {

            var deferred = $q.defer();

            $http.get(service.url + 'attributes/' + name).then(function(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;

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
         * @method addBasket
         * @param id {Number}
         * @return {$q.promise}
         */
        service.addBasket = function addBasket(id) {
            return $http.get(service.url + 'basket/add/' + id);
        };

        return service;

    }]);

})(window.maoApp);