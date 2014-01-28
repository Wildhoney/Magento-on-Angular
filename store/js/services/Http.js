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

            var deferred = $q.defer();

            $http.get(service.url + 'product/' + id).then(function(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;

        };

        return service;

    }]);

})(window.maoApp);