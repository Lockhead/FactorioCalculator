define(['knockout', 'text!./item-icon.html', 'i18n'], function(ko, template, $i) {

    function ItemIconViewModel(params) {
        var $self = this;

        var id = typeof(params.id) === "function" ? params.id() : params.id;
        $self.id = ko.observable(id);

        var name = ko.pureComputed(() => $i($self.id()));


        $self.hasValue = !!params.value;
        $self.displayName = ko.pureComputed(() => params.displayName ? name() : "");

        $self.value = params.value;
        $self.readonly = params.readonly;
        $self.type = params.type || 'text';
        $self.tooltip = name;

        $self.hasOptions = !!params.valueOptions && params.valueOptions.length > 1;
        $self.optionsAvailable = [];
        if ($self.hasOptions) {
            for (var i = 0; i < params.valueOptions.length; i++) {
                var opt = params.valueOptions[i];
                $self.optionsAvailable.push({
                    id: opt,
                    name: $i(opt)
                });
            }
        }

        if ($self.displayName() && !$self.hasValue) {
            $self.value = name;
            $self.hasValue = 1;
            $self.readonly = 1;
            $self.displayName = 0;
        }
    }

    ItemIconViewModel.prototype.getIconName = function() {
        return 'factorio-' + this.id();
    }
    ItemIconViewModel.prototype.setOption = function(selectedBuilding) {
        this.id(selectedBuilding.id);
    }

    return {
        viewModel: ItemIconViewModel,
        template: template
    };
});
