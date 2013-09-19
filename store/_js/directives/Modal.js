(function($m) {

    "use strict";

    /**
     * @directive openModal
     * @contributors Adam Timberlake
     */
    $m.directive('openModal', function ($rootScope, $location, $window, $route) {

        return {
            restrict: 'A',

            /**
             * @method link
             * @param $scope {Object}
             * @param $element {Object}
             * @param $attributes {Object}
             */
            link: function ($scope, $element, $attributes) {

                $element.bind('click', function() {

                    $window.location.href += '?product=' + $attributes.ident;
                    return false;

                });

            }
        };
    });

})(window.mao);