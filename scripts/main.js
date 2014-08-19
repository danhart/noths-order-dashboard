define(["order-collection", "order-display-view", "ttv", "uk-ttv-view", "socket.io"], function(OrderCollection, OrderDisplayView, TTV, ukTTVView, io) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var orderCollection = new OrderCollection();
    var ukTTV = new TTV();

    socket.on('orders', function(ordersData) {
        orderCollection.push(ordersData);
    });

    orderCollection.on('add', function(order) {
        var total = order.get('total');

        if (total) {
            ukTTV.add(total);
        }
    });

    new OrderDisplayView({
        el: document.getElementById('order_display'),
        collection: orderCollection
    });

    new ukTTVView({
        el: document.getElementById('uk_ttv'),
        model: ukTTV
    });
});
