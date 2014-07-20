var utils = require('./../infrastructure/utils');

Individual = function(options) {
    this.body = null;
    this.fitness = null;
    this.options = options;
    this.validateRequiredOptions();
    this.initialize();
};

Individual.prototype.validateRequiredOptions = function() {
    if (!this.options) {
        throw "options are required";
    }
    if (this.options.minLength === undefined) {
        throw "a valid Number value is required for option 'minLength'";
    }
    else if (this.options.maxLength === undefined) {
        throw "a valid Number value is required for option 'maxLength'";
    }
    else if (!this.options.geneFactory) {
        throw "options 'geneFactory' is required";
    }
};

Individual.prototype.initialize = function() {
    var length = utils.randBetween(this.options.minLength, this.options.maxLength);
    this.body = [];
    for (var i = 0; i < length; i++) {
        this.body.push(this.options.geneFactory(i, this.body));
    }
};

Individual.prototype.copy = function() {
    var copied = new Individual(this.options);
    copied.body = this.body;
    copied.fitness = this.fitness;
    return copied;
};

Individual.prototype.createNew = function() {
    var newIndividual = this.copy();
    newIndividual.initialize();
    return newIndividual;
};

Individual.prototype.mutate = function() {
    this.body[utils.randBetween(0, this.body.length)] = this.options.geneFactory();
    this.fitness = null;
};

Individual.prototype.isFixedLength = function() {
    return this.options.minLength === this.options.maxLength;
};

exports.Individual = Individual;