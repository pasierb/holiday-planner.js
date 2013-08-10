define([
  'jquery',
  'underscore',
  'backbone',
  'events'
], function ($, _, Backbone, vent) {
  var AppView = Backbone.View.extend({
    el: ".page-container",
    render: function () {
      require(['views/planner/calendar'], function (CalendarView) {
        var calendarView = new CalendarView({ vent: vent });
        calendarView.render();
      });
    }
  });

  return AppView;
});
