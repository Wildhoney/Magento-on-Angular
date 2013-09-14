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

            $service.parse = function parse() {
                $service.category   = $routeParams.first;
                $service.pageNumber = $routeParams.second || 1;
                $service.product    = $routeParams.third;
            };

            $rootScope.$on('$routeChangeSuccess', $service.parse);
//            $rootScope.$on('$locationChangeSuccess', $service.parse);

            return $service;

    }]);

})(window.mao, window.jQuery);