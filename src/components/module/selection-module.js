define(['knockout', 'text!./selection-module.html'], function(ko, templateMarkup) {

    function SelectionModule(params) {
        var $self = this;
        $self.selectedModules = params.selectedModules;
        
    }

    return {
        viewModel: SelectionModule,
        template: templateMarkup
    };
});
