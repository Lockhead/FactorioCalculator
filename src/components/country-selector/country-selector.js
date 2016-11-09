define(['knockout', 'text!./country-selector.html', 'jquery', 'data'], function(ko, template, $, $d) {

    function CountrySelectorViewModel(params) {
        var $self = this;

        $self.selectedCountry = $d.locales.selected;
        $self.availableCountries = $d.locales.available;
        $self.afterRender = function(options, item){
            var icon = $('<span>').addClass('flag').addClass('flag-'+item.flag).attr('alt', item.display);
            var opt = $('<option>').attr('value', item.code).append(icon);
            //options.outerHTML = opt[0].outerHTML;
            ko.applyBindingsToNode(options, { html: icon[0].outerHTML}, item);
        }
    }

    return {
        viewModel: CountrySelectorViewModel,
        template: template
    };
});