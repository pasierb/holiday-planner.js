define([
  'jquery',
  'underscore',
  'backbone',
  'models/calendar'
], function ($, _, Backbone, Calendar) {
  var CalendarView = Backbone.View.extend({
    el: ".page",
    render: function () {
      var calendar = new Calendar({ year: 2013 });
      this.$el.html(calendar.print());
    },
    events: {
      "click .day": "dayClickHandler"
    },
    dayClickHandler: function (e) {
      e.preventDefault();
      $(e.target).toggleClass("leave");
      console.log(e.target);
    }
  });

  return CalendarView;
});
