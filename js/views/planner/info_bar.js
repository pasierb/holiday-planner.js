define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/calendar/info_bar.html'
], function ($, _, Backbone, infoBarTemplate) {
  var InfoBarView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
      _.bindAll(this, "recalculate");
      options.vent.bind("markDay", this.recalculate);
      options.vent.bind("unmarkDay", this.recalculate);
    },
    el: "#planner-calendar",
    render: function () {
      this.$el.append(infoBarTemplate);
    },
    recalculate: function () {
      var $calendar = $(".calendar-container", this.$el);
      $("#leave-count", this.$el).html($(".leave", $calendar).length);
      $("#period-count", this.$el).html($(".period", $calendar).length);
    }
  });

  return InfoBarView;
});

