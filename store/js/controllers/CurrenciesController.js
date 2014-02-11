(function($moa) {

    "use strict";

    /**
     * @controller CurrenciesController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('CurrenciesController', ['$scope', 'http', 'currency', function currenciesController($scope, http, currency) {

        /**
         * @property currencies
         * @type {Array}
         */
        $scope.currencies = [];

        /**
         * @property baseCurrency
         * @type {Object}
         */
        $scope.baseCurrency = {};

        /**
         * @method setCurrency
         * @param currency {Object}
         * @return {void}
         */
        $scope.setCurrency = currency.setCurrency;

        // Fetch all the currencies and their associated rates.
        http.getCurrencies().then(function then(currencies) {

            $scope.currencies = currencies;

            // Iterate over all of the currencies to discover the base.
            $scope.baseCurrency = _.find(currencies, function filter(model) {
                return !!model.base;
            });

            // Set the current currency to the base currency.
            $scope.setCurrency($scope.baseCurrency);

        });
        
    }]);

})(window.moaApp);