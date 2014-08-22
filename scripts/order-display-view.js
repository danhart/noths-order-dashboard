define(['backbone', 'mustache', 'jquery', 'underscore'], function(Backbone, mustache, $, _) {
    _.rateLimit = function(func, rate, async) {
        var queue = [];
        var timeOutRef = false;
        var currentlyEmptyingQueue = false;

        var emptyQueue = function() {
            if (queue.length) {
                currentlyEmptyingQueue = true;
                _.delay(function() {
                    if (async) {
                        _.defer(function() { queue.shift().call(); });
                    } else {
                        queue.shift().call();
                    }
                    emptyQueue();
                }, rate);
            } else {
                currentlyEmptyingQueue = false;
            }
        };

        return function() {
            var args = _.map(arguments, function(e) { return e; }); // get arguments into an array
            queue.push( _.bind.apply(this, [func, this].concat(args)) ); // call apply so that we can pass in arguments as parameters as opposed to an array
            if (!currentlyEmptyingQueue) { emptyQueue(); }
        };
    };

    var template = document.getElementById('order_template').innerHTML;

    var OrderDisplayView = Backbone.View.extend({
        initialize: function() {
            this.cacheOrderWidth();
            this.windowWidth = window.innerWidth;
            this.$el = $(this.el);
            this.listenTo( this.collection, 'add', this.render );
        },

        cacheOrderWidth: function() {
            var $order = $('<div/>', { 'class': 'order' }).hide().appendTo('body');
            this.orderWidth = parseInt($order.css('width'));
        },

        render: _.rateLimit(function(order) {
            this.updateOldOlders();

            var locals = $.extend(true, {}, order.attributes);
            locals.total.amount = order.get('total').amount.toFixed(2);

            var $order = $(mustache.render(template, locals));

            $order.addClass('current');
            $order.css('transform', 'translate3d(' + this.windowWidth + 'px,0,0)');
            this.$el.append($order);

            var centerOffset = this.windowWidth / 2 - this.orderWidth / 2;
            $order.data('currentOffset', centerOffset);

            // Give the browser some time to insert the new order
            setTimeout(function() {
                $order.css('transform', 'translate3d(' + centerOffset + 'px,0,0)');
            }, 100);
        }, 1100),

        updateOldOlders: function() {
            var view = this;

            var $oldOrders = this.$el.find('.order');
            $oldOrders.addClass('old').removeClass('current');

            if ($oldOrders.length > 5) {
                $oldOrders.first().remove();
            }

            $oldOrders.each(function() {
                var $oldOrder = $(this);
                var newOffset = $oldOrder.data('currentOffset') - view.orderWidth;
                $oldOrder.data('currentOffset', newOffset);
                $oldOrder.css('transform', 'translate3d(' + newOffset + 'px,0,0) scale(.7,.7)');
            });
        }
    });

    return OrderDisplayView;
});
