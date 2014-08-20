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
            var view = this;

            this.windowWidth = window.innerWidth;
            this.$el = $(this.el);
            this.listenTo( this.collection, 'add', this.render );
        },

        render: _.rateLimit(function(order) {
            var locals = $.extend(true, {}, order.attributes);
            locals.total.amount = order.get('total').amount.toFixed(2);

            var $oldOrders = this.$el.find('.order');
            $oldOrders.addClass('old').removeClass('current');

            $oldOrders.filter('.old').each(function() {
                var style = window.getComputedStyle($(this).get(0));
                var matrix = new WebKitCSSMatrix(style.webkitTransform);
                var newOffset = matrix.m41 - $(this).outerWidth();
                $(this).css('transform', 'translate3d(' + newOffset + 'px,0,0) scale(.7,.7)');
            });

            var $order = $(mustache.render(template, locals));

            $order.addClass('current');
            $order.css('transform', 'translate3d(' + this.windowWidth + 'px,0,0)');
            this.$el.append($order);

            var centerOffset = this.windowWidth / 2 - $order.width() / 2;

            setTimeout(function() {
                $order.css('transform', 'translate3d(' + centerOffset + 'px,0,0)');
            }, 20);
        }, 1020),

        setXPosition: function() {
            this.$el.css('transform', 'translate3d(' + this.xPosition + 'px,0,0)');
        }
    });

    return OrderDisplayView;
});
