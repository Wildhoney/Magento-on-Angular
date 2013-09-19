(function($m, $j) {

    "use strict";

    /**
     * @factory $categoryHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$categoryHelper', ['$rootScope', '$q', function($rootScope, $q) {

        var service = {};

        // Resolved when the categories are loaded.
        var deferred = $q.defer();

        /**
         * @method hasLoaded
         * Determines whether the categories have been loaded yet.
         * @return {Object}
         */
        service.hasLoaded = function hasLoaded() {
            return deferred.promise;
        };

        /**
         * @method find
         * @param $category {String}
         * @param $subCategory {String}
         * @return {Object}
         */
        service.find = function find($category, $subCategory) {

            // Find the category based on its ident.
            var category = service.categories.filter(function(category) {
                return category.ident === $category;
            })[0];

            if ($subCategory) {

                // Attempt to find the sub-category if we've got one.
                var subCategory = category.children.filter(function(subCategory) {
                    return subCategory.ident === $subCategory;
                })[0];

            }

            return { category: category, subCategory: subCategory };
        };

        /**
         * @on loadedCategories
         * @param event {Object}
         * @param categories {Array}
         * Invoked when the categories have been loaded by the `CategoriesController`.
         * Responsible for resolving the promise.
         */
        $rootScope.$on('loadedCategories', function onLoadedCategories(event, categories) {

            // Store the categories, and resolve our promise!
            service.categories = categories;
            deferred.resolve();

        });

        return service;

    }]);

})(window.mao, window.jQuery);