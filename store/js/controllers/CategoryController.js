(function($m) {

    "use strict";

    /**
     * @controller CategoryController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoryController', ['$rootScope', '$scope', '$routeParams', '$categoryHelper',

        function CategoryController($rootScope, $scope, $routeParams, $categoryHelper) {

            /**
             * @property category
             * @type {String}
             */
            $categoryHelper.hasLoaded().then(function() {
                var name        = $routeParams.subCategory || $routeParams.category;
                $scope.category = $categoryHelper.find(name);
            });

    }]);

})(window.mao);