define(['backbone', 'mustache', 'jquery'], function(Backbone, mustache, $) {
    var template = document.getElementById('order_template').innerHTML;

    var OrderDisplayView = Backbone.View.extend({
        initialize: function() {
            this.listenTo( this.collection, 'add', this.render );
        },

        render: function(order) {
            var html = mustache.render(template, order.attributes);
            $('#order_display').append($(html));
        }
    });

    return OrderDisplayView;
});
