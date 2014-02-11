(function($moa) {

    "use strict";

    /**
     * @directive filter
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.directive('filter', ['http', function filterDirective(http) {

        return {
            restrict: 'A',
            scope: {
                batched: '=batch',
                update: '&'
            },
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

                // When the user toggles the values to select or deselect all.
                scope.$watch('batched', function toggled(value) {

                    // Determine what we should set the value to.
                    var booleanValue = (value === 'selectAll') ? true : false;

                    // Iterate over each one to set them all to the determined boolean value.
                    _.forEach(scope.selected, function forEach(selected, index) {
                        scope.selected[index] = booleanValue;
                    });

                    // Okay, here we go!
                    scope.initiateUpdate();

                });

                // Issue the AJAX request for the specified options.
                http.getAttribute(attributes.namespace).then(function then(response) {

                    scope.models = response.data;

                    // Iterate over each model to make them enabled by default.
                    _.forEach(scope.models, function forEach(model) {
                        scope.selected[model.id] = true;
                    });

                });

                /**
                 * @method initiateUpdate
                 * @param selected {Object}
                 * @return {void}
                 */
                scope.initiateUpdate = function update(selected) {
                    scope.update({ type: scope.type, selected: scope.prepare(selected) });
                };

                /**
                 * @method prepare
                 * @param models {Array}
                 * @return {Array}
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

})(window.moaApp);