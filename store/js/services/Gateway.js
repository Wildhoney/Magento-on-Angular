(function($mao) {

    /**
     * @service Gateway
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.service('gateway', [function gatewayService() {

        var service = {};

        /**
         * @property _productsCache
         * @type {Array}
         * @private
         */
        service._productsCache = [];

        /**
         * @method resolve
         * @param products {Array}
         * @return {Array}
         */
        service.resolve = function resolve(products) {

            var models = [];

            _.forEach(products, function forEach(pitch) {

                if (!_.isNumber(pitch)) {

                    // Find the primary key of the model.
                    var primaryKey = pitch[service.primaryKey];

                    // Store the product for retrieval next time.
                    service._productsCache[primaryKey] = pitch;
                    models.push(pitch);
                    return;

                }

                // Otherwise we've encountered a delta model and we just need to resolve it.
                models.push(service._productsCache[pitch]);

            });

            return models;

        };

        return service;

    }]);

})(window.maoApp);