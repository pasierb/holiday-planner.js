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
        localstorage: "libs/backbone/localStorage.min",
        bootstrap: "libs/bootstrap/bootstrap",
        i18next: "libs/i18next/i18next.amd-1.6.3.min",
        public_holidays: "libs/public_holidays/public_holidays",
        text: "libs/require/text",
        templates: "../templates",
        models: "models"
    }
});

require([
    'i18next',
    'bootstrap',
    'views/app',
    'events'
], function(i18n, Bootstrap, AppView, vent) {
    var app = new AppView();
    app.render();

    i18n.init({
        lng: 'en',
        fallbackLng: false
    }, function() {
        vent.trigger('i18n:loaded');
    });
});
