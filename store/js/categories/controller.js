(function($m) {

    /**
     * @controller CategoriesController
     * @author Adam Timberlake
     */
    $m.controller('CategoriesController',

        ['$rootScope', '$scope', '$request', '$routeParams',

        function CategoriesController($rootScope, $scope, $request, $routeParams) {

            /**
             * @property categories
             * @type {Array}
             */
            $scope.categores = [];

            /**
             * @constructor
             */
            $request.getContent('categories', function(response) {
                $scope.categories = response;
                $rootScope.$broadcast('mao/categories/loaded', response);
                $rootScope.$broadcast('mao/categories/set', $scope.getCategory());
            });

            /**
             * @method getCategory
             * Responsible for resolving the active category based on the route parameters.
             * @return {Object}
             */
            $scope.getCategory = function getCategory() {

                var category = {};

                if ($routeParams.category) {
                    var name    = $routeParams.category || $routeParams.subCategory;
                    category    = _.findWhere($scope.categories, { ident: name });
                }

                return category;

            };

            /**
             * @on mao/products/loaded
             * Responsible for notifying products of the active category once the products
             * have been successfully downloaded.
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {
                $rootScope.$broadcast('mao/categories/set', $scope.getCategory());
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