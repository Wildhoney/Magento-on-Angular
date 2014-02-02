(function($moa) {

    "use strict";

    /**
     * @directive panel
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.directive('panel', function panelDirective() {

        return {
            restrict: 'A',
            link: function link(scope, element, attributes) {

                scope.$watch('filtersOpen', function(which) {

                    if (which !== attributes.panel) {
                        element.hide();
                        return;
                    }

                    element.show();

                });

            }
        }

    });

})(window.moaApp);