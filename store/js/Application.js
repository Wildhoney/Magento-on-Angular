(function($window, $angular) {

    "use strict";

    /**
     * @property window.moaApp
     * @type {Object}
     */
    $window.moaApp = $angular.module('moaApp', ['ngSanitize']);

})(window, window.angular);