(function($m) {

    /**
     * @controller CategoriesController
     * @author Adam Timberlake
     */
    $m.controller('CategoriesController', ['$rootScope', '$scope', '$request', '$routeParams',

        function CategoriesController($rootScope, $scope, $request, $routeParams) {

            /**
             * @property categories
             * @type {Array}
             */
            $scope.categories = $request.getContent('categories', function(response) {

                $rootScope.$broadcast('mao/categories/loaded', response);

                if ($routeParams.category) {
                    var name        = $routeParams.category || $routeParams.subCategory,
                        category    = _.findWhere(response, { ident: name });

                    $rootScope.$broadcast('mao/categories/set', category);
                }

            });

            /**
             * @property selected
             * @type {Object}
             */
            $scope.selected = { category: null, subCategories: [] };

            /**
             * @property position
             * @ty[e {Number}
             */
            $scope.position = 0;

            /**
             * @method goto
             * Responsible for populating the necessary property for child categories.
             * @param category {Object}
             */
            $scope.goto = function goto(category) {

                if (!category) {
                    // Reset the `subCategories`.
                    $rootScope.$broadcast('mao/categories/unset');
                    $scope.selected.category        = null;
                    $scope.selected.subCategories   = [];
                    $scope.position                 -= 1;
                    return;
                }

                var selected    = $scope.selected;

                switch ($scope.position) {

                    case (0):
                        selected.category       = category;
                        selected.subCategories  = category.children;
                        $scope.position         = 1;
                        break;

                    case (1):
                        selected.subCategory    = selected.category.children;
                        $scope.position         = 1;
                        break;
                }

                // Broadcast the changes to the category.
                $rootScope.$broadcast('mao/categories/set', category);

            }

    }]);

})(window.mao);