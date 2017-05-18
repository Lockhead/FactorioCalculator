define(['knockout', 'text!./selection-module.html'], function(ko, templateMarkup) {

    function SelectionModule(params) {
        var $self = this;
        $self.selectedModules = params.selectedModules;
        $self.enableProductivity = ko.computed(() => {
            var recipe = params.selectedRecipe();
            var enabled = false;
            if (recipe != null) {
                enabled = !!recipe.accept_productivity;
            }
            return enabled;
        });

    }

    return {
        viewModel: SelectionModule,
        template: templateMarkup
    };
});
