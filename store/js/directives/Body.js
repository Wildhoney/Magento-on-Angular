(function($m) {

    "use strict";

    /**
     * @directive Body
     * @contributors Adam Timberlake
     */
    $m.directive('body', function ($rootScope) {

        return {
            restrict: 'E',

            /**
             * @method link
             * @param $scope {Object}
             * @param $element {Object}
             */
            link: function ($scope, $element) {

                $element.bind('keyup', function onClick(event) {

                    if (event.keyCode !== 27) {
                        return;
                    }

                    // Emit the event to unload the product from the DOM.
                    $rootScope.$broadcast('unloadProduct');
                    $scope.$apply();

                });

            }
        };
    });

})(window.mao);