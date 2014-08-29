define(['backbone', 'mustache', 'jquery', 'underscore', 'rate-limit'], function(Backbone, mustache, $, _) {
    var template = document.getElementById('order_template').innerHTML;

    var OrderDisplayView = Backbone.View.extend({
        initialize: function() {
            this.cacheOrderWidth();
            this.$el = $(this.el);
            this.listenTo( this.collection, 'add', this.render );
        },

        cacheOrderWidth: function() {
            var $order = $('<div/>', { 'class': 'order' }).hide().appendTo('body');
            this.orderWidth = parseInt($order.css('width'));
        },

        render: _.rateLimit(function(order) {
            var view = this;
            var locals = $.extend(true, {}, order.attributes);
            locals.total.amount = order.get('total').amount.toFixed(2);

            var $order = $(mustache.render(template, locals));

            this.$el.append($order);

            // Give the browser some time to insert the new order
            setTimeout(function() {
                view.updateOldOlders();
                $order.addClass('current');
            }, 100);
        }, 1000),

        updateOldOlders: function() {
            var view = this;

            this.$el.find('.order.current').removeClass('current').addClass('old');
            var $oldOrders = this.$el.find('.order.old');

            if ($oldOrders.length > 5) {
                $oldOrders.first().remove();
            }
        }
    });

    return OrderDisplayView;
});
