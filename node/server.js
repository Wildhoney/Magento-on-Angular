var io          = {},
    fs          = require('fs'),
    _           = require('underscore'),
    request     = require('request'),
    newRelic    = require('newrelic'),
    snapshot    = require('node-snapshot'),
    config      = require('../config.json');

/**
 * @property url
 * @type {String}
 */
var url = config.api.host + '/products';

/**
 * @property products
 * @type {String}
 */
var products = '';

// Retrieve the products so we'll always have a fresh copy to serve to
// new connections.
request({url:url,headers:{"Accept": "application/json"}}, function (error, response, body) {
    if ((error) || (response.statusCode!=200)){
        console.log("Error connecting to magento: "+(error || response.body));
        process.exit();
    }
    else{
        products = JSON.parse(body);
        io = require('socket.io').listen(parseInt(config.socket.port));
        beginListening();
    }
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
        $snapshot.setGroups(['manufacturer', 'colour']);
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
