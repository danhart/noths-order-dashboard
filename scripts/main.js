define(["order-collection",
        "stats",
        "order-display-view",
        "stats-view",
        "fake-data",
        "socket.io",
        "jquery"], function(OrderCollection, Stats, OrderDisplayView, StatsView, fakeData, io, $) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    // Get me some orders and some stats
    socket.emit('order-query', {
        last: 1,
        origin: 'uk',
        date: new Date()
    });

    socket.emit('order-query', {
        last: 1,
        origin: 'de',
        date: new Date()
    });

    socket.emit('stats');

    var ukOrderCollection = new OrderCollection();
    var deOrderCollection = new OrderCollection();
    var ukStats = new Stats();
    var deStats = new Stats();

    fakeUKData = function() {
        ukOrderCollection.add(fakeData.uk);
    };

    fakeDEData = function() {
        deOrderCollection.add(fakeData.de);
    };

    socket.on('order', function(orderData) {
        if (orderData.origin === 'http://www.notonthehighstreet.com') {
            ukOrderCollection.add(orderData);
        } else if (orderData.origin === 'http://preview.notonthehighstreet.de') {
            deOrderCollection.add(orderData);
        }
    });

    socket.on('stats', function(stats) {
        ukStats.set({
            orderCount: stats.todaysUkOrderCount,
            ttv:        stats.todaysUkTtv
        });

        deStats.set({
            orderCount: stats.todaysDeOrderCount,
            ttv:        stats.todaysDeTtv
        });
    });

    new StatsView({
        el: $('.order_display_uk .stats')[0],
        model: ukStats
    });

    new StatsView({
        el: $('.order_display_de .stats')[0],
        model: deStats
    });

    new OrderDisplayView({
        el: $('.order_display_uk')[0],
        collection: ukOrderCollection
    });

    new OrderDisplayView({
        el: $('.order_display_de')[0],
        collection: deOrderCollection
    });
});
