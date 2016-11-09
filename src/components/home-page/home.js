define(['knockout', 'text!./home.html'], function(ko, template) {

    function HomeViewModel(route) {
        this.message = ko.observable('Welcome to Factorio Calculator!');
    }

    HomeViewModel.prototype.doSomething = function() {
        this.message('You invoked doSomething() on the viewmodel.');
    }


    return {
        viewModel: HomeViewModel,
        template: template
    };
});