(function($m) {

    "use strict";

    /**
     * @controller ColoursController
     * @contributors Adam Timberlake
     */
    $m.controller('ColoursController',

        ['$rootScope', '$scope', '$routeParams', '$coloursHelper',

        function ColoursController($rootScope, $scope, $routeParams, $coloursHelper) {

        /**
         * @property colours
         * @type {Array}
         */
        $scope.colours = [];

        $coloursHelper.hasLoaded().then(function(colours) {
            $scope.colours = colours;
        });

    }]);

})(window.mao);