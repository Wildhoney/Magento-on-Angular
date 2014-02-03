(function($moa) {

    "use strict";

    /**
     * @controller ModalController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('ModalController', ['$scope', '$timeout',

    function modalController($scope, $timeout) {

        /**
         * @property options
         * @type {Object}
         * @default null
         */
        $scope.options = null;

        /**
         * @property partial
         * @type {String}
         */
        $scope.partial = '';

        // When the "modal/open" event has been broadcast.
        $scope.$on('modal/open', function modalOpen(event, partialName, options) {
            $scope.partial = 'views/' + partialName;
            $scope.options = options;
        });

        // When the "modal/close" event has been broadcast.
        $scope.$on('modal/close', function() {
            $scope.close();
        });

        // When the "modal/reset" event has been broadcast.
        $scope.$on('modal/reset', function() {
            $scope.partial = '';
            $scope.options = null;
        });

        /**
         * @method close
         * @return {void}
         */
        $scope.close = function close() {

            $scope.$parent.modalOpen = false;

            $timeout(function timeout() {

                // Reset all of the passed in parameters.
                $scope.partial = '';
                $scope.options = null;

            }, 1250);

        };
        
    }]);

})(window.moaApp);