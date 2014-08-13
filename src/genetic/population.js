var events = require('events');
var utils = require('./../infrastructure/utils');
var selectionStrategies = require('./selectionStrategies');

var Population = function (options) {
    this.options = options;
    this.individuals = null;
    this.validateRequiredOptions();
    this.setDefaultOptionsIfNotProvided();
    this.initialise();
    events.EventEmitter.call(this);
    return this;
};

utils.inherits(Population, events.EventEmitter);

Population.prototype.validateRequiredOptions = function () {
    if (!this.options) {
        throw "options are required";
    } else if (!this.options.baseIndividual) {
        throw "option 'baseIndividual' is required";
    } else if (!this.options.crossoverStrategy) {
        throw "option 'crossoverStrategy' is required";
    } else if (!this.options.fitnessFunction) {
        throw "options 'fitnessFunction' is required";
    };
};

Population.prototype.setDefaultOptionsIfNotProvided = function () {
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
        this.options.tournamentSize = Math.ceil(this.options.populationSize * 0.05);
    }
    if (!this.options.selectionStrategy) {
        this.options.selectionStrategy = selectionStrategies.tournament;
    }
};

Population.prototype.initialise = function () {
    this.individuals = [];
    for (var i = 0; i < this.options.populationSize; i++) {
        this.individuals.push(this.options.baseIndividual.createNew());
    }
    return this;
};

Population.prototype.evaluateFitness = function () {
    for (var i = 0; i < this.individuals.length; i++) {
        var individual = this.individuals[i];
        if (individual.fitness === null) {
            individual.fitness = this.options.fitnessFunction(individual);
        }
    }
    return this.filterNanFitness();
};

Population.prototype.crossover = function () {
    this.evaluateFitness();
    var limbo = [];
    if (this.options.elitism) {
        var elite = this.getFittestIndividuals(this.options.elitism);
        for (var i = 0; i < elite.length; i++) {
            limbo.push(elite[i].copy());
        }
    }
    while (limbo.length < this.individuals.length) {
        var selections = this.options.selectionStrategy(this.individuals, this.options);
        if (utils.random() < this.options.crossoverRate) {
            selections = this.options.crossoverStrategy(selections, this.options);
            for (var i = 0; i < selections.length; i++) selections[i].fitness = null;
        }
        limbo = limbo.concat(selections);
    }
    this.individuals = limbo;
    return this;
};

Population.prototype.mutate = function () {
    this.evaluateFitness();
    var elite = this.options.elitism ? this.getFittestIndividuals(this.options.elitism) : null;
    for (var i = 0; i < this.individuals.length; i++) {
        if (!elite || elite.indexOf(this.individuals[i]) > -1) {
            if (utils.random() < this.options.mutationRate) {
                this.individuals[i].mutate();
            }
        }
    }
    return this;
};

Population.prototype.getFittestIndividuals = function (numIndividuals) {
    this.evaluateFitness();
    var self = this;
    this.evaluateFitness();
    if (!numIndividuals) numIndividuals = 1;
    return this.individuals.sort(function (a, b) {
        if (a.fitness === null && b.fitness === null) {
            return 0;
        } else if (a.fitness === null) {
            return -1;
        } else if (b.fitness === null) {
            return 1;
        } else {
            return self.options.isMinimise ? a.fitness - b.fitness : b.fitness - a.fitness;
        }
    }).slice(0, numIndividuals);
};

Population.prototype.getAverageFitness = function () {
    this.evaluateFitness();
    var sum = 0;
    for (var i = 0; i < this.individuals.length; i++) {
        if (isFinite(this.individuals[i].fitness)) {
            sum += this.individuals[i].fitness;
        }
    };
    return sum / this.individuals.length;
};

Population.prototype.step = function () {
    return this.evaluateFitness().crossover().mutate().evaluateFitness();
};

Population.prototype.train = function (numGenerations, generationCb, completedCb) {
    if (numGenerations <= 0) {
        throw "'numGenerations' must greater than 0";
    } else {
        for (var i = 0; i < numGenerations; i++) {
            this.step();
            this.emit('generationCompleted', this, i);
        }
    }
    this.emit('trainingCompleted', this);
};

Population.prototype.filterNanFitness = function () {
    var value = this.options.isMinimise ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    for (var i = 0; i < this.individuals.length; i++) {
        var individual = this.individuals[i];
        if (isNaN(individual.fitness)) {
            individual.fitness = value
        }
    }
    return this;
};

exports.Population = Population;