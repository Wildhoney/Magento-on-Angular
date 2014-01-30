(function($window, $angular) {

    "use strict";

    /**
     * @property window.maoApp
     * @type {Object}
     */
    $window.maoApp = $angular.module('maoApp', ['ngSanitize']);

})(window, window.angular);