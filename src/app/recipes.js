define([], function() {

    function _getInput(recipe, expensive) {
        if(recipe.normal){
            if(expensive){
                return recipe.expensive.input;
            } else {
                return recipe.normal.input;
            }
        } else {
            return recipe.input;
        }
    }

    function _getOutput(recipe, expensive) {
        if(recipe.normal){
            if(expensive){
                return recipe.expensive.output;
            } else {
                return recipe.normal.output;
            }
        } else {
            return recipe.output;
        }
    }

    function _getTime(recipe, expensive) {
        if(recipe.normal){
            if(expensive){
                return recipe.expensive.time;
            } else {
                return recipe.normal.time;
            }
        } else {
            return recipe.time;
        }
    }

    return {
        GetRecipeInput: _getInput,
        GetRecipeOutput: _getOutput,
        GetRecipeTime: _getTime
    }
});
