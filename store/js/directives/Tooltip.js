(function($moa, $angular) {

    "use strict";

    /**
     * @directive tooltip
     * @param $compile {Function}
     * @param $timeout {Function}
     * @param $log {Object}
     * @param skeleton {Object}
     */
    $moa.directive('tooltip', ['$compile', '$timeout', '$log', 'skeleton',

        function tooltip($compile, $timeout, $log, skeleton) {

            return {
                restrict:   'A',
                scope:      {
                    text:   '@tooltip',
                    mobile: '@tooltipMobile'
                },
                transclude: true,
                replace:    true,
                template:   '<span ng-transclude ng-mousemove="show($event)" ng-mouseleave="hide($event)" ng-click="hide($event)"></span>',

                link: function link(scope, element) {

                    /**
                     * @property x
                     * @type {Number}
                     * @default 0
                     */
                    scope.x = 0;

                    /**
                     * @property y
                     * @type {Number}
                     * @default 0
                     */
                    scope.y = 0;

                    // Body element Angularised!
                    var _body = $angular.element('body');

                    if (!scope.text) {

                        // Let the developer know that they didn't pass a value to the tooltip!
                        $log.error($angular.lowercase(element[0].nodeName) + ' does not have any value for the tooltip!');
                        return;

                    }

                    /**
                     * @method show
                     * @param event {Object}
                     * @return {void}
                     */
                    scope.show = function show(event) {

                        if (scope.mobile === 'hide' && skeleton.mobile) {
                            // Don\t show the popup if it's "tiny" or "small".
                            return;
                        }

                        // Update the cursor position of the mouse!
                        scope.x = event.clientX;
                        scope.y = event.clientY;

                        var tooltip = _body.find('.tooltip');

                        if (tooltip.length === 0) {

                            // Compile the tooltip.
                            tooltip = $compile('<div class="tooltip">' + scope.text + '</div>')(scope);

                            // ...And then append it to the current directive.
                            _body.append(tooltip);

                            $timeout(function() {
                                // Add the "active" class name in the next run-loop.
                                tooltip.addClass('active');
                            }, 1);

                        }

                        tooltip.css('top', (scope.y + 20) + 'px');
                        tooltip.css('left', (scope.x + 20) + 'px');

                    };

                    /**
                     * @method hide
                     * @return {void}
                     */
                    scope.hide = function hide() {
                        _body.find('.tooltip').remove();
                    };

                }
            };

        }]);

})(window.moaApp, window.angular);