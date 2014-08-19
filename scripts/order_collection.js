define(["backbone", "order"], function(Backbone, Order) {
    var OrderCollection = Backbone.Collection.extend({
        model: Order
    });
});
