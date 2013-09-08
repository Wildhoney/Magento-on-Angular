(function($m) {

    "use strict";

    /**
     * @directive Slider
     * @contributors Adam Timberlake
     */
    $m.directive('slider', function ($rootScope) {

        return {
            restrict: 'A',

            /**
             * @method link
             * @param $scope {Object}
             * @param $element {Object}
             * @param $attributes {Object}
             */
            link: function ($scope, $element, $attributes) {

                /**
                 * @method _renderSlide
                 * Responsible for rendering the slider.
                 * @private
                 */
                var _renderSlider = function _renderSlide() {

                    console.log('Render');
                    $element.slider({
                        range   : true,
                        min     : $scope.minimumPrice,
                        max     : $scope.maximumPrice,
                        values  : [$scope.minRange || $scope.minimumPrice, $scope.maxRange || $scope.maximumPrice],
                        slide   : function(event, ui) {
                            $scope.setPriceRange(ui.values[0], ui.values[1]);
                            $scope.$apply();

                        }
                    });

                };

                // Attach the events that can invoke the `_renderSlider` method.
                $scope.$on('contentLoaded', _renderSlider);
                $rootScope.$on('$viewContentLoaded', _renderSlider);

            }
        };
    });

})(window.mao);