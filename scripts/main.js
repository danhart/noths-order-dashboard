define(["order-collection", "order-display-view", "ttv", "uk-ttv-view", "socket.io"], function(OrderCollection, OrderDisplayView, TTV, ukTTVView, io) {
    var socket = io.connect('159.253.142.200:10052', {
        resource: 'noths_order_geo/socket.io'
    });

    var orderCollection = new OrderCollection();
    var ukTTV = new TTV();

    socket.on('orders', function(ordersData) {
        orderCollection.push(ordersData);
    });

    fakeData = function() {
        orderCollection.push([
           {
              "geo":{
                 "place":"Loughborough",
                 "county":"",
                 "country":"United Kingdom"
              },
              "product":{
                 "imageURL":{
                    "micro":"/system/product_images/images/001/318/256/micro_personalised-classic-book-lever-box-files.jpg",
                    "mini":"/system/product_images/images/001/318/256/mini_personalised-classic-book-lever-box-files.jpg"
                 },
                 "title":"Old Book Style Lever Arch Or Box File Storage",
                 "partnerName":"KleverCase",
                 "url":"/klevercase/product/personalised-classic-book-lever-box-files",
                 "geo":{
                    "place":"Fawley",
                    "county":"Hampshire",
                    "country":"United Kingdom"
                 }
              },
              "deliveryAddress":"Loughborough, United Kingdom",
              "senderAddress":"Fawley, Hampshire, United Kingdom",
              "date":"2014-08-19T22:08:39.222Z",
              "origin":"http://www.notonthehighstreet.com"
           }
        ]);
    };

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
