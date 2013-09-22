(function($w) {

    "use strict";

    $w.mao = angular.module('mao', []);

    /**
     * @method config
     * Response for configuring the routes.
     */
    $w.mao.config(['$routeProvider', '$provide', '$locationProvider',

        function config($routeProvider, $provide, $locationProvider) {

            $routeProvider
                .when('/', { templateUrl: 'views/home.html' })
                .when('/category/:category', { templateUrl: 'views/products.html' })
                .when('/category/:category/:subCategory', { templateUrl: 'views/products.html' })
                .when('/product/:ident', { templateUrl: 'views/product.html' })
                .otherwise({ redirectTo: '/error/not-found' });

            $locationProvider.html5Mode(false).hashPrefix('!');

    }]);

})(window);