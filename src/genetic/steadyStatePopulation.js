var utils = require('./../infrastructure/utils');
var selectionStrategies = require('./selectionStrategies');
var Population = require('./population').Population;

var SteadyStatePopulation = function (options) {
    Population.call(this, options);
};

utils.inherits(SteadyStatePopulation, Population);

SteadyStatePopulation.prototype.step = function () {
    var selections = this.options.selectionStrategy(this);
    if (utils.random() < this.options.crossoverRate) {
        selections = this.options.crossoverStrategy(selections);
    }
    for (var i = 0; i < 2; i++) {
        if (utils.random() < this.options.mutationRate) {
            selections[i].mutate();
        }
    }
    this.individuals[utils.randBetween(0, this.individuals.length)] = selections[0];
    this.individuals[utils.randBetween(0, this.individuals.length)] = selections[1];
    return this;
};

exports.SteadyStatePopulation = SteadyStatePopulation;