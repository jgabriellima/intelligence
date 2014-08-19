var events = require('events');
var utils = require('./../infrastructure/utils');
var selectionStrategies = require('./selectionStrategies');

/**
 * Genetic algorithm population
 * @constructor
 * @param {object} options - Population options
 * @param {Individual} options.baseIndividual -
 * @property {object} options - Population options
 */
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

/**
 * Throws an exception if a required option is missing
 * @throws An exception is thrown if a required option is missing
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.validateRequiredOptions = function () {
    if (!this.options) {
        throw "options are required";
    } else if (!this.options.baseIndividual) {
        throw "option 'baseIndividual' is required";
    } else if (!this.options.crossoverStrategy) {
        throw "option 'crossoverStrategy' is required";
    } else if (!this.options.fitnessFunction) {
        throw "options 'fitnessFunction' is required";
    }
    return this;
};

/**
 * Sets default values for options that have not been defined
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.setDefaultOptionsIfNotProvided = function () {
    if (!this.options.populationSize) {
        this.options.populationSize = 100;
    }
    if (this.options.crossoverRate === undefined) {
        this.options.crossoverRate = 0.75;
    }
    if (this.options.mutationRate === undefined) {
        this.options.mutationRate = 0.2;
    }
    if (!this.options.tournamentSize) {
        this.options.tournamentSize = Math.ceil(this.options.populationSize * 0.05);
    }
    if (!this.options.selectionStrategy) {
        this.options.selectionStrategy = selectionStrategies.tournament;
    }
    return this;
};

/**
 * Creates a randomly generated population of individuals
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.initialise = function () {
    this.individuals = [];
    for (var i = 0; i < this.options.populationSize; i++) {
        this.individuals.push(this.options.baseIndividual.createNew());
    }
    return this;
};

/**
 * Calculates the fitness of each individual where the fitness value is null
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.evaluateFitness = function () {
    for (var i = 0; i < this.individuals.length; i++) {
        var individual = this.individuals[i];
        if (individual.fitness === null) {
            individual.fitness = this.options.fitnessFunction(individual);
        }
    }
    return this.filterNanFitness();
};

/**
 * Performs crossover using the crossoverStrategy function defined in the population options
 * @returns {Population} Reference to current object for chaining
 */
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
            var elections = this.options.crossoverStrategy(selections, this.options);
            selections = elections;
            for (var i = 0; i < selections.length; i++) selections[i].fitness = null;
        }
        limbo = limbo.concat(selections);
    }
    this.individuals = limbo;
    return this;
};

/**
 * Mutates the population based on the mutationRate property in the population options
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.mutate = function () {
    this.evaluateFitness();
    var elite = this.options.elitism ? this.getFittestIndividuals(this.options.elitism) : null;
    for (var i = 0; i < this.individuals.length; i++) {
        if (!elite || elite.indexOf(this.individuals[i]) === -1) {
            if (utils.random() < this.options.mutationRate) {
                this.individuals[i].mutate();
                this.individuals[i].fitness = null;
            }
        }
    }
    return this;
};

/**
 * Returns a specified number of individuals with the best fitness rating in the population
 * @param {number} [numIndividuals=1] - The number of individuals to return
 * @returns {Individual[]} An array of the fittest individuals in the population
 */
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

/**
 * Calculate the average fitness of all individuals in the population (exluding infinite values)
 * @returns {number} Average fitness of the population
 */
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

/**
 * Applies a single iteration of crossover and mutation to the population
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.step = function () {
    return this.evaluateFitness().crossover().mutate().evaluateFitness();
};

/**
 * Trains the population over a specified number of generations
 * @param {number} numGenerations - The number of generations to train the population over
 * @returns {Population} Reference to current object for chaining
 */
Population.prototype.train = function (numGenerations) {
    if (numGenerations <= 0) {
        throw "'numGenerations' must greater than 0";
    } else {
        for (var i = 0; i < numGenerations; i++) {
            this.step();
            this.emit('generationCompleted', this, i);
        }
    }
    this.emit('trainingCompleted', this);
    return this;
};

/**
 * Subsitutes an individuals fitness to positive or negative infinity if it isNaN
 * @returns {Population} Reference to current object for chaining
 */
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

/**
 * Save the population to a file
 * @param {string} filePath - Path to file
 * @callback {writeToFileCallback} cb - Callback handler
 */
Population.prototype.saveToFile = function (filePath, cb) {
    var serialised = utils.serialise(this);
    utils.writeToFile(filePath, serialised, cb);
};

/**
 * Load a population from a file
 * @static
 * @param {string} filePath - Path to file
 * @callback {loadFromFileCallback} cb - Callback handler
 */
Population.loadFromFile = function (filePath, cb) {
    utils.readFromFile(filePath, function (err, data) {
        if (err) {
            cb(err);
        } else {
            var deserialised = utils.deserialise(data);
            return deserialised;
        }
    });
};

exports.Population = Population;