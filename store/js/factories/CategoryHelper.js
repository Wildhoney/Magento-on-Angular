(function($m, $j) {

    "use strict";

    /**
     * @factory $categoryHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$categoryHelper', ['$rootScope', function($rootScope) {

        var service = {};

        // Resolved when the categories are loaded.
        var deferred = $j.Deferred();

        /**
         * @method hasLoaded
         * Determines whether the categories have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded() {
            return deferred.promise();
        };

        /**
         * @method find
         * @param name {String}
         * @return {String}
         */
        service.find = function find(name) {
            return name;
        };


        $rootScope.$on('loadedCategories', function(event, categories) {

            // Store the categories, and resolve our promise!
            service.categories = categories;
            deferred.resolve();

        });

        return service;

    }]);

})(window.mao, window.jQuery);