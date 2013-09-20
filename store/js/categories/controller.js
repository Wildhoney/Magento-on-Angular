(function($m) {

    $m.controller('CategoriesController', ['$scope', '$request',

        function CategoriesController($scope, $request) {

            $scope.categories = $request.getContent('categories');

            $scope.activeCategoryId = 0;

            $scope.open = function open(category) {
                $scope.activeCategoryId = category.id;
            }

    }]);

})(window.mao);