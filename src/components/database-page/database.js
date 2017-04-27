define(['knockout', 'text!./database.html', 'jquery'], function(ko, template, $) {

    function DatabaseViewModel(route) {
        this.file_content = ko.observable();
        this.collection = ko.observable();
    }

    function luaToJson(lua) {
        var diff;
        do { // replace curlies around arrays with square brackets
            diff = lua.length;
            lua = lua.replace(/\{(((\n\t*)\t)\S.*(\2.*)*)\,\s--\s\[\d+\]\3\}/g, '[$1$3]');
            diff = diff - lua.length;
        } while (diff > 0);
        //debugger;
        lua = lua.replace(/\s--\s\[\d+\](\n)/g, '$1'); // remove comment
        lua = lua.replace(/[\s\t\r\n]/g, ''); // remove tabs & returns
        lua = lua.replace(/\,(\})/g, '$1'); // remove trailing comma
        lua = lua.replace(/,"requester_paste_multiplier":\d*/g, ''); 
        lua = lua.replace(/([\,\{\[])(\w*)=/g, '$1"$2":'); // change equal to semicolon and add quotes to properties
        lua = lua.replace(/^data:extend\({/, '[');//  remove function notation
        lua = lua.replace(/}\)$/, ']') //  remove function notation
        lua = lua.replace(/{{/g,'[{').replace(/(\d)}}/g, '$1}]'); //  change dictionaries to arrays
        lua = lua.replace(/"\,(\d+)/gi, "\":$1");
        ;
        console.log(lua);
        return JSON.parse(lua);
    }
    
    var building_map = {
        'crafting': ['assembling-machine-3', 'assembling-machine-2', 'assembling-machine-1'],
        'chemistry': ['chemical-plant'],
        'oil-processing': ['oil-refinery'],
        'smelting': ['electric-furnace', 'steel-furnace', 'stone-furnace']
    }
    DatabaseViewModel.prototype.parseData = function() {
        var text = luaToJson(this.file_content());
        var data = eval(text);

        var result = [];
        //debugger;
        for (var i = 0, len = data.length; i < len; i++) {
            var dataitem = data[i];
            var dificultInfo = dataitem.normal || dataitem;

            result.push({
                id: dataitem.name,
                time: dificultInfo.energy_required | 0.5,
                building: building_map[dataitem.category] || building_map["crafting"],
                input: parseIngredients(dificultInfo.ingredients),
                output: parseIngredients(dificultInfo.result || dificultInfo.results, dificultInfo.result_count)
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
