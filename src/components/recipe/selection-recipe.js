define(['knockout', 'text!./selection-recipe.html', 'data', 'app/formulae'], function(ko, template, dataLoader, $f) {

    var MAX_SIZE = 12;
    
    function SelectionRecipe(params) {
        var $self = this;
        $self.selectedRecipe = params.selectedRecipe;
        $self.selectedModules = params.selectedModules;
        $self.availableRecipes = dataLoader.recipes.available;

        $self.inputSize = ko.computed(function() {
            var selectedRecipe = $self.selectedRecipe();
            var size = 0;
            if (!!selectedRecipe) {
                size = Math.floor(MAX_SIZE / Object.keys(selectedRecipe.input).length);
            }
            return "col-sm-" + size;
        });
        $self.outputSize = ko.computed(function() {
            var selectedRecipe = $self.selectedRecipe();
            var size = 0;
            if (!!selectedRecipe) {
                size = Math.floor(MAX_SIZE / Object.keys(selectedRecipe.output).length);
            }
            return "col-sm-" + size;
        });
        $self.outputText = ko.computed(function() {

            var text = '';

            var multiplier = Math.round($f.GetProductionMultiplier(this.selectedModules) * 100);
            if (multiplier != 0) {
                text += " ( " + (multiplier > 0 ? '+' : '') + multiplier + "% )";
            }

            return text;

        }, $self);
    }

    return {
        viewModel: SelectionRecipe,
        template: template
    };
});
