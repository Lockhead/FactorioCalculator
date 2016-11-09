define(['knockout', 'i18n'], function(ko, $i) {

    // source : https://github.com/knockout/knockout/issues/416
    ko.observableArray.fn.pushAll = function(valuesToPush) {
        var underlyingArray = this();
        this.valueWillMutate();
        ko.utils.arrayPushAll(underlyingArray, valuesToPush);
        this.valueHasMutated();
        return this; //optional
    }
    ko.bindingHandlers.hidden = {
        update: function(element, valueAccessor) {
            ko.bindingHandlers.visible.update(element, function() {
                return !ko.utils.unwrapObservable(valueAccessor());
            });
        }
    };
});
