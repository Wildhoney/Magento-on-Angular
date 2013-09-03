(function($m, $j) {

    "use strict";

    /**
     * @controller ProductsController
     * @contributors Adam Timberlake
     */
    $m.controller('ProductsController',

        ['$rootScope', '$scope', '$http', '$productHelper',

        function ProductsController($rootScope, $scope, $http, $productHelper) {

        /**
         * @property products
         * @type {Array}
         */
        $scope.products = [];

        /**
         * @property hasLoaded
         * @type {Boolean}
         * @default false
         */
        $scope.hasLoaded = false;

        /**
         * @on switchedCategory
         * Responsible for switching the category.
         * @return {void}
         */
        $scope.$on('switchedCategory', function(event, id) {

            $productHelper.hasLoaded().then(function() {

                $productHelper.setCategoryId(id);

                $scope.products     = $productHelper.fetch();
                $scope.hasLoaded    = true;

            });

        });

    }]);

})(window.mao, window.jQuery);