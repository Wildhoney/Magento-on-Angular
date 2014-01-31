(function($mao) {

    "use strict";

    /**
     * @directive accordionGroup
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.directive('accordionGroup', function accordionGroupDirective() {

        return {
            restrict: 'A',
            controller: ['$scope', function accordionGroupController($scope) {

                /**
                 * @property activeScope
                 * @type {Object}
                 */
                $scope.activeScope = {};

                /**
                 * @method setActive
                 * @param scope {Object}
                 * @return {void}
                 */
                $scope.setActive = function setActive(scope) {

                    $scope.$apply(function() {

                        if ($scope.activeScope === scope) {
                            $scope.activeScope = {};
                            return;
                        }

                        $scope.activeScope = scope;

                    });
                };

            }]
        }

    });

    /**
     * @directive accordionItem
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.directive('accordionItem', function accordionItemDirective() {

        return {
            restrict: 'A',
            scope: true,
            link: function link(scope, element) {

                element.bind('click', function click() {
                    scope.setActive(scope);
                });

                // When the `activeScope` has been changed.
                scope.$watch('activeScope', function activeScopeChanged(activeScope) {

                    if (activeScope !== scope) {
                        element.css('max-height', '32px');
                        return;
                    }

                    element.css('max-height', '300px');

                });

            }
        }

    });

})(window.maoApp);