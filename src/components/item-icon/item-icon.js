define(['knockout', 'text!./item-icon.html', 'i18n'], function(ko, template, $i) {

    function ItemIconViewModel(params) {
        var $self = this;
        var id = typeof(params.id) === "function" ? params.id() : params.id;
        var name = $i(id);

        $self.hasValue = !!params.value;
        $self.displayName = params.displayName ? name : "";

        $self.value = params.value;
        $self.readonly = params.readonly;
        $self.id = id;
        $self.type = params.type || 'text';
        $self.tooltip = name;

        if ($self.displayName && !$self.hasValue) {
            $self.value = name;
            $self.hasValue = 1;
            $self.readonly = 1;
            $self.displayName = 0;
        }
    }

    ItemIconViewModel.prototype.getIconName = function() {
        return 'factorio-' + this.id;
    }

    return {
        viewModel: ItemIconViewModel,
        template: template
    };
});