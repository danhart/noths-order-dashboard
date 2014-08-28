define(["backbone", "order"], function(Backbone, Order) {
    var OrderCollection = Backbone.Collection.extend({
        model: Order,

        totalTtv: function() {
            return this.pluck('total').reduce(function(ttv, total) {
                ttv[total.currency] += total.amount;
                return ttv;
            }, { USD: 0, GBP: 0, AUD: 0, EUR: 0});
        },
    });

    return OrderCollection;
});
