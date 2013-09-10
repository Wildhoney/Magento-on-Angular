(function($m, $j) {

    "use strict";

    /**
     * @factory $parameters
     * @contributors Adam Timberlake
     */
    $m.factory('$parameters',

        ['$rootScope', '$routeParams',

        function Parameters($rootScope, $routeParams) {

            var $service = {};

            $rootScope.$on('$routeChangeSuccess', function() {
                $service.category   = $routeParams.category;
                $service.product    = $routeParams.subCategory;
            });

            return $service;

    }]);

})(window.mao, window.jQuery);