define(['knockout', 'text!./database.html', 'jquery'], function(ko, template, $) {

    function DatabaseViewModel(route) {
        this.file_content = ko.observable();
        this.collection = ko.observable();
    }

    var building_map = {
        'crafting': ['assembling-machine-3', 'assembling-machine-2', 'assembling-machine-1'],
        'chemistry': ['chemical-plant'],
        'oil-processing': ['oil-refinery'],
        'smelting': ['electric-furnace', 'steel-furnace', 'stone-furnace']
    }
    DatabaseViewModel.prototype.parseData = function() {
        var text = this.file_content();
        text = text.replace(/\s/gi, '').replace('data:extend', '').replace(/{{/g, "[{").replace(/},?}/g, "}]").replace(/=/g, ':').replace(/"\,(\d+)/gi, "\":$1");
        var data = eval(text);

        var result = [];
        //debugger;
        for (var i = 0, len = data.length; i < len; i++) {
            var dataitem = data[i];

            result.push({
                id: dataitem.name,
                time: dataitem.energy_required || 1,
                building: building_map[dataitem.category] || building_map["crafting"],
                input: parseIngredients(dataitem.ingredients),
                output: parseIngredients(dataitem.result || dataitem.results, dataitem.result_count)
            });
        }

        //debugger;
        var existing = JSON.parse(this.collection() || "[]");
        Array.prototype.push.apply(existing, result);
        this.collection(JSON.stringify(existing));
    }

    function parseIngredients(ingredients, item_count) {
        var result = {};
        var index = 0;
        var item = {};
        var length = 0;

        //  static single ingredient with amount in sibling property (sent through parameter)
        if (typeof(ingredients) === "string") {
            result[ingredients] = item_count || 1;
        }
        else if (ingredients.length > 0) {
            for (index = 0, length = ingredients.length; index < length; index++) {
                item = ingredients[index];
                //  name/value objects inside an array
                if (typeof(item.name) !== "undefined") {
                    result[item.name] = item.amount || 1;
                }
                else if (typeof(item) === "object") {
                    item = Object.keys(ingredients[index]);

                    for (var nestIndex = 0, nestLength = item.length; nestIndex < nestLength; nestIndex++) {
                        var nestedItem = ingredients[index][item[nestIndex]];
                        result[item[nestIndex]] = nestedItem || 1;
                    }
                }
                else {
                    $.extend(result, item);
                }
            }
        }
        return result;
    }


    return {
        viewModel: DatabaseViewModel,
        template: template
    };


});