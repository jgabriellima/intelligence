var utils = require('./../infrastructure/utils');
var clone = require('clone');

/**
 * Genetic algorithm individual
 * @constructor
 * @param {object} options - Individual options
 * @param {number} options.minLength - The minimum number of genes
 * @param {number} options.maxLength - The maximum number of genes
 * @param {function} options.geneFactory - A function that returns a random gene
 * @property {object[]} body - An array of genes that represent a single chromosome
 * @property {number} fitness - The individuals fitness rating
 * @property {object} options - Individual options
 */
var Individual = function (options) {
    this.body = null;
    this.fitness = null;
    this.normalisedFitness = null;
    this.options = options;
    this.validateRequiredOptions();
    this.initialise();
    return this;
};

/**
 * Validates the individuals current options
 * @throws An exception will occur if a required option is missing
 * @returns {Individual} Reference to current object for chaining
 */
Individual.prototype.validateRequiredOptions = function () {
    if (!this.options) {
        throw "options are required";
    } else if (this.options.minLength === undefined) {
        throw "option 'minLength' is required";
    } else if (this.options.maxLength === undefined) {
        throw "option 'maxLength' is required";
    } else if (!this.options.geneFactory) {
        throw "option 'geneFactory' is required";
    }
    return this;
};

/**
 * Re creates the individuals body with randomly generated genes
 * @returns {Individual} Reference to current object for chaining
 */
Individual.prototype.initialise = function () {
    var length = utils.randBetween(this.options.minLength, this.options.maxLength + 1);
    this.body = [];
    for (var i = 0; i < length; i++) {
        this.body.push(this.options.geneFactory(this));
    }
    return this;
};

/**
 * Creates a deep copy of the individual
 * @returns {Individual} A copy of the Individual instance
 */
Individual.prototype.copy = function () {
    return clone(this);
};

/**
 * Creates a deep copy of the individual and then re initialises
 * @returns {Individual} A new individual based on the current individual
 */
Individual.prototype.createNew = function () {
    var newIndividual = this.copy();
    newIndividual.initialise();
    return newIndividual;
};

/**
 * Mutates the individual by swapping a single gene with a randomly created gene
 * @returns {Individual} Reference to current object for chaining
 */
Individual.prototype.mutate = function () {
    this.body[utils.randBetween(0, this.body.length)] = this.options.geneFactory(this);
    this.fitness = null;
    return this;
};

/**
 * Determine whether the individual body length is fixed (i.e. minLength === maxLength)
 * @returns {boolean} A true value if the indiviuals body is of fixed length
 */
Individual.prototype.isFixedLength = function () {
    return this.options.minLength === this.options.maxLength;
};

exports.Individual = Individual;