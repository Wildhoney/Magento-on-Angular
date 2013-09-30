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
             * @param callback {String}
             * @return {Object} Promise that will be resolved or rejected.
             */
            $service.getContent = function getContent(path, callback) {

                var deferred    = $q.defer(),
                    url         = '/Magento-on-Angular/api/public/' + path,
                    request     = $http({ method: 'GET', url: url });

                request.success(function(response) {

                    // Resolve our promise because the AJAX was successful!
                    deferred.resolve(response);

                    // Sometimes a callback attached which does a few things
                    // after the content has been loaded, such as broadcasting events
                    // about when items have been loaded.
                    if (typeof callback === 'function') {
                        callback(response);
                    }

                });

                return deferred.promise;

            };
            
            return $service;

    }]);



})(window.mao);