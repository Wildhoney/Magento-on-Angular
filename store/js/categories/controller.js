(function($m) {

    $m.controller('CategoriesController', ['$scope', '$request',

        function CategoriesController($scope, $request) {

            $scope.categories = $request.getContent('categories');

            $scope.subCategories = [];

            $scope.goto = function open(category) {

                if (!category) {
                    $scope.subCategories = [];
                    return;
                }

                $scope.subCategories = category.children;
            }

    }]);

})(window.mao);