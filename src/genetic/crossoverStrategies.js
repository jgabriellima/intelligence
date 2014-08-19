var utils = require('./../infrastructure/utils');

/**
 * Throws an exception if any individuals have less than two genes
 * @param {Individual[]} individuals - An array of individuals to validate
 * @throws An exception is thrown if any individuals have less than two genes
 */
var validateMinimumLength = function (individuals) {
    if (individuals[0].body.length < 2 || individuals[0].body.length < 2) {
        throw "individuals must have at least two genes for crossover";
    }
};

/**
 * Throws an exception if any individuals are not fixed length or of different lengths
 * @param {Individual[]} individuals - An array of individuals to validate
 * @throws An exception is thrown if any individuals are not fixed length
 */
var validateFixedLength = function (individuals) {
    if (!(individuals[0].isFixedLength() && individuals[1].isFixedLength()) ||
        (individuals[0].body.length !== individuals[1].body.length)) {
        throw "individuals must be of a fixed length and equal in length for crossover";
    }
};

/**
 * Swaps genes between two individuals at the specified index
 * @param {Individual} indvidualA - The first individual
 * @param {Individual} indvidualB - The second individual
 * @param {number} index - Body array index to swap genes at
 */
var swapGenes = function (indvidualA, indvidualB, index) {
    var temp = indvidualA.body[index];
    indvidualA.body[index] = indvidualB.body[index];
    indvidualB.body[index] = temp;
};


/**
 * Performs uniform crossover
 * @param {Individual[]} individuals - An array containing two individuals
 * @returns {Individual[]} An array containing two offspring
 */
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

/**
 * Performs one point crossover
 * @param {Individual[]} individuals - An array containing two individuals
 * @returns {Individual[]} An array containing two offspring
 */
exports.onePoint = function (individuals) {
    validateMinimumLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var indexA, indexB, newSizeA, newSizeB, cuts;
    var validCuts = [];
    var indexA = utils.randBetween(0, offspringA.body.length);
    for (indexB = 0; indexB < offspringB.body.length; indexB++) {
        newSizeA = indexA + (offspringB.body.length - indexB);
        newSizeB = indexB + (offspringA.body.length - indexA);
        if (newSizeA >= offspringA.options.minLength && newSizeA <= offspringA.options.maxLength &&
            newSizeB >= offspringB.options.minLength && newSizeB <= offspringB.options.maxLength) {
            validCuts.push({
                a: indexA,
                b: indexB
            });
        }
    }
    cuts = utils.selectRandom(validCuts);
    offspringA.body = individuals[0].body.slice(0, cuts.a).concat(individuals[1].body.slice(cuts.b));
    offspringB.body = individuals[1].body.slice(0, cuts.b).concat(individuals[0].body.slice(cuts.a));
    return [offspringA, offspringB];
};

/**
 * Performs two point crossover
 * @param {Individual[]} individuals - An array containing two individuals
 * @returns {Individual[]} An array containing two offspring
 */
exports.twoPoint = function (individuals) {
    validateMinimumLength(individuals);
    var offspringA = individuals[0].copy();
    var offspringB = individuals[1].copy();
    var indexC, indexD, cuts, newSizeA, newSizeB;
    var validCuts = [];
    var indexA = utils.randBetween(0, offspringA.body.length - 1);
    var indexB = utils.randBetween(indexA + 1, offspringA.body.length);
    for (indexC = 0; indexC < offspringB.body.length; indexC++) {
        for (indexD = indexC + 1; indexD < offspringB.body.length; indexD++) {
            newSizeA = offspringA.body.length - (indexB - indexA) + (indexD - indexC);
            newSizeB = offspringB.body.length - (indexD - indexC) + (indexB - indexA);
            if (newSizeA <= offspringA.options.maxLength &&
                newSizeA >= offspringA.options.minLength &&
                newSizeB <= offspringB.options.maxLength &&
                newSizeB >= offspringB.options.minLength) {
                validCuts.push({
                    a: indexA,
                    b: indexB,
                    c: indexC,
                    d: indexD
                });
            }
        }
    }
    cuts = utils.selectRandom(validCuts);
    offspringA.body = individuals[0].body.slice(0, cuts.a);
    offspringB.body = individuals[1].body.slice(0, cuts.c);
    offspringA.body = offspringA.body.concat(individuals[1].body.slice(cuts.c, cuts.d + 1));
    offspringB.body = offspringB.body.concat(individuals[0].body.slice(cuts.a, cuts.b + 1));
    offspringA.body = offspringA.body.concat(individuals[0].body.slice(cuts.b + 1));
    offspringB.body = offspringB.body.concat(individuals[1].body.slice(cuts.d + 1));
    return [offspringA, offspringB];
};