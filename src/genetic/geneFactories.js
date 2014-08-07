var utils = require('./../infrastructure/utils');
var FunctionNode = require('./linear/functionNode').FunctionNode;
var ConditionalNode = require('./linear/conditionalNode').ConditionalNode;

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
        return new FunctionNode(func, options.registerSet);
    } else {
        var func = utils.selectRandom(options.conditionalSet)
        return new ConditionalNode(func, options.registerSet);
    }
};