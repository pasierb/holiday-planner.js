define([
  'jquery',
  'underscore',
  'backbone',
  'localstorage',
  'models/day'
], function ($, _, Backbone, LocalStorage, Day) {
  var leaveModel = Backbone.Collection.extend({
    model: Day,
    localStorage: new Backbone.LocalStorage("hp-leave")
  });

  return leaveModel;
});

