define(["backbone", "order"], function(Backbone, Order) {
    var OrderCollection = Backbone.Collection.extend({
        model: Order,

        push: function(ordersData) {
            var collection = this;

            ordersData.forEach(function(orderData) {
                collection.add(orderData);
            });
        }
    });

    return OrderCollection;
});
