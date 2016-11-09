define(['knockout', 'text!./selection-building.html', 'data'], function(ko, templateMarkup, dataLoader) {

    function SelectionBuilding(params) {
        var $self = this;

        $self.numberOfBuildings = params.numberOfBuildings;
        $self.selectedBuilding = params.selectedBuilding;
        $self.selectedModules = params.selectedModules;
        $self.allBuildings = ko.observable();

        $self.availableBuildings = ko.computed(function() {
            var options = [];
            var selectedRecipe = params.selectedRecipe();

            if (selectedRecipe) {

                ko.utils.arrayForEach(selectedRecipe.building, function(recipeBuilding) {
                    var building = dataLoader.buildings.get(recipeBuilding);
                    options.push(building);
                });
            }

            return options;
        });
    }

    return {
        viewModel: SelectionBuilding,
        template: templateMarkup
    };
});
