var utils = require('./../infrastructure/utils');
var selection = require('./selection');

Population = function(options) {
    this.options = options;
    this.individuals = null;
    this.validateRequiredOptions();
    this.setDefaultOptionsIfNotRequired();
	this.initialise();
};

Population.prototype.validateRequiredOptions = function() {
    if (!this.options) {
        throw "options are required";
    }
    if (!this.options.baseIndividual) {
        throw "option 'baseIndividual' is required";
    }
    else if (!this.options.crossoverStrategy) {
        throw "option 'crossoverStrategy' is required";
    }
    else if (!this.options.fitnessFunction) {
        throw "options 'fitnessFunction' is required";
    };
};

Population.prototype.setDefaultOptionsIfNotRequired = function() {
    if (!this.options.populationSize) {
        this.options.populationSize = 100;
    }
    if (!this.options.crossoverRate) {
        this.options.crossoverRate = 0.75;
    }
    if (!this.options.mutationRate) {
        this.options.mutationRate = 0.5;
    }
    if (!this.options.tournamentSize) {
        this.options.tournamentSize = 5;
    }
    if (!this.options.selectionStrategy) {
        this.options.selectionStrategy = selection.tournamentSelectionStrategy;
    }
};

Population.prototype.initialise = function() {
    this.individuals = [];
    for (var i=0; i < this.options.populationSize; i++) {
        this.individuals.push(this.options.baseIndividual.createNew());
    }
};

Population.prototype.evaluateFitness = function() {
    for (var i=0; i < this.individuals.length; i++) {
        var individual = this.individuals[i];
        if (individual.fitness === null) {
            individual.fitness = this.options.fitnessFunction(individual);
        }
    }
};

Population.prototype.crossover = function() {
    var limbo = [];
    if (this.options.elitism) {
        var elite = this.getFittestIndividuals(this.options.elitism);
        for (var i=0; i < elite.length; i++) {
            limbo.push(elite[i].copy());
        }
    }
    while (limbo.length < this.individuals.length) {
        var selections = this.options.selectionStrategy(this.individuals, this.options);
        if (utils.random() < this.options.crossoverRate) {
            selections = this.options.crossoverStrategy(selections, this.options);
            for (var i=0; i < selections.length; i++) selections[i].fitness = null;
        }
        limbo = limbo.concat(selections);
    }
    this.individuals = limbo;
};

Population.prototype.mutate = function() {
    var elite = this.options.elite ? this.getFittestIndividuals[this.options.elite] : null;
    for (var i=0; i < this.individuals.length; i++) {
        if (!elite || elite.indexOf(this.individuals[i]) > -1) {
            if (utils.random() < this.options.mutationRate) {
                this.individuals[i].mutate();
            }
        }
    }
};

Population.prototype.getFittestIndividuals = function(numIndividuals) {
    var self = this;
    this.evaluateFitness();
    if (!numIndividuals) numIndividuals = 1;
    return this.individuals.sort(function(a, b) {
        if (a.fitness === null && b.fitness === null) {
            return 0;
        }
        else if (a.fitness === null) {
            return -1;
        }
        else if (b.fitness === null) {
            return 1;
        }
        else {
            return self.options.isMinimise ? a.fitness - b.fitness : b.fitness - a.fitness; 
        }
    }).slice(0, numIndividuals);
};

Population.prototype.getAverageFitness = function() {
    var sum = 0;
    for (var i=0; i < this.individuals.length; i++) {
        sum += this.individuals[i].fitness;
    };
    return sum / this.individuals.length;
};

Population.prototype.step = function() {
    this.evaluateFitness();
    this.crossover();
    this.mutate();
    this.evaluateFitness();
};

exports.Population = Population;