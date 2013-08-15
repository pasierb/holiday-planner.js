define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/planner',
  'views/planner/year_changer',
  'views/planner/calendar'
], function ($, _, Backbone, plannerTemplate, YearChangerView, CalendarView) {
  var PlannerPage = Backbone.View.extend({
    initialize: function (options) {
      this.year = 2013;
      this.vent = options.vent;
      var yearChangerView = new YearChangerView({ vent: this.vent, year: this.year });
    },
    el: ".page",
    render: function () {
      this.$el.html(plannerTemplate);
      var calendarView = new CalendarView({ year: this.year, vent: this.vent });
      $('#planner-tabs a', this.$el).click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        return false;
      });

      $('#planner-tabs a:first', this.$el).tab("show");
      calendarView.render();
    }
  });

  return PlannerPage;
});
