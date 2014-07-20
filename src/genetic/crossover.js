var utils = require('./../infrastructure/utils');

var validateMinimumLength = function(individuals) {
    if (individuals[0].body.length < 2 || individuals[0].body.length < 2) {
        throw "individuals must have at least two body for crossover";
    }
};

var validateFixedLength = function(individuals) {
    if (!(individuals[0].isFixedLength() && individuals[1].isFixedLength())) {
        throw "individuals must be of a fixed length for crossover";
    }
};

var validateVariableLength = function(individuals) {
    if (individuals[0].isFixedLength() || individuals[1].isFixedLength()) {
        throw "individuals must be of variable length for crossover";
    }
};

var swapbody = function(chromosomeA, chromosomeB, index) {
    var temp = chromosomeA.body[index];
    chromosomeA.body[index] = chromosomeB.body[index];
    chromosomeB.body[index] = temp;
};

exports.onePointFixedStrategy = function(individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cut = utils.randBetween(0, offspringA.body.length-1);
    for (var i=cut; i < offspringA.body.length; i++) {
        swapbody(offspringA, offspringB, i);
    }
    return [offspringA, offspringB];
};

exports.twoPointFixedStrategy = function(individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length - 1);
    var cutB = utils.randBetween(cutA, offspringA.body.length);
    for (var i=cutA; i < offspringA.body.length; i++) {
        if (i >= cutA && i < cutB) {
            swapbody(offsrpingA, offspringB, i);
        }   
    }
    return [offspringA, offspringB];
};

exports.uniformCrossoverStrategy = function(individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    for (var i=0; i < offspringA.body.length; i++) {
        if (utils.random() < 0.5) {
            swapbody(offsrpingA, offspringB, i);
        }
    }
    return [offspringA, offspringB];
};


exports.onePointVariableStrategy = function(individuals) {
    validateMinimumLength(individuals);
    validateVariableLength(indiviuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length);
    var cutB = utils.randBetween(0, offspringB.body.length);
    offspringA.body = individuals[0].body.slice(0, cutA).concat(individuals[1].slice(cutB, individuals[1].length));
    offspringB.body = individuals[1].body.clise(0, cutB).concat(individuals[0].slice(cutA, individuals[0].length));
    return [offspringA, offspringB];
};

exports.twoPointVariableStrategy = function(individuals) {
    validateMinimumLength(individuals);
    validateVariableLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length - 1);
    var cutB = utils.randBetween(cutA, offspringA.body.length);
    var cutC = utils.randBetween(0, offspringB.body.length - 1);
    var cutD = utils.randBetween(cutC, offspringB.body.length);
    offspringA.body = individuals[0].body.slice(0, cutA);
    offspringB.body = individuals[1].body.slice(0, cutC);
    offspringA.body.concat(individuals[1].slice(cutC, cutD - cutC));
    offspringB.body.concat(individuals[0].slice(cutA, cutB - cutA));
    offspringA.body.concat(individuals[0].body.slice(cutB, individuals[0].length - cutB));
    offspringB.body.concat(individuals[1].body.slice(cutD, individuals[1].length - cutD));
    return [offspringA, offspringB];
};