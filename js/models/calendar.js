define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var calendarModel = Backbone.Model.extend({
    defaults: {
      localization: "pl",
      year: (new Date()).getFullYear()
    },
    initialize: function () {
      this.set('publicHolidays', this.publicHolidaysMap())
    },
    publicHolidaysMap: function () {
      var map = {};
      PublicHolidays.setFactory(this.get('localization'));
      var publicHolidays = PublicHolidays.all(this.get('year'));
      _.each(publicHolidays, function (holiday) {
        var key = (holiday.date.getMonth()+1)+"-"+holiday.date.getDate()+"-"+holiday.date.getFullYear();
        map[key] = holiday;
      });
      window.ph = map;
      return map;
    },
    print: function () {
      var date = new Date();
      var result = "<div class=\"calendar-container\">";

      date.setFullYear(this.get('year'));
      date.setMonth(0);

      while (date.getFullYear() === this.get('year')) {
        result += this.printMonth(date.getMonth());
        date.setMonth(date.getMonth()+1);
      }
      result += "</div>";

      return result;
    },
    printMonth: function (index) {
      var date = new Date();
      var result = "<div class=\"month\"><div class=\"heading\">"+index+"</div>";

      date.setFullYear(this.get('year'));
      date.setMonth(index);
      date.setDate(1);

      for (var i=0; i<date.getDay(); i++) {
        result += "<div class=\"empty\"></div>";
      }
      while (date.getMonth() == index) {
        result += this.printDay(date);
        date.setDate(date.getDate()+1);
      }
      result += "</div>";

      return result;
    },
    printDay: function (date) {
      var dateString = (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
      var holiday = this.get("publicHolidays")[dateString];
      var cssClass = (holiday ? " holiday" : "");
      var title = (holiday ? holiday.name : "");
      var result = "<div class=\"day-container\"><div class=\"day-label\">"+date.getDay()+"</div>";

      if (date.getDay() === 0 || date.getDay() === 6) {
        result += "<div class=\"weekend"+cssClass+"\" title=\""+title+"\" data-date=\""+dateString+"\">"+date.getDate()+"</div></div>";
      } else {
        result += "<a class=\"day"+cssClass+"\" title=\""+title+"\" data-date=\""+dateString+"\" href=\"#\">"+date.getDate()+"</a></div>";
      }

      return result;
    }
  });

  return calendarModel;
});
