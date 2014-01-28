(function($mao) {

    "use strict";

    /**
     * @directive filter
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.directive('filter', ['$window', function filterDirective($window) {

        return {
            restrict: 'A',
            link: function link(scope, element) {

                angular.element($window).bind('scroll', function resized() {

                    var difference = (50 - $window.scrollY),
                        offset     = (difference < 0) ? 0 : difference;

                    // Update the "top" property based on the amount of scroll, taking into
                    // consideration the header.
                    element[0].style.top = offset + 'px';

                });

            }
        }

    }]);

})(window.maoApp);