define([
  'jquery',
  'underscore',
  'backbone',
  'models/calendar'
], function ($, _, Backbone, Calendar) {
  var AppView = Backbone.View.extend({
    el: ".container",
    render: function () {
      var calendar = new Calendar({ year: 2013 });
      this.$el.html(calendar.print());
    }
  });

  return AppView;
});
