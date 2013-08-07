require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(),
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
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  },
  paths: {
    jquery: "libs/jquery/jquery-2.0.3",
    underscore: "libs/underscore/underscore",
    backbone: "libs/backbone/backbone",
    bootstrap: "libs/bootstrap/bootstrap",
    jasmine: '../tests/lib/jasmine/jasmine',
    'jasmine-html': '../tests/lib/jasmine/jasmine-html',
    text: "libs/require/text",
    templates: "../templates",
    spec: '../tests/spec'
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('spec/CalendarSpec');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});
