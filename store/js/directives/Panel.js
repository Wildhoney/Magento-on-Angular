(function($mao) {

    "use strict";

    /**
     * @directive panel
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.directive('panel', ['$window', function panelDirective($window) {

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

    }]);

})(window.maoApp);