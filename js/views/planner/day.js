define([
    'jquery',
    'underscore',
    'backbone',
    'i18next',
    'models/day'
], function($, _, Backbone, i18n, Day) {
    var DayView = Backbone.View.extend({
        className: "day-container",
        initialize: function(options) {
            this.holiday = options.holiday;
            this.vent = options.vent;

            _.bindAll(this, "render");

            this.vent.bind('i18n:loaded', this.render);
        },
        events: {
            "click .day": "dayClickHandler",
            "setModel .day": "setModel"
        },
        dayClickHandler: function(e) {
            e.preventDefault();
            $target = $(e.target);
            this.toggleDay($target, $target.hasClass('leave'));
        },
        toggleDay: function($target, toggle) {
            if ($target.hasClass('holiday')) return;
            if (toggle) {
                this.unmarkDay($target);
            } else {
                this.markDay($target);
            }
        },
        setModel: function(e, day) {
            $day = $(e.target);
            $day.data('hpDay', day);
            $day.addClass("leave");
            this.vent.trigger("markDay", $day, day);
        },
        markDay: function($day) {
            var date = new Date($day.data('date'));
            var day = new Day({
                date: date
            });
            $day.data('hpDay', day);
            $day.addClass("leave");
            this.vent.trigger("markDay", $day, day);
        },
        unmarkDay: function($day) {
            var day = $day.data('hpDay');
            $day.data('hpDay', null);
            $day.removeClass("leave");
            this.vent.trigger("unmarkDay", $day, day);
        },
        render: function() {
            var date = this.model.get('date');
            var tagName = (date.getDay() === 0 || date.getDay() === 6) ? "div" : "a";
            var title;
            var cssClasses = [(tagName === "div" ? "weekend" : "day")];
            var i18nLabelKey = "date.weekday." + date.getDay();

            if (this.holiday) {
                cssClasses.push("holiday");
                title = this.holiday.name;
            }

            this.$el.append($("<div></div>", {
                class: "day-label",
                html: i18n.exists(i18nLabelKey) ? i18n.t(i18nLabelKey) : date.getDay()
            }));
            this.$el.append($("<" + tagName + "></" + tagName + ">", {
                class: cssClasses.join(" "),
                html: date.getDate(),
                title: title,
                'data-date': this.dateString(date)
            }));
            return this;
        },
        dateString: function(date) {
            return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
        },
    });

    return DayView;
});
