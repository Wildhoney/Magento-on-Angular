(function($moa) {

    "use strict";

    /**
     * @controller DashboardController
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.controller('DashboardController', ['$scope', 'dashboard',

    function dashboardController($scope, dashboard) {

        /**
         * @property basketCount
         * @type {Number}
         * @default 0
         */
        $scope.basketCount = 0;

        // When the basket has been updated.
        $scope.$on('basket/updated', function basketUpdated(event, items) {
            $scope.basketCount = dashboard.itemCount(items);
        });
        
    }]);

})(window.moaApp);