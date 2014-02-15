(function($moa) {

    "use strict";

    /**
     * @controller AccountController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('AccountController', ['$scope', 'http', function accountController($scope, http) {

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
        $scope.login = http.login,

        /**
         * @method register
         * @param model {Object}
         * @return {void}
         */
        $scope.register = http.register

    }]);

})(window.moaApp);