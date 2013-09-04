(function($m) {

    "use strict";

    /**
     * @controller AttributesController
     * @contributors Adam Timberlake
     */
    $m.controller('AttributesController',

        ['$rootScope', '$scope', '$routeParams', '$attributeHelper',

        function AttributesController($rootScope, $scope, $routeParams, $attributeHelper) {

        /**
         * @property colours
         * @type {Array}
         */
        $scope.colours = [];

        /**
         * @property manufacturers
         * @type {Array}
         */
        $scope.manufacturers = [];

        $attributeHelper.hasLoaded('colours').then(function(response) {
            $scope.colours = response;
        });

        $attributeHelper.hasLoaded('manufacturers').then(function(response) {
            $scope.manufacturers = response;
        });

    }]);

})(window.mao);