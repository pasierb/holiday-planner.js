define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/planner',
  'views/planner/year_changer',
  'models/day',
  'models/calendar',
  'collections/leave'
], function ($, _, Backbone, plannerTemplate, YearChangerView, Day, Calendar, Leave) {
  var CalendarView = Backbone.View.extend({
    initialize: function (options) {
      var year = (new Date()).getFullYear();
      _.bindAll(this, "setYear");
      options.vent.bind("setYear", this.setYear);
      this.leave = new Leave();
      this.calendar = new Calendar({ year: year });
      var yearChangerView = new YearChangerView({ vent: options.vent, year: year });
    },
    el: ".page",
    render: function () {
      this.$el.html(plannerTemplate);
      $('#planner-tabs a', this.$el).click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        return false;
      });

      $('#planner-tabs a:first', this.$el).tab("show");
      $('#planner-calendar', this.$el).html((this.calendar.print()));
    },
    setYear: function (year) {
      this.calendar = new Calendar({ year: year });
      this.render();
    },
    events: {
      "click .day": "dayClickHandler"
    },
    dayClickHandler: function (e) {
      e.preventDefault();
      $target = $(e.target);
      if ($target.hasClass('holiday')) return;
      this.toggleDay($target.hasClass('leave'));
    },
    toggleDay: function (toggle) {
      if (toggle) {
        this.unmarkDay($target);
      } else {
        this.markDay($target);
      }
    },
    markDay: function ($day) {
      var date = new Date($day.data('date'));
      var day = new Day({ date: date });
      $day.data('hpDay', day);
      this.leave.add(day);
      $day.addClass("leave");
      this.markPeriod($day);
    },
    unmarkDay: function ($day) {
      var day = $day.data('hpDay');
      this.leave.remove(day);
      $day.data('hpDay', null);
      $day.removeClass("leave");
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

      while (nextDay.attr("class").match(/(weekend|holiday|leave)/)) {
        nextDay.addClass("period");
        nextDay = this.nextDay(nextDate);
      }
      while (prevDay.attr("class").match(/(weekend|holiday|leave)/)) {
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
    }
  });

  return CalendarView;
});
