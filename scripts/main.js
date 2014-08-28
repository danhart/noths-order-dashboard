define(["order-collection",
        "order-display-view",
        "fake-data",
        "socket.io", "jquery"], function(OrderCollection, OrderDisplayView, fakeData, io, $) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var ukOrderCollection = new OrderCollection();
    var deOrderCollection = new OrderCollection();

    socket.on('order', function(orderData) {
        if (orderData.origin === 'http://www.notonthehighstreet.com') {
            ukOrderCollection.add(orderData);
        } else if (orderData.origin === 'http://preview.notonthehighstreet.de') {
            deOrderCollection.add(orderData);
        }
    });

    fakeUKData = function() {
        ukOrderCollection.push(fakeData.uk);
    };

    fakeDEData = function() {
        deOrderCollection.push(fakeData.de);
    };

    new OrderDisplayView({
        el: $('.order_display_uk')[0],
        collection: ukOrderCollection
    });

    new OrderDisplayView({
        el: $('.order_display_de')[0],
        collection: deOrderCollection
    });
});
