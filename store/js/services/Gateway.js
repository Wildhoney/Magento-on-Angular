(function($mao) {

    "use strict";

    /**
     * @service Gateway
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.service('gateway', ['socket', function gatewayService(socket) {

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

        /**
         * @method setPriceRange
         * @param min {Number}
         * @param max {Number}
         * @return {void}
         */
        service.setPriceRange = function setPriceRange(min, max) {
            socket.node.emit('snapshot/products/rangeFilter', 'price', [min, max]);
        };

        /**
         * @method setName
         * @param text {String}
         * @return {void}
         */
        service.setName = function setName(text) {
            socket.node.emit('snapshot/products/fuzzyFilter', 'name', text);
        };

        /**
         * @method setColours
         * @param ids {Array}
         * @return {void}
         */
        service.setColours = function setColours(ids) {
            socket.node.emit('snapshot/products/colours', ids);
        };

        return service;

    }]);

})(window.maoApp);