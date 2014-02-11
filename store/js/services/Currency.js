(function($moa) {

    "use strict";

    /**
     * @service Currency
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('currency', ['$rootScope', function currencyService($rootScope) {

        var service = {};

        /**
         * @property model
         * @type {Object}
         */
        service.model = false;

        /**
         * @method setCurrency
         * @param model {Object}
         * @return {void}
         */
        service.setCurrency = function setCurrency(model) {
            service.model = model;
            $rootScope.$broadcast('currency/changed', model);
        };

        return service;

    }]);

})(window.moaApp);