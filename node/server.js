var io          = require('socket.io').listen(8888),
    fs          = require('fs'),
    _           = require('underscore'),
    request     = require('request'),
    Snapshot    = require('node-snapshot');

/**
 * @property url
 * @type {String}
 */
var url = 'http://localhost/Magento-on-Angular/api/public/products';

/**
 * @on connection
 */
io.sockets.on('connection', function (socket) {

    // Bootstrap Snapshot passing in the reference for the socket as a dependency.
    var $snapshot = new Snapshot('products').bootstrap(socket).useDelta(true);

    // Configure the defaults.
    $snapshot.setPageNumber(1);
    $snapshot.setPerPage(15);
    $snapshot.setRanges(['price']);

    request(url, function (error, response, body) {
        var json = JSON.parse(body);
        $snapshot.setCollection(json);
    });

    socket.on('snapshot/products/colours', function colours(ids) {

        console.log(ids);

        $snapshot.applyFilter('colour', function colour(colourDimension) {

            colourDimension.filterFunction(function(d) {
                return (d === 0) || _.contains(ids, d);
            });

        }, 'afresh');

    });

});