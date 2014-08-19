define(['backbone', 'jquery'], function(Backbone, $) {
    var ukTTVView = Backbone.View.extend({
        initialize: function() {
            this.$el = $(this.el);
            this.listenTo( this.model, 'add', this.render );
            this.render();
        },

        render: function() {
            this.$el.find(".AUD").text("$" + this.model.attributes.AUD.toFixed(2));
            this.$el.find(".GBP").text("£" + this.model.attributes.GBP.toFixed(2));
            this.$el.find(".EUR").text("€" + this.model.attributes.EUR.toFixed(2));
            this.$el.find(".USD").text("$" + this.model.attributes.USD.toFixed(2));
        }
    });

    return ukTTVView;
});
