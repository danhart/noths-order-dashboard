define(['backbone', 'mustache', 'jquery'], function(Backbone, mustache, $) {
    var template = document.getElementById('order_template').innerHTML;

    var OrderDisplayView = Backbone.View.extend({
        initialize: function() {
            this.$el = $(this.el);
            this.listenTo( this.collection, 'add', this.render );
            this.xPosition = window.innerWidth;
            this.setXPosition();
        },

        render: function(order) {
            var $order = $(mustache.render(template, order.attributes));
            $order.width(window.innerWidth);
            this.$el.append($order);
            this.xPosition -= $order.width();
            this.setXPosition();
        },

        setXPosition: function() {
            this.$el.css('-webkit-transform', 'translate3d(' + this.xPosition + 'px,0,0)');
        }
    });

    return OrderDisplayView;
});
