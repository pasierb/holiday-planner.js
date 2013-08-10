define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var YearChanger = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
      this.year = options.year;
    },
    el: "#year-holder",
    events: {
      "click .year-change-minus": "reduceYear",
      "click .year-change-plus": "increaseYear"
    },
    reduceYear: function (e) {
      this.year -= 1;
      this.setYear(e);
    },
    increaseYear: function (e) {
      this.year += 1;
      this.setYear(e);
    },
    setYear: function (e) {
      e.preventDefault();
      this.vent.trigger("setYear", this.year);
      $(".year", this.$el).html(this.year);
    }
  });

  return YearChanger;
});
