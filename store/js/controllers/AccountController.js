(function($moa) {

    "use strict";

    /**
     * @controller AccountController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('AccountController', ['$scope', 'http', function accountController($scope, http) {

        /**
         * @property account
         * @type {Object|null}
         * @default null
         */
        $scope.account = null;

        /**
         * @property registerAccount
         * @type {Object}
         */
        $scope.registerAccount = { firstName: '', lastName: '', email: '', password: '' };

        /**
         * @property loginAccount
         * @type {Object}
         */
        $scope.loginAccount = { email: '', password: '' };

        /**
         * @method login
         * @param model {Object}
         * @return {void}
         */
        $scope.login = function login(model) {

            http.login(model).then(function then(response) {

                if (response.success) {
                    $scope.account = response.model;
                }

            });

        };

        /**
         * @method register
         * @param model {Object}
         * @return {void}
         */
        $scope.register = http.register;

        /**
         * @method logout
         * @param model {Object}
         * @return {void}
         */
        $scope.logout = function logout(model) {

            http.logout().then(function then(response) {
                if (response.success) {
                    $scope.account = null;
                }
            });

        };

        // Fetch the user if they're already signed into their account.
        http.getAccount().then(function then(response) {

            if (response.success) {
                $scope.account = response.model;
            }

        });

    }]);

})(window.moaApp);