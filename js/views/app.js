define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/layout.html'
], function ($, _, Backbone, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el: ".container",
    render: function () {
      this.$el.html(layoutTemplate);
      require(['views/planner/calendar'], function (CalendarView) {
        var calendarView = new CalendarView();
        calendarView.render();
      });
    }
  });

  return AppView;
});
