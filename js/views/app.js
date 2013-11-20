define([
    'jquery',
    'underscore',
    'backbone',
    'events'
], function($, _, Backbone, vent) {
    var AppView = Backbone.View.extend({
        el: ".page-container",
        render: function() {
            require(['views/planner/page', 'views/settings'], function(PlannerPage, SettingsView) {
                var calendarView = new PlannerPage({
                    vent: vent
                });
                var settingsView = new SettingsView({
                    vent: vent
                });

                calendarView.render();
                settingsView.render();
            });
        }
    });

    return AppView;
});
