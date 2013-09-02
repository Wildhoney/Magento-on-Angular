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

                var subCategory = $routeParams.subCategory || null,
                    details     = $categoryHelper.find($routeParams.category, subCategory);

                $scope.category     = details.category;
                $scope.subCategory  = details.subCategory;

            });

    }]);

})(window.mao);