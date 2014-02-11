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

                /**
                 * @method position
                 * @return {void}
                 */
                var position = function position() {

                    var difference = (50 - $window.scrollY),
                        offset     = (difference < 0) ? 0 : difference;

                    // Update the "top" property based on the amount of scroll, taking into
                    // consideration the header.
                    element[0].style.top = ((offset > 50) ? 50 : offset) + 'px';

                };

                // When the window is scrolled.
                angular.element($window).bind('scroll', position);

                // ...And immediately!
                position();

            }
        }

    }]);

})(window.moaApp);