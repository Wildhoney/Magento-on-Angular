(function($moa) {

    "use strict";

    /**
     * @service Gateway
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('gateway', ['socket', function gatewayService(socket) {

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
         * @method setColour
         * @param ids {Array}
         * @return {void}
         */
        service.setColour = function setColour(ids) {
            socket.node.emit('snapshot/products/colours', ids);
        };

        /**
         * @method setManufacturer
         * @param ids {Array}
         * @return {void}
         */
        service.setManufacturer = function setManufacturer(ids) {
            socket.node.emit('snapshot/products/manufacturers', ids);
        };

        return service;

    }]);

})(window.moaApp);