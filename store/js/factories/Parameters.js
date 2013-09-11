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
                $service.category   = $routeParams.first;
                $service.pageNumber = $routeParams.second || 1;
                $service.product    = $routeParams.third;
            });

            return $service;

    }]);

})(window.mao, window.jQuery);