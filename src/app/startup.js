define(['knockout', './router', 'jquery', 'bootstrap', 'knockout-projections', 'knockout-extensions', 'data'], function(ko, router) {

    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('nav-bar', {
        require: 'components/nav-bar/nav-bar'
    });

    ko.components.register('home-page', {
        require: 'components/home-page/home'
    });

    ko.components.register('database-page', {
        require: 'components/database-page/database'
    });

    ko.components.register('calculator-page', {
        require: 'components/calculator-page/calculator'
    });

    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('about-page', {
        template: {
            require: 'text!components/about-page/about.html'
        }
    });

    ko.components.register('selection-building', {
        require: 'components/building/selection-building'
    });

    ko.components.register('summary-building', {
        require: 'components/building/summary-building'
    });

    ko.components.register('selection-recipe', {
        require: 'components/recipe/selection-recipe'
    });

    ko.components.register('summary-recipe', {
        require: 'components/recipe/summary-recipe'
    });

    ko.components.register('selection-module', {
        require: 'components/module/selection-module'
    });

    ko.components.register('statistic-view', {
        require: 'components/statistic-view/statistic-view'
    });

    ko.components.register('production-row', {
        require: 'components/production/production-row'
    });

    ko.components.register('production-table', {
        require: 'components/production/production-table'
    });
    
    ko.components.register('item-icon', {
        require: 'components/item-icon/item-icon'
    });
    
    ko.components.register('country-selector', {
        require: 'components/country-selector/country-selector'
    });
    
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({
        route: router.currentRoute
    });
});