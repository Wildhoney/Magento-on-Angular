(function($m) {

    "use strict";

    /**
     * @controller CategoryController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoryController',

        ['$rootScope', '$scope', '$routeParams', '$categoryHelper', '$timeout',

        function CategoryController($rootScope, $scope, $routeParams, $categoryHelper, $timeout) {

        $categoryHelper.hasLoaded().then(function() {

            var subCategory = $routeParams.subCategory || null,
                details     = $categoryHelper.find($routeParams.category, subCategory);

            $scope.category     = details.category;
            $scope.subCategory  = details.subCategory;

            // Find whether we're after the sub-category ID or the category ID.
            var id = (!$scope.subCategory) ? $scope.category.id : $scope.subCategory.id;

            $timeout(function() {

                // Broadcast the event 100 milliseconds to ensure the event
                // to handle the broadcast has been set-up.
                $scope.$broadcast('switchedCategory', id);

            }, 100);

        });

    }]);

})(window.mao);