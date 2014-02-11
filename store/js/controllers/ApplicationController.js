(function($moa) {

    "use strict";

    /**
     * @controller ApplicationController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('ApplicationController', ['$rootScope', '$scope',

    function applicationController($rootScope, $scope) {

        /**
         * @property filtersOpen
         * @type {String}
         */
        $scope.filtersOpen = '';

        /**
         * @property modalOpen
         * @type {Boolean}
         * @default false
         */
        $scope.modalOpen = false;

        /**
         * @method keyUp
         * @param event {Object}
         * @return {void}
         */
        $scope.keyUp = function keyUp(event) {

            if (event.keyCode === 27) {
                $scope.$broadcast('modal/close');
            }

        };

        /**
         * @method broadcast
         * @param event {String}
         * @return {void}
         */
        $scope.broadcast = function broadcast(event) {
            $rootScope.$broadcast(event);
        }
        
    }]);

})(window.moaApp);