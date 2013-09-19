(function($m) {

    $m.controller('CategoriesController', ['$scope', '$request',

        function CategoriesController($scope, $request) {

            $scope.categories = $request.getContent('categories');


    }]);

})(window.mao);