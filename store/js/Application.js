(function($w) {

    "use strict";

    $w.mao = angular.module('maoApp', []);

    /**
     * @method config
     * Response for configuring the routes.
     */
    $w.mao.config(['$routeProvider', '$provide', '$locationProvider',

        function config($routeProvider, $provide, $locationProvider) {

            $routeProvider
                .when('/', { templateUrl: 'views/home.html' })
                .when('/category/:first', { templateUrl: 'views/category.html' })
                .when('/category/:first/:second', { templateUrl: 'views/category.html', reloadOnSearch: false })
                .when('/category/:first/:second/:third', { templateUrl: 'views/category.html' })
                .when('/product/:ident', { templateUrl: 'views/product.html' })
                .otherwise({ redirectTo: '/error/not-found' });

            $locationProvider.html5Mode(false).hashPrefix('!');

    }]);

    /**
     * @method value
     * Prevent the `$anchorScroll` from performing its default action of moving users
     * to the top of the page when the route changes.
     */
    $w.mao.value('$anchorScroll', angular.noop);

    /**
     * @method run
     * Responsible for capturing the `$routeChangeSuccess` and invoking a product in the
     * modal window when a product has been specified.
     */
    $w.mao.run(function run($rootScope, $routeParams) {

        $rootScope.$on('$routeChangeSuccess', function() {

            if ($routeParams.product) {
                $rootScope.$broadcast('mao/product/loaded', $routeParams.product);
                return;
            }

            $rootScope.$broadcast('mao/product/unloaded');

        });

    });

})(window);