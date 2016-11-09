define(['knockout', 'jquery'], function(ko, $) {

    function Manager(url, map, sort) {
        var $self = this;
        $self.available = ko.observable();
        $self.selected = ko.observable();
        $self.map = {};
        $self.sort = sort || 0; // 1 - ascending ; -1 - descending ; 0 - none

        var hasCustomMapping = typeof(map) === "function";
        var mappingFunction = hasCustomMapping ? map : undefined;
        var mapEnabled = !!map;

        $.getJSON(url)
            .done((result) => $self.handleResult.apply($self, [result, mapEnabled, mappingFunction, sort]))
            .fail(() => console.log("error loading: " + url));
    }

    Manager.prototype.get = function(id) {
        return this.map[id];
    }

    Manager.prototype.handleResult = function(result, enableMap, customMap, sortting) {
        var collection = result.data;
        // odd behavior, the sortting does not sort O.o'
        // switch (sortting) {
        //     case 1:
        //         {
        //             collection = collection.sort((a, b) => a.id > b.id);
        //             break;
        //         }
        //     case 2:
        //         {
        //             collection = collection.sort((a, b) => a.id < b.id);
        //             break;
        //         }
        // }

        if (enableMap) {
            (customMap ? customMap : defaultMapping)(this, collection, defaultMapping);
        }

        this.available(collection);
    }

    function defaultMapping(context, collection) {
        for (var i = 0, len = collection.length; i < len; i++) {
            var item = collection[i];
            item.i18n = ko.observable(item.id);
            context.map[item.id] = item;
        }
    }

    return Manager;

});