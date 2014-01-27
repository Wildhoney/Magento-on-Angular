(function($mao) {

    "use strict";

    /**
     * @controller ApplicationController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('ApplicationController', ['$scope',

    function applicationController($scope) {

        /**
         * @property filtersOpen
         * @type {Boolean}
         * @default false
         */
        $scope.filtersOpen = false;
        
    }]);

})(window.maoApp);