define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/settings.html',
    'bootstrap/dropdown'
], function($, _, Backbone, settingsTemplate) {
    var SettingsView = Backbone.View.extend({
        initialize: function(options) {
            this.vent = options.vent;
        },
        el: "#settings-container",
        events: {
            "click .location-select a": "clickLocation"
        },
        clickLocation: function(e) {
            var $target = $(e.target);
            var location = $target.data('value');
            this.vent.trigger("setLocation", location);
            this.setLocation($target.html(), location);
            e.preventDefault();
        },
        setLocation: function(name, code) {
            PublicHolidays.setFactory(code);
            var $ok = $(".location-select .glyphicon-ok", this.$el).remove();
            $("#settings-location-label", this.$el).html(name);
            $("a[data-value='" + code + "']", this.$el).prepend($ok);
        },
        render: function() {
            this.$el.html(settingsTemplate);
        }
    });

    return SettingsView;
});
