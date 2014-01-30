(function($mao) {

    "use strict";

    /**
     * @controller ProductController
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.controller('ProductController', ['$scope', 'http', function ProductController($scope, http) {

        /**
         * @method addBasket
         * @param id {Number}
         * @return {void}
         */
        $scope.addBasket = function addBasket(id) {

            http.addBasket(id).then(function then(response) {
                //...
            });

        };

    }]);

})(window.maoApp);