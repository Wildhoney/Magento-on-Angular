(function($mao) {

    "use strict";

    /**
     * @controller ModalController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('ModalController', ['$scope',

    function modalController($scope) {

        /**
         * @property options
         * @type {Object}
         */
        $scope.options = {};

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

        /**
         * @method close
         * @return {void}
         */
        $scope.close = function close() {

            $scope.$parent.modalOpen = false;

            // Reset all of the passed in parameters.
            $scope.partial = '';
            $scope.options = {};

        };
        
    }]);

})(window.maoApp);