(function($moa) {

    "use strict";

    /**
     * @service Convert
     * @author Adam Timberlake
     * @module Moa
     */
    $moa.filter('convert', function ConvertService() {

        return function filterConvert(value, options) {

            if (!options || options.base) {

                // Return the base value if we're using the base currency.
                return value;

            }

            return (value * options.rate);

        }

    });

})(window.moaApp);