define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var calendarModel = Backbone.Model.extend({
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
      result = "<div class=\"day-container\"><div class=\"day-label\">"+date.getDay()+"</div>";
      if (date.getDay() === 0 || date.getDay() === 6) {
        result += "<div class=\"weekend\">"+date.getDate()+"</div></div>";
      } else {
        result += "<a class=\"day\" href=\"#\">"+date.getDate()+"</a></div>";
      }
      return result;
    }

  });

  return calendarModel;
});
