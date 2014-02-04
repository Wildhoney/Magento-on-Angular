var io          = {},
    fs          = require('fs'),
    _           = require('underscore'),
    request     = require('request'),
    snapshot    = require('node-snapshot');

/**
 * @property url
 * @type {String}
 */
var url = 'http://localhost/Magento-on-Angular/api/public/products';

/**
 * @property products
 * @type {String}
 */
var products = '';

// Retrieve the products so we'll always have a fresh copy to serve to
// new connections.
request(url, function (error, response, body) {
    products = JSON.parse(body);
    io = require('socket.io').listen(8888);
    beginListening();
});

/**
 * @method beginListening
 * @return {void}
 */
var beginListening = function beginListening() {

    /**
     * @on connection
     */
    io.sockets.on('connection', function (socket) {

        // Bootstrap Snapshot passing in the reference for the socket as a dependency.
        var $snapshot = new snapshot('products').bootstrap(socket).useDelta(true);

        // Configure the defaults.
        $snapshot.setPageNumber(1);
        $snapshot.setPerPage(15);
        $snapshot.setSortBy('name', 'asc');
        $snapshot.setRanges(['price']);
        $snapshot.setCollection(products, ['id', 'name', 'colour', 'price', 'manufacturer']);

        socket.on('snapshot/products/colours', function colours(ids) {

            $snapshot.applyFilter('colour', function colour(colourDimension) {

                colourDimension.filterFunction(function(d) {
                    return (d === 0) || _.contains(ids, d);
                });

            }, 'afresh');

        });

        socket.on('snapshot/products/manufacturers', function manufacturers(ids) {

            $snapshot.applyFilter('manufacturer', function manufacturer(manufacturerDimension) {

                manufacturerDimension.filterFunction(function(d) {
                    return (d === 0) || _.contains(ids, d);
                });

            }, 'afresh');

        });

        socket.on('disconnect', function() {
//        $snapshot = undefined;
        });

    });

};