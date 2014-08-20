define(["order-collection", "order-display-view", "ttv", "uk-ttv-view", "de-ttv-view", "fake-data", "today", "today-view", "socket.io"], function(OrderCollection, OrderDisplayView, TTV, ukTTVView, deTTVView, fakeData, Today, TodayView, io) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var orderCollection = new OrderCollection();

    // Could use inheritance here
    var ukTTV = new TTV();
    var deTTV = new TTV();

    // Could use inheritance here
    var ukToday = new Today();
    var deToday = new Today();

    socket.on('orders', function(ordersData) {
        orderCollection.push(ordersData);
    });

    fakeUKData = function() {
        orderCollection.push(fakeData.uk);
    };

    fakeDEData = function() {
        orderCollection.push(fakeData.de);
    };

    orderCollection.on('add', function(order) {
        var total = order.get('total');
        if (!total) return;

        if (order.get('origin') === 'http://www.notonthehighstreet.com') {
            ukTTV.add(total);
            ukToday.addOrder(order);
        } else if (order.get('origin') === 'http://preview.notonthehighstreet.de') {
            deTTV.add(total);
            deToday.addOrder(order);
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

    new deTTVView({
        el: document.getElementById('de_ttv'),
        model: deTTV
    });

    new TodayView({
        el: document.getElementById('uk_today'),
        model: ukToday
    });

    new TodayView({
        el: document.getElementById('de_today'),
        model: deToday
    });
});
