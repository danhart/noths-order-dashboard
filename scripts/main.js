define(["order-collection", "order-display-view", "socket.io"], function(OrderCollection, OrderDisplayView, io) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var orderCollection = new OrderCollection();

    socket.on('orders', function(ordersData) {
        orderCollection.push(ordersData);
    });

    new OrderDisplayView({
        el: document.getElementById('order_display'),
        collection: orderCollection
    });
});
