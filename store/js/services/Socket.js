(function($mao) {

    /**
     * @service Socket
     * @author Adam Timberlake
     * @module Mao
     */
    $mao.service('socket', ['socket', function socketService() {

        var service = {};

        /**
         * @property url
         * @type {String}
         */
        service.url = 'http://localhost:8888/';

        /**
         * @method connect
         * @param url {String}
         * @return {void}
         */
        service.connect = function connect(url) {


        };

        // Finally we can establish the connection with the Node server.
        service.node = service.connect(service.url);

    }]);

})(window.maoApp);