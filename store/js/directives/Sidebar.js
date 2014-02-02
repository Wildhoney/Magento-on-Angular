(function($moa) {

    "use strict";

    /**
     * @directive sidebar
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.directive('sidebar', ['$window', function sidebarDirective($window) {

        return {
            restrict: 'A',
            link: function link(scope, element) {

                angular.element($window).bind('scroll', function resized() {

                    var difference = (50 - $window.scrollY),
                        offset     = (difference < 0) ? 0 : difference;

                    // Update the "top" property based on the amount of scroll, taking into
                    // consideration the header.
                    element[0].style.top = ((offset > 50) ? 50 : offset) + 'px';

                });

            }
        }

    }]);

})(window.moaApp);