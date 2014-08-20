define(["backbone"], function(Backbone) {
    var Today = Backbone.Model.extend({
        defaults: {
            orderCount: 0
        },

        addOrder: function(order) {
            this.set('orderCount', this.get('orderCount') + 1);
            this.set('lastOrder', order);
        }
    });

    return Today;
});
