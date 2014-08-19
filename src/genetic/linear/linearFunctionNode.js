var utils = require('./../../infrastructure/utils');
var LinearGPNode = require('./linearGPNode').LinearGPNode;
var registerReference = require('./registerReference');

/**
 * Linear genetic programming function node
 * @constructor
 * @extends LinearGPNode
 * @param {function} func - A function that this node will represent
 * @param {RegisterSet} registerSet - A register set instance
 * @property {RegisterReference} targetRegister - A target register reference
 */
var LinearFunctionNode = function (func, registerSet) {
    LinearGPNode.call(this, func, registerSet);
    this.targetRegister = null;
    this.setTargetRegister(registerSet);
    return this;
};

utils.inherits(LinearFunctionNode, LinearGPNode);

/**
 * Randomly sets the target register based on the provided register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {LinearFunctionNode} Reference to current object for chaining
 */
LinearFunctionNode.prototype.setTargetRegister = function (registerSet) {
    this.targetRegister = registerReference.createRandomWritable(registerSet);
    return this;
};

/**
 * Sets the target register value based on the return value of the function from the given register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {LinearFunctionNode} Reference to current object for chaining
 */
LinearFunctionNode.prototype.execute = function (registerSet) {
    this.targetRegister.setValue(registerSet, this.getFuncReturnValue(registerSet));
    return this;
};

/**
 * Returns a string representation of the linear function node
 * @returns {string} A string representation of the linear function node
 */
LinearFunctionNode.prototype.toString = function () {
    var argumentsArray = [this.targetRegister.toString(), this.func.name, this.getArgumentsString()];
    return utils.formatString("{0} = {1}({2});", argumentsArray);
};

exports.LinearFunctionNode = LinearFunctionNode;