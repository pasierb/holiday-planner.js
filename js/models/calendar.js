define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var calendarModel = Backbone.Model.extend({
    print: function () {
      var date = new Date();
      var result = "<table><tbody";

      date.setFullYear(this.get('year'));
      date.setMonth(0);

      while (date.getFullYear() === this.get('year')) {
        result += this.printMonth(date.getMonth());
        date.setMonth(date.getMonth()+1);
      }

      return result;
    },

    printMonth: function (index) {
      var date = new Date();
      var result = "<tr><td>"+index+"</td>";

      date.setFullYear(this.get('year'));
      date.setMonth(index);
      date.setDate(1);

      for (var i=0; i<date.getDay(); i++) {
        result += "<td class=\"fill\"></td>";
      }
      while (date.getMonth() == index) {
        result += this.printDay(date);
        date.setDate(date.getDate()+1);
      }

      return result;
    },

    printDay: function (date) {
      result = "<td><div class=\"day-label\">"+date.getDate()+"</div>";
      if (date.getDay() === 0 || date.getDay() === 6) {
        result += "<div class=\"weekend\"></div></td>";
      } else {
        result += "<a class=\"day\" href=\"#\"></a></td>";
      }
      return result;
    }

  });

  return calendarModel;
});
