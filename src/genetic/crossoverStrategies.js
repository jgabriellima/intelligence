var utils = require('./../infrastructure/utils');

var validateMinimumLength = function (individuals) {
    if (individuals[0].body.length < 2 || individuals[0].body.length < 2) {
        throw "individuals must have at least two genes for crossover";
    }
};

var validateFixedLength = function (individuals) {
    if (!(individuals[0].isFixedLength() && individuals[1].isFixedLength())) {
        throw "individuals must be of a fixed length for crossover";
    }
};

var validateVariableLength = function (individuals) {
    if (individuals[0].isFixedLength() || individuals[1].isFixedLength()) {
        throw "individuals must be of variable length for crossover";
    }
};

var swapGenes = function (chromosomeA, chromosomeB, index) {
    var temp = chromosomeA.body[index];
    chromosomeA.body[index] = chromosomeB.body[index];
    chromosomeB.body[index] = temp;
};

exports.onePointFixed = function (individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cut = utils.randBetween(0, offspringA.body.length - 1);
    for (var i = cut; i < offspringA.body.length; i++) {
        swapGenes(offspringA, offspringB, i);
    }
    return [offspringA, offspringB];
};

exports.twoPointFixed = function (individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length - 2);
    var cutB = utils.randBetween(cutA + 1, offspringA.body.length - 1);
    for (var i = cutA; i < cutB; i++) {
        swapGenes(offspringA, offspringB, i);
    }
    return [offspringA, offspringB];
};

exports.uniform = function (individuals) {
    validateMinimumLength(individuals);
    validateFixedLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    for (var i = 0; i < offspringA.body.length; i++) {
        if (utils.random() < 0.5) {
            swapGenes(offspringA, offspringB, i);
        }
    }
    return [offspringA, offspringB];
};

exports.onePointVariable = function (individuals) {
    validateMinimumLength(individuals);
    validateVariableLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length);
    var cutB = utils.randBetween(0, offspringB.body.length);
    offspringA.body = individuals[0].body.slice(0, cutA).concat(individuals[1].body.slice(cutB, individuals[1].body.length));
    offspringB.body = individuals[1].body.slice(0, cutB).concat(individuals[0].body.slice(cutA, individuals[0].body.length));
    return [offspringA, offspringB];
};

exports.twoPointVariable = function (individuals) {
    validateMinimumLength(individuals);
    validateVariableLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var cutA = utils.randBetween(0, offspringA.body.length - 2);
    var cutB = utils.randBetween(cutA + 1, offspringA.body.length - 1);
    var cutC = utils.randBetween(0, offspringB.body.length - 2);
    var cutD = utils.randBetween(cutC + 1, offspringB.body.length - 1);
    offspringA.body = individuals[0].body.slice(0, cutA);
    offspringB.body = individuals[1].body.slice(0, cutC);
    offspringA.body = offspringA.body.concat(individuals[1].body.slice(cutC, cutD));
    offspringB.body = offspringB.body.concat(individuals[0].body.slice(cutA, cutB));
    offspringA.body = offspringA.body.concat(individuals[0].body.slice(cutB, individuals[0].body.length));
    offspringB.body = offspringB.body.concat(individuals[1].body.slice(cutD, individuals[1].body.length));
    return [offspringA, offspringB];
};