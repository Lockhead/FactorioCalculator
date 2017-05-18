define(['knockout'], function(ko) {

    // source : https://github.com/knockout/knockout/issues/416
    ko.observableArray.fn.pushAll = function(valuesToPush) {
        var underlyingArray = this();
        this.valueWillMutate();
        ko.utils.arrayPushAll(underlyingArray, valuesToPush);
        this.valueHasMutated();
        return this; //optional
    };

    ko.bindingHandlers.hidden = {
        update: function(element, valueAccessor) {
            ko.bindingHandlers.visible.update(element, function() {
                return !ko.utils.unwrapObservable(valueAccessor());
            });
        }
    };

    // source : http://www.knockmeout.net/2011/04/pausing-notifications-in-knockoutjs.html
    ko.pauseableComputed = function(evaluatorFunction, evaluatorFunctionTarget) {
        var _cachedValue = "";
        var _isPaused = ko.observable(false);
        
        var result = ko.computed(function() {
            if (!_isPaused()) {
                return evaluatorFunction.call(evaluatorFunctionTarget);
            }
            return _cachedValue;
        }, evaluatorFunctionTarget);

        result.pause = function() {
            _cachedValue = this();
            _isPaused(true);
        }.bind(result);

        result.resume = function() {
            _cachedValue = "";
            _isPaused(false);
        }

        return result;
    };


    return {
        loaded: true
    }
});
