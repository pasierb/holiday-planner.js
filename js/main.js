require.config({
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    }
  },
  paths: {
    jquery: "libs/jquery/jquery-2.0.3",
    underscore: "libs/underscore/underscore",
    backbone: "libs/backbone/backbone",
    bootstrap: "libs/bootstrap/bootstrap",
    text: "libs/require/text",
    templates: "../templates",
    models: "models"
  }
});

require(['bootstrap','views/app'], function (Bootstrap, AppView) {
  var app = new AppView();
  app.render();
});
