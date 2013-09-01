define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/calendar/holidays_list'
], function ($, _, Backbone, listTemplate) {
  var HolidaysListView = Backbone.View.extend({
    initialize: function (options) {
      this.year = options.year;

      _.bindAll(this, "setYear");
      options.vent.bind("setYear", this.setYear);
    },
    el: "#planner-list",
    setYear: function (year) {
      this.year = year;
      this.render();
    },
    render: function () {
      this.$el.html(listTemplate);

      var that = this;
      var holidays = PublicHolidays.all(this.year);
      var $table = $("table tbody", this.$el);

      _.each(holidays, function (holiday, index) {
        var $tr = $("<tr></tr>");
        var $td0 = $("<td></td>");
        var $td1 = $("<td></td>");
        var $td2 = $("<td></td>");

        $td0.html(index+1);
        $td1.html(holiday.date.toString("dd-MM-yyyy"));
        $td2.html(holiday.getName());

        $tr.append($td0);
        $tr.append($td1);
        $tr.append($td2);

        $table.append($tr);
      });
    }
  });

  return HolidaysListView;
});
