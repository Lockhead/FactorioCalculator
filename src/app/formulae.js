define([], function() {

    function getValue(load, property) {
        return (load ? (typeof(property) === "function" ? property() : property) : 0) | 0;
    }

    function extractModuleCount(selectedModules, loadProd, loadSpeed, loadEff) {
        return {
            speed1: getValue(loadSpeed, selectedModules.speed.level1),
            speed2: getValue(loadSpeed, selectedModules.speed.level2),
            speed3: getValue(loadSpeed, selectedModules.speed.level3),
            prod1: getValue(loadProd, selectedModules.production.level1),
            prod2: getValue(loadProd, selectedModules.production.level2),
            prod3: getValue(loadProd, selectedModules.production.level3),
            eff1: getValue(loadEff, selectedModules.efficiency.level1),
            eff2: getValue(loadEff, selectedModules.efficiency.level2),
            eff3: getValue(loadEff, selectedModules.efficiency.level3),
        }
    }

    function calculateTotal(building, multiplier, property) {
        var total = 0;
        var propertyValue = 0;
        if (building) {
            propertyValue = (typeof(property) === 'function' ? property(building) : building[property]);
            total = propertyValue * multiplier;
        }
        return total;
    }

    function _getNumberOfEffects(selectedModules) {
        var mods = extractModuleCount(selectedModules, 1, 1, 1);
        return (
            mods.speed1 + mods.speed2 + mods.speed3 +
            mods.prod1 + mods.prod2 + mods.prod3 +
            mods.eff1 + mods.eff2 + mods.eff3
        );
    }

    function _validateMinMaxMultiplier(multiplier, min, max) {
        if (min !== undefined) {
            multiplier = multiplier < min ? min : multiplier;
        }
        if (max !== undefined) {
            multiplier = multiplier > max ? max : multiplier;
        }
        return multiplier;
    }

    function _getProductionMultiplier(selectedModules) {
        var mods = extractModuleCount(selectedModules, 1);
        return (
            mods.prod1 * 0.04 + mods.prod2 * 0.06 + mods.prod3 * 0.1
        );
    }

    function _getPollutionMultiplier(selectedModules) {
        var mods = extractModuleCount(selectedModules, 1, 1);
        return _validateMinMaxMultiplier(
            mods.prod1 * 0.3 + mods.prod2 * 0.4 + mods.prod3 * 0.5
        );
    }

    function _getSpeedMultiplier(selectedModules) {
        var mods = extractModuleCount(selectedModules, 1, 1);
        return _validateMinMaxMultiplier(
            mods.speed1 * 0.2 + mods.speed2 * 0.3 + mods.speed3 * 0.5 +
            (mods.prod1 + mods.prod2 + mods.prod3) * -0.15
        );
    }

    function _getEnergyMultiplier(selectedModules) {
        var mods = extractModuleCount(selectedModules, 1, 1, 1);
        return _validateMinMaxMultiplier(
            mods.speed1 * 0.5 + mods.speed2 * 0.6 + mods.speed3 * 0.7 +
            mods.prod1 * 0.4 + mods.prod2 * 0.6 + mods.prod3 * 0.8 +
            mods.eff1 * -0.3 + mods.eff2 * -0.4 + mods.eff3 * -0.5, -0.8);
    }

    function _getProductionBuilding(selectedBuilding, multiplier) {
        return calculateTotal(selectedBuilding(), multiplier, 'production');
    }

    function _getEnergyBuilding(selectedBuilding, multiplier) {
        return calculateTotal(selectedBuilding(), multiplier, function(b) {
            return b.energy.max;
        });
    }

    function _getSpeedBuilding(selectedBuilding, multiplier) {
        return calculateTotal(selectedBuilding(), multiplier, 'speed');
    }

    function validateRecipe(selectedRecipe, selectedBuilding, loop, action) {
        var recipe = typeof(selectedRecipe) === "function" ? selectedRecipe() : selectedRecipe;
        var building = typeof(selectedBuilding) === "function" ? selectedBuilding() : selectedBuilding;
        var result = {};
        if (recipe) {
            var time = recipe.time;
            for (var i in recipe[loop]) {
                result[i] = action(building, recipe[loop][i], time);
            }
        }
        return result;
    }

    function _getPerSecondInputRecipes(selectedRecipe, selectedBuilding, modifiedSpeed) {
        return validateRecipe(selectedRecipe, selectedBuilding, 'input', function(building, value, time) {
            var speed = (building ? building.speed : 1) * (1 + modifiedSpeed);
            return value / (time / speed);
        });
    }

    function _getPerSecondOutputRecipes(selectedRecipe, selectedBuilding, modifiedSpeed, modifiedProduction) {
        return validateRecipe(selectedRecipe, selectedBuilding, 'output', function(building, value, time) {
            var speed = (building ? building.speed : 1) * (1 + modifiedSpeed);
            var production = (building ? building.production : 1) * (1 + modifiedProduction)
            var isMiningDrill = (building ? building.canMine : 0);
            //  the output table in the wiki page is slightly off, as it uses -20%speed/productivity module, while the correct value would be -15%/module
            // (Mining power - Mining hardness) * Mining speed / Mining time
            return isMiningDrill ? ((production - value) * speed / time) : ((value / (time / speed)) * production);
        });
    }

    return {
        GetEnergyMultiplier: _getEnergyMultiplier,
        GetPollutionMultiplier: _getPollutionMultiplier,
        GetProductionMultiplier: _getProductionMultiplier,
        GetSpeedMultiplier: _getSpeedMultiplier,
        GetInputPerSecond: _getPerSecondInputRecipes,
        GetOutputPerSecond: _getPerSecondOutputRecipes
    }
});
