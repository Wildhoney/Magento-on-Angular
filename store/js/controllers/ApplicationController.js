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
         * @method openModal
         * @param partial {String}
         * @param options {Object}
         * @return {void}
         */
        $scope.openModal = function openModal(partial, options) {
            $scope.modalOpen = true;
            $rootScope.$broadcast('modal/open', partial, options);
        };

        /**
         * @method closeModal
         * @return {void}
         */
        $scope.closeModal = function closeModal() {

            if ($scope.modalOpen) {
                $rootScope.$broadcast('modal/close');
            }

        };

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