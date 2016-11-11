define(['knockout', 'text!./production-row.html', 'app/formulae', 'i18n'], function(ko, template, $f, $i) {

    function ProductionRowViewModel(params) {
        var $self = this;
        $self.recipe = params.recipe;
        $self.building = params.building;
        $self.module = params.module;
        $self.children = params.children;
        $self.header = $i(params.recipe.id);

        $self.options = {
            calculateCycle: params.calculateCycle,
            cycleLength: params.cycleLength,
            calculateBuildings: params.calculateBuildings,
            //  remove dependency from global numberOfBuildings
            numberOfBuildings: ko.observable(typeof(params.numberOfBuildings) === "function" ? params.numberOfBuildings() : params.numberOfBuildings),

            visible: ko.computed(() => {
                return params.visible() && params.visibleParent()
            }),
            visibleParent: params.visibleParent,
            hasInputs: ko.computed(() => Object.keys($self.recipe.input || {}).length > 0),
            hasChildren: ko.computed(() => $self.children().length > 0),

            showChildren: ko.observable(false),
            showEditModule: ko.observable(false),
            showRecipeDetails: ko.observable(false),
        }
        $self.options.showChildrenIcon = ko.computed(showIconFn($self.options.showChildren, 'glyphicon-chevron-', 'down', 'right'));
        $self.options.showRecipeDetailsIcon = ko.computed(showIconFn($self.options.showRecipeDetails, 'glyphicon-eye-', 'close', 'open'));

        $self.stats = {
            input: ko.computed($self.computeInput()),
            output: ko.computed($self.computeOutput()),
            building: ko.computed($self.computeBuilding())
        }

        $self.removeRecipeFromParentClick = params.removeRecipeClick;
        $self.includeChildrenClick = params.includeChildrenClick;
        $self.removeRecipeClick = $self.removeRecipeFn();

        $self.headerSizes = $self.stats.output.peek().length > 1 ? {
            breaker: 'hidden-lg hidden-md',
            recipe: 'col-xs-12 col-sm-6 col-md-5',
            building: 'col-xs-12 col-sm-4 col-md-3',
            output: 'col-xs-12 col-sm-8 col-md-12'
        } : {
            breaker: 'hidden-lg hidden-md',
            recipe: 'col-xs-12 col-sm-6 col-md-3',
            building: 'col-xs-12 col-sm-4 col-md-2',
            output: 'col-xs-12 col-sm-8 col-md-3'
        }
    }

    function toggleOption(observableOption) {
        observableOption(!observableOption.peek());
    }

    function showIconFn(toggleObservable, iconBaseName, displayName, hideName) {
        return () => iconBaseName + (toggleObservable() ? displayName : hideName);
    }

    function _removeRecipeFromChildren(recipeToRemove, context) {
        var recipes = context.children.peek();
        for (var r in recipes) {
            if (recipes[r].recipe.id === recipeToRemove.recipe.id) {
                context.children.remove(recipes[r]);
                break;
            }
        }
    }

    ProductionRowViewModel.prototype.removeRecipeFn = function() {
        var $self = this;
        return recipeViewModel => $self.children().length == 0 || $self.recipe.id == recipeViewModel.recipe.id ?
            $self.removeRecipeFromParentClick(recipeViewModel) :
            _removeRecipeFromChildren(recipeViewModel, $self);
    }

    ProductionRowViewModel.prototype.computeInput = function() {
        var $self = this;
        return () => {
            var result = [];
            var cycleLength = $self.options.cycleLength();
            var numberOfBuildings = $self.options.numberOfBuildings();

            var inputs = $f.GetInputPerSecond($self.recipe, $self.building, $f.GetSpeedMultiplier($self.module));
            var length = Object.keys(inputs).length;
            var size = 'col-lg-' + Math.round(12 / length) + ' col-sm-' + Math.round(24 / length);

            for (var k in inputs) {
                result.push({
                    name: k,
                    size: size,
                    value: (inputs[k] * cycleLength * numberOfBuildings).toFixed(4)
                });
            }

            return result;
        }
    }

    ProductionRowViewModel.prototype.computeOutput = function() {
        var $self = this;
        return () => {
            var result = [];
            var cycleLength = $self.options.cycleLength();
            var numberOfBuildings = $self.options.numberOfBuildings();

            var inputs = $f.GetOutputPerSecond($self.recipe, $self.building, $f.GetSpeedMultiplier($self.module), $f.GetProductionMultiplier($self.module));
            var size = 'col-sm-' + Math.round(12 / Object.keys(inputs).length);
            for (var k in inputs) {
                result.push({
                    name: k,
                    size: size,
                    value: ko.computed({
                        read: function() {
                            return (inputs[this] * cycleLength * numberOfBuildings).toFixed(4);
                        },
                        write: function(desiredValue) {
                            var value = $f.GetNumberOfBuildings(desiredValue, inputs[this], cycleLength);
                            if (value !== numberOfBuildings) {
                                $self.options.numberOfBuildings(value.toFixed(4));
                            }
                        },
                        owner: null
                    }, k)
                });
            }

            return result;
        }
    }

    ProductionRowViewModel.prototype.computeBuilding = function() {
        var $self = this;
        return () => {
            var result = [{
                name: "speed",
                icon: 'glyphicon-forward',
                value: 0
            }, {
                name: "Pollution",
                icon: 'glyphicon-cloud',
                value: 0
            }, {
                name: "Energy",
                icon: 'glyphicon-flash',
                value: 0
            }]

            //  observes
            var building = $self.building();

            if (building) {
                //  multipliers
                var speedMultiplier = $f.GetSpeedMultiplier($self.module);
                var pollutionMultiplier = $f.GetPollutionMultiplier($self.module);
                var energyMultiplier = $f.GetEnergyMultiplier($self.module);

                var cycleLength = $self.options.calculateCycle() ? $self.options.cycleLength() : 1;
                var numberOfBuildings = $self.options.calculateBuildings() ? $self.options.numberOfBuildings() : 1;

                //  totals
                result[0].value = Math.round(building.speed * (1 + speedMultiplier) * 100) / 100;
                result[1].value = Math.round(building.pollution * (1 + pollutionMultiplier) * cycleLength * numberOfBuildings * 100) / 100;
                result[2].value = Math.round(building.energy.max * (1 + energyMultiplier) * cycleLength * numberOfBuildings * 100) / 100;
            }
            result[0].value += 'x';
            result[1].value += ' pu';
            result[2].value += ' kw';
            return result;
        }
    }

    ProductionRowViewModel.prototype.showChildrenClick = function() {
        toggleOption(this.options.showChildren);
    }

    ProductionRowViewModel.prototype.showRecipeDetailsClick = function() {
        toggleOption(this.options.showRecipeDetails);
    }

    ProductionRowViewModel.prototype.editModules = function() {
        var $self = this;
        $self.options.showEditModule(!$self.options.showEditModule.peek());
    }

    return {
        viewModel: ProductionRowViewModel,
        template: template
    };
});
