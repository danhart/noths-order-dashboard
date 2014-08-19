define(["backbone"], function(Backbone) {
    var TTV = Backbone.Model.extend({
        defaults: {
            "GBP": 0,
            "AUD": 0,
            "EUR": 0,
            "USD": 0
        },

        add: function(money) {
            this.set(
                money.currency,
                this.get(money.currency) + money.amount
            );
        }
    });

    return TTV;
});
