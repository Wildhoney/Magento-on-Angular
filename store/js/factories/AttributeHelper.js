(function($m, $j) {

    "use strict";

    /**
     * @factory $attributeHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$attributeHelper', ['$http', '$q', function($http, $q) {

        var service = {};

        /**
         * @property promises
         * @type {Object}
         */
        service.promises = {
            colours         : $q.defer(),
            manufacturers   : $q.defer()
        };

        /**
         * @method request
         * @param url {String}
         * @param promise {Object}
         * @return {void}
         */
        service.request = function fetch(url, promise) {

            // Create our request and our promise which will be resolved when the AJAX
            // request is successful.
            var request = $http({method: 'GET', url: url});

            request.success(function(response) {
                promise.resolve(response);
            });

        };

        // Issue the AJAX requests, and pass along the promises to be resolved as well!
        service.request('/Magento-on-Angular/api/public/attributes/color', service.promises.colours);
        service.request('/Magento-on-Angular/api/public/attributes/manufacturer', service.promises.manufacturers);

        /**
         * @method hasLoaded
         * Determines whether the colours have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded(type) {
            return service.promises[type].promise;
        };

        return service;

    }]);

})(window.mao, window.jQuery);