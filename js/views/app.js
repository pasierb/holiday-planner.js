define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/calendar/page'
], function ($, _, Backbone, calendarPage) {
  var AppView = Backbone.View.extend({
    el: ".container",
    render: function () {
      this.$el.html(calendarPage);
    }
  });

  return AppView;
});
