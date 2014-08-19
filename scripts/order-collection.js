define(["backbone", "order"], function(Backbone, Order) {
    var OrderCollection = Backbone.Collection.extend({
        model: Order,

        push: function(ordersData) {
            var collection = this;

            ordersData.forEach(function(orderData) {
                collection.add({
                    product: {
                        title: orderData.product.title,
                        imageURL: orderData.product.imageURL.mini
                    }
                });
            });
        }
    });

    return OrderCollection;
});
