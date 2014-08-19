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
            this.$el = $(this.el);
            this.listenTo( this.collection, 'add', _.rateLimit(this.render, 1000) );
        },

        render: function(order) {
            var $oldOrders = this.$el.find('.order');
            $oldOrders.addClass('old').removeClass('current');

            $oldOrders.filter('.old').each(function() {
                var style = window.getComputedStyle($(this).get(0));
                var matrix = new WebKitCSSMatrix(style.webkitTransform);
                var newOffset = matrix.m41 - $(this).outerWidth();
                $(this).css('transform', 'translate3d(' + newOffset + 'px,0,0) scale(.7,.7)');
            });

            var $order = $(mustache.render(template, order.attributes));
            $order.addClass('current');
            $order.css('transform', 'translate3d(' + window.innerWidth + 'px,0,0)');
            this.$el.append($order);

            var centerOffset = window.innerWidth / 2 - $order.width() / 2;

            setTimeout(function() {
                $order.css('transform', 'translate3d(' + centerOffset + 'px,0,0)');
            }, 20);
        },

        setXPosition: function() {
            this.$el.css('transform', 'translate3d(' + this.xPosition + 'px,0,0)');
        }
    });

    return OrderDisplayView;
});
