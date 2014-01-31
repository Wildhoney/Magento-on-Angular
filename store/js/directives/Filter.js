(function($mao) {

    "use strict";

    /**
     * @directive filter
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.directive('filter', ['http', function filterDirective(http) {

        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'views/filter.html',
            link: function link(scope, element, attributes) {

                /**
                 * @property type
                 * @type {String}
                 */
                scope.type = attributes.property;

                /**
                 * @property models
                 * @type {Array}
                 */
                scope.models = [];

                /**
                 * @property selected
                 * @type {Object}
                 */
                scope.selected = {};

                // Issue the AJAX request for the specified options.
                http.getAttribute(attributes.namespace).then(function then(response) {

                    scope.models = response.data;

                    // Iterate over each model to make them enabled by default.
                    _.forEach(scope.models, function forEach(model) {
                        scope.selected[model.id] = true;
                    });

                });

                /**
                 * @method prepare
                 * @param models {Array}
                 * @return {void}
                 */
                scope.prepare = function prepare(models) {

                    var _models = [];

                    _.forEach(models, function forEach(model, index) {

                        if (model !== true) {
                            return;
                        }

                        _models.push(+index);

                    });

                    return _models;

                };

            }
        }

    }]);

})(window.maoApp);