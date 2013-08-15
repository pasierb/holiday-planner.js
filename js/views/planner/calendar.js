define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/planner',
  'views/planner/year_changer',
  'views/planner/day',
  'models/day',
  'collections/leave'
], function ($, _, Backbone, plannerTemplate, YearChangerView, DayView, Day, Leave) {
  var CalendarView = Backbone.View.extend({
    initialize: function (options) {
      this.year = options.year || (new Date()).getFullYear();
      this.localization = "pl";
      _.bindAll(this, "setYear", "markDay", "unmarkDay");
      this.vent = options.vent;
      this.leave = new Leave();
      window.leave = this.leave;
      options.vent.bind("setYear", this.setYear);
      options.vent.bind("markDay", this.markDay);
      options.vent.bind("unmarkDay", this.unmarkDay);
    },
    setYear: function (year) {
      this.year = year;
      this.render();
    },
    el: "#planner-calendar",
    render: function () {
      var that = this;
      this.publicHolidays = this.publicHolidaysMap();
      var date = new Date();
      $result = $("<div></div>", {class: "calendar-container"});

      date.setFullYear(this.year);
      date.setMonth(0);

      while (date.getFullYear() === this.year) {
        $result.append(this.renderMonth(date.getMonth()));
        date.setMonth(date.getMonth()+1);
      }
      this.$el.html($result);

      this.leave.fetch({ success: function (res) {
        _.each(res.models, function (dayModel) {
          var date = new Date(dayModel.get('date'));
          $("[data-date='"+that.dateString(date)+"']", that.$el).trigger("setModel", dayModel);
        });
      }});
    },
    renderMonth: function (index) {
      var date = new Date();
      var $month = $("<div></div>", {class: "month"});
      var $heading = $("<div></div>", {class: "heading"});
      var dayView;

      $heading.html(index);
      $month.append($heading);

      date.setFullYear(this.year);
      date.setMonth(index);
      date.setDate(1);

      for (var i=0; i<date.getDay(); i++) {
        $month.append($("<div></div>", {class: "empty"}));
      }
      while (date.getMonth() == index) {
        dayView = new DayView({
          model: new Day({ date: date }),
          vent: this.vent,
          holiday: this.publicHolidays[this.dateString(date)]
        });
        $month.append(dayView.render().$el);
        date.setDate(date.getDate()+1);
      }

      return $month;
    },
    publicHolidaysMap: function () {
      var map = {};
      PublicHolidays.setFactory(this.localization);
      var publicHolidays = PublicHolidays.all(this.year);
      _.each(publicHolidays, function (holiday) {
        var key = (holiday.date.getMonth()+1)+"-"+holiday.date.getDate()+"-"+holiday.date.getFullYear();
        map[key] = holiday;
      });
      window.ph = map;
      return map;
    },
    markDay: function ($day, day) {
      this.leave.add(day);
      day.save();
      this.markPeriod($day);
    },
    unmarkDay: function ($day, day) {
      day.destroy();
      //this.leave.remove(day);
      this.unmarkPeriod($day);
    },
    dateString: function (date) {
      return (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
    },
    nextDay: function (date) {
      return $("[data-date='"+this.dateString(date.addDays(1))+"']",this.$el);
    },
    prevDay: function (date) {
      return $("[data-date='"+this.dateString(date.addDays(-1))+"']",this.$el);
    },
    markPeriod: function ($day) {
      var nextDate = (new Date($day.data('date')));
      var prevDate = (new Date($day.data('date')));
      var nextDay = this.nextDay(nextDate);
      var prevDay = this.prevDay(prevDate);

      $day.addClass("period");

      while (nextDay.length > 0 && nextDay.attr("class").match(/(weekend|holiday|leave)/)) {
        nextDay.addClass("period");
        nextDay = this.nextDay(nextDate);
      }
      while (prevDay.length > 0 && prevDay.attr("class").match(/(weekend|holiday|leave)/)) {
        prevDay.addClass("period");
        prevDay = this.prevDay(prevDate);
      }
    },
    unmarkPeriod: function ($day) {
      var nextDate = (new Date($day.data('date')));
      var prevDate = (new Date($day.data('date')));
      var $nextDay = this.nextDay(nextDate);
      var $prevDay = this.prevDay(prevDate);

      $day.removeClass("period");

      while ($nextDay.attr("class").match(/(period|leave)/)) {
        $nextDay.removeClass("period");
        if ($nextDay.hasClass("leave")) {
          this.markPeriod($nextDay);
          break;
        }
        $nextDay = this.nextDay(nextDate);
      }
      while ($prevDay.attr("class").match(/(period|leave)/)) {
        $prevDay.removeClass("period");
        if ($prevDay.hasClass("leave")) {
          this.markPeriod($prevDay);
          break;
        }
        $prevDay = this.prevDay(prevDate);
      }
    },
    dateString: function (date) {
      return (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
    },
  });

  return CalendarView;
});
