define(['knockout', 'jquery', 'app/LoadManager'], function(ko, $, Manager) {

    var BASE_URL = '../data/{0}.json';

    function handleRecipeResult(manager, recipes, baseMapping) {
        baseMapping(manager, recipes);

        manager.mapOutput = {};
        for (var r = 0, lenR = recipes.length; r < lenR; r++) {

            var recipeOutput = Object.keys(recipes[r].output);
            for (var o = 0, lenO = recipeOutput.length; o < lenO; o++) {
                var output = recipeOutput[o];
                if (!manager.mapOutput[output]) {
                    manager.mapOutput[output] = [];
                }
                manager.mapOutput[output].push(recipes[r]);
            }
        }
    }

    var Locales = new Manager(BASE_URL.replace('{0}', 'locales'), true);
    Locales.selected('en');

    function getRecipeUrl() {
        var version = getQueryVariable('v');
        var url = 'recipes' + (version ? '' : '.v15');

        return BASE_URL.replace('{0}', url);
    }

    var Recipes = new Manager(getRecipeUrl(), handleRecipeResult, 'i18n');
    Recipes.getByOutput = function(id) {
        return this.mapOutput[id]
    }

    var Buildings = new Manager(BASE_URL.replace('{0}', 'buildings'), true);

    var Config = new Manager(BASE_URL.replace('{0}', 'configuration'), false);

    function ModuleLevels(watch) {
        var $self = this;
        $self.level1 = watch ? ko.observable(0) : 0;
        $self.level2 = watch ? ko.observable(0) : 0;
        $self.level3 = watch ? ko.observable(0) : 0;

        $self.reset = () => {
            if (typeof($self.level1) === 'function') {
                $self.level1(0);
            }
            else {
                $self.level1 = 0;
            }

            if (typeof($self.level2) === 'function') {
                $self.level2(0);
            }
            else {
                $self.level2 = 0;
            }

            if (typeof($self.level3) === 'function') {
                $self.level3(0);
            }
            else {
                $self.level3 = 0;
            }
        }
    }
    
    ModuleLevels.prototype.pauseUpdates = () => {
        this.level1.pause();
        this.level2.pause();
        this.level3.pause();
    }
    ModuleLevels.prototype.resumeUpdates = () => {
        this.level1.resume();
        this.level2.resume();
        this.level3.resume();
    }

    function Modules(watch) {
        var $self = this;
        $self.speed = new ModuleLevels(watch);
        $self.production = new ModuleLevels(watch);
        $self.efficiency = new ModuleLevels(watch);

        $self.clone = (keepDependency, watch) => {
            var newModules = new Modules(typeof(watch) === typeof(undefined) ? true : watch);
            if (keepDependency) {
                newModules.speed = $self.speed;
                newModules.production = $self.production;
                newModules.efficiency = $self.efficiency;
            }
            return newModules;
        };

        $self.reset = () => {
            //this.speed.pauseUpdates();
            //this.production.pauseUpdates();
            //this.efficiency.pauseUpdates();

            $self.speed.reset();
            $self.production.reset();
            $self.efficiency.reset();

            //this.speed.resumeUpdates();
            //this.production.resumeUpdates();
            //this.efficiency.resumeUpdates();
        };
    }

    return {
        recipes: Recipes,
        buildings: Buildings,
        locales: Locales,
        config: Config,
        modules: new Modules(true)
    }
})
