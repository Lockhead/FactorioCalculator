// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    urlArgs: "bust=" + (+new Date),
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "text":                 "bower_modules/requirejs-text/text",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "knockout":             "bower_modules/knockout/dist/knockout.debug",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "knockout-extensions":  "app/knockout-extensions",
        "data":                 "app/dataLoader",
        "i18n":                 "app/i18n"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
