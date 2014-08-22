define(['backbone', 'jquery'], function(Backbone, $) {
    var TodayView = Backbone.View.extend({
        initialize: function() {
            this.$el = $(this.el);
            this.listenTo( this.model, 'change:orderCount', this.renderOrderCount );
            this.listenTo( this.model, 'change:lastOrder', this.renderLastOrder );
            this.render();
        },

        render: function() {
            this.renderOrderCount();
        },

        renderOrderCount: function() {
            this.$el.find('.order_count').text(
                "Orders: " + this.model.get('orderCount')
            );
        },

        renderLastOrder: function() {
        }
    });

    return TodayView;
});
