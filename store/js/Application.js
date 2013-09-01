(function($w) {

    "use strict";

    $w.mao = angular.module('maoApp', []).

        config(['$routeProvider', '$provide', '$locationProvider',

            function config($routeProvider, $provide, $locationProvider) {

//                $provide.decorator('$sniffer', function($delegate) {
//                    $delegate.history = false;
//                    return $delegate;
//                });

                $routeProvider.
                    when('/', { templateUrl: 'views/home.html' }).
                    when('/category/:category', { templateUrl: 'views/category.html' }).
                    when('/category/:category/:subCategory', { templateUrl: 'views/category.html' }).
                    when('/products', { templateUrl: 'views/products.html' }).
                    otherwise({ redirectTo: '/error/not-found' });

                $locationProvider.html5Mode(false).hashPrefix('!');

        }]);

})(window);