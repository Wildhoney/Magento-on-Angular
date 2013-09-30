(function($m) {

    "use strict";

    /**
     * @controller CategoriesController
     * @contributors Adam Timberlake
     */
    $m.controller('CategoriesController', ['$scope', '$http',

        function CategoriesController($scope, $http) {

            /**
             * @property categories
             * @type {Array}
             */
            $scope.categories = [];

            var request = $http({method: 'GET', url: '/Magento-on-Angular/api/public/categories'});

            request.success(function(response) {
                $scope.categories = response;
                $scope.$emit('loadedCategories', response);
            });
        
    }]);

})(window.mao);