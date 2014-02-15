(function($moa) {

    "use strict";

    /**
     * @service Socket
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.service('socket', ['$window', 'config', function socketService($window, config) {

        var service = {};

        /**
         * @property url
         * @type {String}
         */
        service.url = 'http://' + config.socket.host + ':' + config.socket.port + '/';

        /**
         * @method _getSocket
         * @return {Object}
         * @private
         */
        service._getSocket = function _getSocket() {
            return $window.io;
        };

        /**
         * @method connect
         * @param url {String}
         * @return {Object}
         */
        service.connect = function connect(url) {
            return service._getSocket().connect(url);
        };

        // Finally we can establish the connection with the Node server.
        service.node = service.connect(service.url);

        return service;

    }]);

})(window.moaApp);
