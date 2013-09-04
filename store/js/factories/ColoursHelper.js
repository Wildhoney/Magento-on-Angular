(function($m, $j) {

    "use strict";

    /**
     * @factory $coloursHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$coloursHelper', ['$http', function($http) {

        var service = {};

        // Create our request and our promise which will be resolved when the AJAX
        // request is successful.
        var request     = $http({method: 'GET', url: '/Magento-on-Angular/api/public/attributes/color'}),
            deferred    = $j.Deferred();

        request.success(function(response) {
            deferred.resolve(response);
        });

        /**
         * @method hasLoaded
         * Determines whether the colours have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded() {
            return deferred.promise();
        };

        return service;

    }]);

})(window.mao, window.jQuery);