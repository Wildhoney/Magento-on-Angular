(function($m, $j) {

    "use strict";

    /**
     * @factory $attributeHelper
     * @contributors Adam Timberlake
     */
    $m.factory('$attributeHelper',

        ['$rootScope', '$http', '$q',

        function AttributeHelper($rootScope, $http, $q) {

            var $service = {};

            $service.manufacturers = {
                url         : '/Magento-on-Angular/api/public/attributes/manufacturer',
                defer       : $q.defer(),
                cache       : [],
                inactive    : []
            };

            $service.colours = {
                url         : '/Magento-on-Angular/api/public/attributes/color',
                defer       : $q.defer(),
                cache       : [],
                inactive    : []
            };

            /**
             * @method request
             * @param url {String}
             * @param promise {Object}
             * @param $block {Function}
             * @return {void}
             */
            $service.request = function request(url, promise, $block) {

                // Create our request and our promise which will be resolved when the AJAX
                // request is successful.
                var request = $http({method: 'GET', url: url});

                request.success(function(response) {
                    $block(response);
                    promise.resolve(response);
                });

            };

            /**
             * @method _injectInto
             * @param models {Array}
             * @param data {Object}
             * Responsible for injecting additional meta data into each model.
             * @return {void}
             * @private
             */
            var _injectInto = function _injectInto(models, data) {

                models.forEach(function(model) {

                    model._meta = {};

                    for (var key in data) {

                        if (!data.hasOwnProperty(key)) {
                            continue;
                        }

                        model._meta[key] = data[key];
                    }
                });

            };

            $service.request($service.colours.url, $service.colours.defer, function(response) {
                _injectInto(response, { type: 'colours', active: false });
                $service.colours.cache = response;
            });

            $service.request($service.manufacturers.url, $service.manufacturers.defer, function(response) {
                _injectInto(response, { type: 'manufacturers', active: false });
                $service.manufacturers.cache = response;
            });

            /**
             * @method getColours
             * @return []
             */
            $service.getColours = function getColours() {
                return $service.colours.cache;
            };

            /**
             * @method getManufacturers
             * @return []
             */
            $service.getManufacturers = function getManufacturers() {
                return $service.manufacturers.cache;
            };

            /**
             * @method hasLoaded
             * Determines whether the colours have been loaded yet.
             * @return {Object}
             */
            $service.hasLoaded = function hasLoaded(type) {
                return $service[type].defer.promise;
            };

            /**
             * @method toggle
             * @broadcasts attributeUpdated
             * @param model
             * @return {Boolean}
             */
            $service.toggle = function toggle(model) {

                // Find the record that's responsible for the attribute type. From that
                // we can discover the position in the array of the model's ID (if at all).
                var record          = $service[model._meta.type],
                    positionIndex   = record.inactive.indexOf(model.id),
                    isInArray       = (positionIndex !== -1);

                if (isInArray) {

                    // If the model is already in the array then we'll remove it.
                    record.inactive.splice(positionIndex, 1);
                    model._meta.active = false;

                } else {

                    // Otherwise we'll push it into the array.
                    record.inactive.push(model.id);
                    model._meta.active = true;

                }

                // Broadcast that an attribute has been changed, so that the $productHelper
                // can update its models.
                $rootScope.$broadcast('attributeUpdated', model._meta.type, record.inactive);

                return true;

            };

            return $service;

    }]);

})(window.mao, window.jQuery);