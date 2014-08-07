var utils = require('./../infrastructure/utils');
var clone = require('clone');

var Individual = function (options) {
    this.body = null;
    this.fitness = null;
    this.options = options;
    this.validateRequiredOptions();
    this.initialise();
    return this;
};

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
};

Individual.prototype.initialise = function () {
    var length = utils.randBetween(this.options.minLength, this.options.maxLength + 1);
    this.body = [];
    for (var i = 0; i < length; i++) {
        this.body.push(this.options.geneFactory(this));
    }
};

Individual.prototype.copy = function () {
    return clone(this);
};

Individual.prototype.createNew = function () {
    var newIndividual = this.copy();
    newIndividual.initialise();
    return newIndividual;
};

Individual.prototype.mutate = function () {
    this.body[utils.randBetween(0, this.body.length)] = this.options.geneFactory();
    this.fitness = null;
};

Individual.prototype.isFixedLength = function () {
    return this.options.minLength === this.options.maxLength;
};

exports.Individual = Individual;