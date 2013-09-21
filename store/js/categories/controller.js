(function($m) {

    /**
     * @controller CategoriesController
     * @author Adam Timberlake
     */
    $m.controller('CategoriesController', ['$rootScope', '$scope', '$request',

        function CategoriesController($rootScope, $scope, $request) {

            /**
             * @property categories
             * @type {Array}
             */
            $scope.categories = $request.getContent('categories', function() {
                $rootScope.$broadcast('mao/categories/loaded');
            });

            /**
             * @property subCategories
             * @type {Array}
             */
            $scope.subCategories = [];

            /**
             * @method goto
             * Responsible for populating the necessary property for child categories.
             * @param category {Object}
             */
            $scope.goto = function goto(category) {

                if (!category) {
                    // Reset the `subCategories`.
                    $scope.subCategories = [];
                    return;
                }

                // Otherwise we'll populate the `subCategories` with the category's
                // sub-categories.
                $scope.subCategories = category.children;

            }

    }]);

})(window.mao);