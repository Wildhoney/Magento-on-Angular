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
             * @property activeCategory
             * @type {Object|Boolean}
             */
            $scope.activeCategory = false;

            /**
             * @constructor
             */
            $request.getContent('categories', function(categories) {

                categories.forEach(function(category) {
                    // Setup the children -> parent relationship so that each child
                    // knows who its parent is. No orphans here!
                    category.children.forEach(function(subCategory) {
                        subCategory.parent = category;
                    });
                });

                $scope.categories       = categories;

                var category            = $scope.getCategory();
                $scope.activeCategory   = category;

                $rootScope.$broadcast('mao/categories/loaded', categories);
                $rootScope.$broadcast('mao/categories/set', category);

            });

            /**
             * @on $viewContentLoaded
             * Responsible for providing the `activeCategory` to each controller that
             * is loaded in.
             */
            $rootScope.$on('$viewContentLoaded', function viewContentLoaded() {
                if ($scope.activeCategory) {
                    $rootScope.$broadcast('mao/categories/set', $scope.activeCategory);
                }
            });

            /**
             * @on mao/products/loaded
             * Responsible for notifying products of the active category once the products
             * have been successfully downloaded.
             */
            $scope.$on('mao/products/loaded', function productsLoaded() {
                $rootScope.$broadcast('mao/categories/set', $scope.getCategory());
            });


            /**
             * @method getCategory
             * Responsible for resolving the active category based on the route parameters.
             * @return {Object}
             */
            $scope.getCategory = function getCategory() {

                var category = {}, subCategory = {};

                if ($routeParams.category) {
                    var name    = $routeParams.subCategory || $routeParams.category;
                    category    = _.findWhere($scope.categories, { ident: name });
                }

                if (!category) {
                    category = {};

                    // Otherwise we're after a sub-category!
                    $scope.categories.forEach(function(category) {

                        var found = _.findWhere(category.children, { ident: name });

                        // We've found the sub-category!
                        if (found) subCategory = found;

                    });

                }

                // If we're unable to locate a category in either `category` or `subCategory`.
                if ((!'id' in category) && (!'id' in subCategory)) {
                    throw 'Unable to locate category from $routeParams: '. $routeParams.category;
                }

                return ('id' in subCategory) ? subCategory : category;

            };

            /**
             * @method gotoCategory
             * @param category {Object}
             * Responsible for populating the necessary property for child categories.
             * @return {void}
             */
            $scope.gotoCategory = function gotoCategory(category) {

                if (!category) {
                    // Reset the `subCategories`.
                    $rootScope.$broadcast('mao/categories/unset');
                    $scope.selected.category        = null;
                    $scope.selected.subCategories   = [];
                    $scope.position                 -= 1;
                    return;
                }

                var selected = $scope.selected;

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

                $scope.activeCategory = category;

            }

    }]);

})(window.mao);