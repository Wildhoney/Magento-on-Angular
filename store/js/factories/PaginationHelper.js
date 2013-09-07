/**
 * @param $m {Object} Mao
 * @param $j {Function} jQuery
 */
(function($m, $j) {

    "use strict";

    /**
     * @factory $pagination
     * @contributors Adam Timberlake
     */
    $m.factory('$pagination', ['$routeParams', function($routeParams) {

        var $service = {};

        /**
         * @method getPageNumber
         * Responsible for checking whether the page number is actually masquerading
         * as the sub-category ID.
         * @return {Number}
         */
        $service.getPageNumber = function getPageNumber() {

            if ($routeParams.subCategory && $routeParams.subCategory.match(/^\d+$/)) {

                // If the sub-category is a pure number, then we'll assume it's the page
                // number instead.
                $routeParams.pageNumber = $routeParams.subCategory;
                delete $routeParams.subCategory;

            }

            return $routeParams.pageNumber || 1

        };

        return $service;

    }]);

})(window.mao, window.jQuery);