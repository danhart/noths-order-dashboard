define(["order-collection",
        "order-display-view",
        "fake-data",
        "socket.io", "jquery"], function(OrderCollection, OrderDisplayView, fakeData, io, $) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var ukOrderCollection = new OrderCollection();
    var deOrderCollection = new OrderCollection();

    socket.on('orders', function(ordersData) {
        ordersData.forEach(function(orderData) {
            if (orderData.origin === 'http://www.notonthehighstreet.com') {
                ukOrderCollection.add(orderData);
            } else if (orderData.origin === 'http://preview.notonthehighstreet.de') {
                deOrderCollection.add(orderData);
            }
        });
    });

    fakeUKData = function() {
        ukOrderCollection.push(fakeData.uk);
    };

    fakeDEData = function() {
        deOrderCollection.push(fakeData.de);
    };

    // orderCollection.on('add', function(order) {
    //     var total = order.get('total');
    //     if (!total) return;

    //     if (order.get('origin') === 'http://www.notonthehighstreet.com') {
    //         ukTTV.add(total);
    //         ukToday.addOrder(order);
    //     } else if (order.get('origin') === 'http://preview.notonthehighstreet.de') {
    //         deTTV.add(total);
    //         deToday.addOrder(order);
    //     }
    // });

    new OrderDisplayView({
        el: $('.order_display_uk')[0],
        collection: ukOrderCollection
    });

    new OrderDisplayView({
        el: $('.order_display_de')[0],
        collection: deOrderCollection
    });
});
