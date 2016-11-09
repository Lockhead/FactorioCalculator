define(['knockout', 'jquery'], function(ko, $) {

    function Manager(url, map, sortBy, sortAscending) {
        var $self = this;
        $self.available = ko.observable();
        $self.available.subscribe(sorting.bind($self));
        $self.selected = ko.observable();
        $self.map = {};
        $self.sortBy = sortBy || 0;
        $self.sortUp = sortAscending || 1;

        var hasCustomMapping = typeof(map) === "function";
        var mappingFunction = hasCustomMapping ? map : undefined;
        var mapEnabled = !!map;

        $.getJSON(url)
            .done((result) => $self.handleResult.apply($self, [result, mapEnabled, mappingFunction]))
            .fail(() => console.log("error loading: " + url));
    }

    Manager.prototype.get = function(id) {
        return this.map[id];
    }

    Manager.prototype.handleResult = function(result, enableMap, customMap) {
        var collection = result.data;

        if (enableMap) {
            (customMap ? customMap : defaultMapping)(this, collection, defaultMapping);
        }

        this.available(collection);
    }

    function sorting(collection) {
        var $self = this;

        function getValue(item) {
            return typeof(item) === "function" ? item() : item;
        }

        collection.sort(function(a, b) {
            var x = getValue($self.sortBy ? a[$self.sortBy] : a);
            var y = getValue($self.sortBy ? b[$self.sortBy] : b);

            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * ($self.sortUp ? 1 : -1);
        })
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
