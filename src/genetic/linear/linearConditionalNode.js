var LinearGPNode = require('./linearGPNode').LinearGPNode;
var utils = require('./../../infrastructure/utils');

/**
 * Linear genetic programming conditional node
 * @constructor
 * @extends LinearGPNode
 * @param {function} func - A function that this node will represent
 * @param {RegisterSet} registerSet - A register set instance
 */
var LinearConditionalNode = function (func, registers) {
    LinearGPNode.call(this, func, registers);
};

utils.inherits(LinearConditionalNode, LinearGPNode);

/**
 * Returns a string representation of the linear conditional node
 * @returns {string} A string representation of the linear conditional node
 */
LinearConditionalNode.prototype.toString = function () {
    return utils.formatString("if ({0}({1}))", [this.func.name, this.getArgumentsString()]);
};

/**
 * Returns the return value of the function from the given register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {boolean} The return value of the function from the given register set
 */
LinearConditionalNode.prototype.execute = function (registerSet) {
    return this.getFuncReturnValue(registerSet);
};

exports.LinearConditionalNode = LinearConditionalNode;