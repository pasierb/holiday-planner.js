define([
  'jquery',
  'underscore',
  'backbone',
  'events'
], function ($, _, Backbone, vent) {
  var AppView = Backbone.View.extend({
    el: ".page-container",
    render: function () {
      require(['views/planner/page'], function (PlannerPage) {
        var calendarView = new PlannerPage({ vent: vent });
        calendarView.render();
      });
    }
  });

  return AppView;
});
