define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/settings'
], function ($, _, Backbone, settingsTemplate) {
  var SettingsView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
    },
    el: "#settings-container",
    events: {
      "click .location-select a": "setLocation"
    },
    setLocation: function (e) {
      PublicHolidays.setFactory(this.location);

      var $target = $(e.target);
      var $ok = $(".location-select .glyphicon-ok", this.$el).remove();
      var location = $target.data('value');

      this.vent.trigger("setLocation", location);
      $("#settings-location-label", this.$el).html($target.html());
      $target.prepend($ok);

      e.preventDefault();
    },
    render: function () {
      this.$el.html(settingsTemplate);
    }
  });

  return SettingsView;
});

