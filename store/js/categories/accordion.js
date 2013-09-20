(function($m) {

    "use strict";

    /**
     * @directive Accordion
     * @contributors Adam Timberlake
     */
    $m.directive('accordion', function ($rootScope) {

        return {
            restrict: 'A',

            /**
             * @method link
             * @param $scope {Object}
             * @param $element {Object}
             */
            link: function ($scope, $element) {

                $element.bind('click', function onClick(event) {
                    $element.addClass('active');
                    var ul = $element.
                });

            }
        };
    });

})(window.mao);