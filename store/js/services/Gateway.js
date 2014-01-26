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
         * @type {Object}
         * @private
         */
        service._productsCache = {};

        /**
         * @property primaryKey
         * @type {String}
         */
        service.primaryKey = 'id';

        /**
         * @method resolve
         * @param products {Array}
         * @return {Array}
         */
        service.resolve = function resolve(products) {

            var models = [];

            _.forEach(products, function forEach(product) {

                if (!_.isNumber(product)) {

                    // Find the primary key of the model.
                    var primaryKey = product[service.primaryKey];

                    // Store the product for retrieval next time.
                    service._productsCache[primaryKey] = product;
                    models.push(product);
                    return;

                }

                // Otherwise we've encountered a delta model and we just need to resolve it.
                models.push(service._productsCache[product]);

            });

            return models;

        };

        return service;

    }]);

})(window.maoApp);