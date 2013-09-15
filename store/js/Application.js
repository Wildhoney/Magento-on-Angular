(function($w) {

    "use strict";

    $w.mao = angular.module('maoApp', []).

        config(['$routeProvider', '$provide', '$locationProvider',

            function config($routeProvider, $provide, $locationProvider) {

            $routeProvider
                .when('/', { templateUrl: 'views/home.html' })
                .when('/category/:first', { templateUrl: 'views/category.html' })
                .when('/category/:first/:second', { templateUrl: 'views/category.html', reloadOnSearch: false })
                .when('/category/:first/:second/:third', { templateUrl: 'views/category.html' })
                .when('/product/:ident', { templateUrl: 'views/product.html' })
                .otherwise({ redirectTo: '/error/not-found' });

            $locationProvider.html5Mode(false).hashPrefix('!');

        }])
        .value('$anchorScroll', angular.noop)
        .run(function run($rootScope, $routeParams) {

            $rootScope.$on('$routeChangeSuccess', function() {

                if ($routeParams.product) {
                    $rootScope.$broadcast('mao/product/loaded', $routeParams.product);
                    return;
                }

                $rootScope.$broadcast('mao/product/unloaded');

            });

        });

})(window);