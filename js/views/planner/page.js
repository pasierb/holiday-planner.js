define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/planner.html',
    'views/planner/year_changer',
    'views/planner/calendar',
    'views/planner/holidays_list',
    'bootstrap/tab'
], function($, _, Backbone, plannerTemplate, YearChangerView, CalendarView, HolidaysListView) {
    var PlannerPage = Backbone.View.extend({
        initialize: function(options) {
            this.year = (new Date()).getFullYear();
            this.vent = options.vent;

            new YearChangerView({
                vent: this.vent,
                year: this.year
            });
        },
        el: ".page",
        render: function() {
            this.$el.html(plannerTemplate);

            var calendarView = new CalendarView({
                year: this.year,
                vent: this.vent
            });
            var holidaysListView = new HolidaysListView({
                year: this.year,
                vent: this.vent
            });

            $('#planner-tabs a', this.$el).click(function(e) {
                e.preventDefault();
                $(this).tab('show');
            });

            $('#planner-tabs a:first', this.$el).tab("show");

            calendarView.render();
            holidaysListView.render();
        }
    });

    return PlannerPage;
});
