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
         * @property error
         * @type {String}
         */
        $scope.error = '';

        /**
         * @constant ERRORS
         * @type {Object}
         */
        $scope.ERRORS = {
            email: 'You must specify your email address.',
            exists: 'User already exists in the database.',
            credentials: 'Invalid email and/or password.',
            unknown: 'An unknown error occurred.'
        };

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
         * @method _processResponse
         * @param response {Object}
         * @private
         */
        var _processResponse = function _processResponse(response) {

            if (response.success) {

                // Lovely! No errors whatsoever.
                $scope.error = '';

                if (response.model) {
                    // Update the account model if we have one.
                    $scope.account = response.model;
                }

                return;
            }

            // Otherwise we have an error, so let's make the customer aware of it.
            $scope.error = $scope.ERRORS[response.error];

        };

        /**
         * @method login
         * @param model {Object}
         * @return {void}
         */
        $scope.login = function login(model) {
            http.login(model).then(_processResponse);
        };

        /**
         * @method register
         * @param model {Object}
         * @return {void}
         */
        $scope.register = function register(model) {
            http.register(model).then(_processResponse);
        };

        /**
         * @method logout
         * @return {void}
         */
        $scope.logout = function logout() {
            http.logout().then(_processResponse);
        };

        // Fetch the user if they're already signed into their account.
        http.getAccount().then(_processResponse);

    }]);

})(window.moaApp);