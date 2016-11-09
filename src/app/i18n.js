define(['knockout', 'jquery', 'data'], function(ko, $, $d) {

    var availableLanguages = {};
    var selectedLanguage = ko.observable();
    var currentComputedRecipes;

    $d.recipes.available.subscribe(function(collection) {
        if (currentComputedRecipes) {
            currentComputedRecipes.dispose();
        }

        currentComputedRecipes = ko.computed(function() {
            var language = selectedLanguage();
            if (language) {
                for (var i = 0, len = collection.length; i < len; i++) {
                    var id = collection[i].id;
                    collection[i].i18n(language[id] || id);
                }
            }
        });
    });
    var currentComputedBuildings;

    $d.buildings.available.subscribe(function(collection) {
        if (currentComputedBuildings) {
            currentComputedBuildings.dispose();
        }

        currentComputedBuildings = ko.computed(function() {
            var language = selectedLanguage();
            if (language) {
                for (var i = 0, len = collection.length; i < len; i++) {
                    var id = collection[i].id;
                    collection[i].i18n(language[id] || id);
                }
            }
        });
    });

    var requests = {
        game: undefined,
        calc: undefined
    }
    var parse = {
        game: parseGameData,
        calc: undefined
    }

    ko.computed(function() {
        var language = $d.locales.selected();
        if (isLanguageAvailable(language)) {
            selectedLanguage(availableLanguages[language]);
        }
        else {
            availableLanguages[language] = {
                __requestFinished: 0
            };
            loadData("game", language, "base.cfg");
            //loadData("calc", language, "calc.txt");
        }
    });

    function isLanguageAvailable(language) {
        return !!availableLanguages[language] && availableLanguages[language].__requestFinished == 1;
    }

    function loadData(requestName, language, fileWithExtension) {

        if (!!requests[requestName]) {
            //  if another request is made shortly after the initial one, abort it;
            requests[requestName].abort();
        }

        requests[requestName] = $.get('../data/raw/locale/' + language + '/' + fileWithExtension)
            .done((result) => {
                requests[requestName] = undefined;
                parse[requestName](result, language);
                availableLanguages[language].__requestFinished++;

                if (isLanguageAvailable(language)) {
                    selectedLanguage(availableLanguages[language]);
                }
            })
            .fail(() => console.log("error loading language: " + language + '/' + fileWithExtension));
    }

    var DESCRIPTION_TITLE_REGEX = /^\[.+\-description\]$/g;
    var BLOCK_TITLE_REGEX = /^\[.+\]$/g;

    function parseGameData(rawGameData, language) {

        var keyValueList = rawGameData.split(/\n/g);
        var foundDescriptionBlock = false;

        for (var i = 0, len = keyValueList.length; i < len; i++) {
            var keyValuePair = keyValueList[i].split('=');


            if (keyValuePair.length === 1) {
                foundDescriptionBlock = DESCRIPTION_TITLE_REGEX.test(keyValuePair[0]);
                continue;
            }
            else if (keyValuePair.length === 2 && !foundDescriptionBlock) {
                availableLanguages[language][keyValuePair[0]] = keyValuePair[1];
            }
        }
    }

    return function(text_id) {
        var languageText = selectedLanguage();
        return !!languageText ? languageText[text_id] : text_id;
    };
})