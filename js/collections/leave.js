define([
  'jquery',
  'underscore',
  'backbone',
  'models/day'
], function ($, _, Backbone, Day) {
  var leaveModel = Backbone.Collection.extend({
    model: Day
  });

  return leaveModel;
});

