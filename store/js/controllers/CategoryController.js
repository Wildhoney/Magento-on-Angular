(function($m) {

    "use strict";

    /**
     * @controller CategoryController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoryController',

        ['$rootScope', '$scope', '$routeParams', '$categoryHelper',

        function CategoryController($rootScope, $scope, $routeParams, $categoryHelper) {

        $categoryHelper.hasLoaded().then(function() {

            var subCategory = $routeParams.subCategory || null,
                details     = $categoryHelper.find($routeParams.category, subCategory);

            $scope.category     = details.category;
            $scope.subCategory  = details.subCategory;

            // Find whether we're after the sub-category ID or the category ID.
            var id = (!$scope.subCategory) ? $scope.category.id : $scope.subCategory.id;

            $scope.$watch('$viewContentLoaded', function() {

                // Broadcast the event once the content has loaded to ensure the event
                // to handle the broadcast has been set-up.
                $scope.$broadcast('switchedCategory', id);

            });

        });

    }]);

})(window.mao);