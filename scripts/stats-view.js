define(['backbone', 'jquery'], function(Backbone, $) {
    var StatsView = Backbone.View.extend({
        initialize: function() {
            this.$el = $(this.el);
            this.$ttv = this.$el.find('.ttv');
            this.$orderCount = this.$el.find('.order_count .value');
            this.listenTo( this.model, 'change:ttv', this.renderTtv );
            this.listenTo( this.model, 'change:orderCount', this.renderOrderCount );
        },

        renderTtv: function() {
            var ttv = this.model.get('ttv');
            this.$ttv.find(".AUD").text("$" + ttv.AUD.toFixed(2));
            this.$ttv.find(".GBP").text("£" + ttv.GBP.toFixed(2));
            this.$ttv.find(".EUR").text("€" + ttv.EUR.toFixed(2));
            this.$ttv.find(".USD").text("$" + ttv.USD.toFixed(2));
        },

        renderOrderCount: function() {
            var orderCount = this.model.get('orderCount');
            this.$orderCount.text(orderCount);
        }
    });

    return StatsView;
});
