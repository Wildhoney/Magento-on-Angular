(function($w) {

    "use strict";

    $w.mao = angular.module('maoApp', []).

        config(['$routeProvider', '$provide', '$locationProvider',

            function config($routeProvider, $provide, $locationProvider) {

            $routeProvider
                .when('/', { templateUrl: 'views/home.html' })
                .when('/category/:first', { templateUrl: 'views/category.html' })
                .when('/category/:first/:second', { templateUrl: 'views/category.html' })
                .when('/category/:first/:second/:third', { templateUrl: 'views/category.html' })
                .when('/product/:ident', { templateUrl: 'views/product.html' })
                .otherwise({ redirectTo: '/error/not-found' });

            $locationProvider.html5Mode(false).hashPrefix('!');

        }])
        .value('$anchorScroll', angular.noop)
        .run(function run($rootScope, $parameters, $route) {

//            var lastRoute = $route.current;
//            $rootScope.$on('$locationChangeSuccess', function locationChangeSuccess() {
//                $rootScope.$apply();
//                console.log($parameters);
//                $rootScope.current = lastRoute;
//            });

            $rootScope.$on('$routeChangeSuccess', function() {

                if ($parameters.product) {
                    $rootScope.$broadcast('mao/product/loaded');
                    return;
                }

                $rootScope.$broadcast('mao/product/unloaded');

            });

        });

})(window);