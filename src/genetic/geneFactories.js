var utils = require('./../infrastructure/utils');
var LinearFunctionNode = require('./linear/linearFunctionNode').LinearFunctionNode;
var LinearConditionalNode = require('./linear/linearConditionalNode').LinearConditionalNode;

exports.number = function () {
    return utils.random();
};

exports.binaryNumber = function () {
    return utils.random() < 0.5 ? 0 : 1;
};

exports.binaryString = function () {
    return utils.random() < 0.5 ? '0' : '1';
};

exports.alphabet = function () {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '.split('');
    return letters[utils.randBetween(0, letters.length)];
};

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