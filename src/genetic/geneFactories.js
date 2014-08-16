var utils = require('./../infrastructure/utils');
var LinearFunctionNode = require('./linear/linearFunctionNode').LinearFunctionNode;
var LinearConditionalNode = require('./linear/linearConditionalNode').LinearConditionalNode;

/**
 * Returns a random number between 0 and 1
 * @returns {number} A random number between 0 and 1
 */
exports.randomNumber = function () {
    return utils.random();
};

/**
 * Returns a random binary number
 * @returns {number} A random binary number
 */
exports.binaryNumber = function () {
    return utils.random() < 0.5 ? 0 : 1;
};

/**
 * Returns a random binary string
 * @returns {number} A random binary string
 */
exports.binaryString = function () {
    return utils.random() < 0.5 ? '0' : '1';
};

/**
 * Returns a random letter in the alphabet, including uppercase characters and whitespace
 * @returns {string} A random letter in the alphabet
 */
exports.alphabet = function () {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '.split('');
    return letters[utils.randBetween(0, letters.length)];
};

/**
 * Returns a random linear node for linear genetic programming
 * @param {LinearIndividual} A linear individual to create a node for
 * @returns {LinearGPNode} A random linear node
 */
exports.linearNode = function (individual) {
    var options = individual.options;
    var totalFunctions = options.functionSet.length + options.conditionalSet.length;
    var functionProbability = options.functionSet.length / totalFunctions;
    if (utils.random() < functionProbability) {
        var func = utils.selectRandom(options.functionSet)
        return new LinearFunctionNode(func, options.registerSet);
    } else {
        var func = utils.selectRandom(options.conditionalSet)
        return new LinearConditionalNode(func, options.registerSet);
    }
};