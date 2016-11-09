define(['knockout', 'text!./summary-building.html', 'app/formulae'], function(ko, templateMarkup, $f) {

    var ENERGY_UNIT = " kw";
    var POLLUTION_UNIT = " pu";
    var SPEED_UNIT = "x";

    function SummaryBuilding(params) {
        var $self = this;

        $self.selectedBuilding = params.selectedBuilding;
        $self.selectedModules = params.selectedModules;

        $self.energyLabel = ko.computed($self.labelText("Energy", $f.GetEnergyMultiplier), $self);
        $self.energy = ko.computed($self.unitToText(ENERGY_UNIT, b => b.energy.max), $self);

        $self.pollutionLabel = ko.computed($self.labelText("Pollution", $f.GetPollutionMultiplier), $self);
        $self.pollution = ko.computed($self.unitToText(POLLUTION_UNIT, b => b.pollution), $self);

        $self.speedLabel = ko.computed($self.labelText("Speed", $f.GetSpeedMultiplier), $self);
        $self.speed = ko.computed($self.unitToText(SPEED_UNIT, b => b.speed), $self);
    }

    SummaryBuilding.prototype.unitToText = function(measureamentUnit, fnGetProp) {
        return function() {
            var text = 0 + measureamentUnit;
            var building = this.selectedBuilding();

            if (building) {
                text = fnGetProp(building) + measureamentUnit;
            }
            return text;
        }
    }

    SummaryBuilding.prototype.labelText = function(defaultText, fnGetMultiplier) {
        return function() {
            var text = defaultText;
            var multiplier = Math.round(fnGetMultiplier(this.selectedModules) * 100);

            if (multiplier != 0) {
                text += " ( " + (multiplier > 0 ? '+' : '') + multiplier + "% )";
            }
            return text;
        }
    }


    return {
        viewModel: SummaryBuilding,
        template: templateMarkup
    };
});
