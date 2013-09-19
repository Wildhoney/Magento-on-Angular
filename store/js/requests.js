(function($m) {

    "use strict";

    /**
     * @factory $request
     * @contributors Adam Timberlake
     */
    $m.factory('$request',

        ['$rootScope', '$http', '$q', function Requests($rootScope, $http, $q) {

            var $service = {};

            /**
             * @method getContent
             * @param path {String}
             * @return {Object} Promise that will be resolved or rejected.
             */
            $service.getContent = function getContent(path) {

                var deferred    = $q.defer(),
                    url         = '/Magento-on-Angular/api/public/' + path,
                    request     = $http({ method: 'GET', url: url });

                request.success(function(response) {
                    deferred.resolve(response);
                });

                return deferred.promise;

            };
            
            return $service;

    }]);



})(window.mao);