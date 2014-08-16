var registerReference = require('./registerReference');
var utils = require('./../../infrastructure/utils');

/**
 * Linear genetic programming node
 * @constructor
 * @param {function} func - A function that this node will represent
 * @param {RegisterSet} registerSet - A register set instance
 * @property {function} func - Linear indivdual options
 * @property {RegisterReference[]} inputRegisters - An array of register references
 */
var LinearGPNode = function (func, registerSet) {
    this.func = func;
    this.inputRegisters = null;
    this.setInputRegisters(registerSet);
};

/**
 * Randomly sets two input registers based on the provided register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {LinearGPNode} Reference to current object for chaining
 */
LinearGPNode.prototype.setInputRegisters = function (registerSet) {
    var random = utils.random();
    this.inputRegisters = [];
    for (var i = 0; i < this.func.length; i++) {
        if (random < 0.25) {
            this.inputRegisters.push(registerReference.createInput(registerSet));
        } else if (random < 0.5) {
            this.inputRegisters.push(registerReference.createConstant(registerSet));
        } else if (random < 0.75) {
            this.inputRegisters.push(registerReference.createCalculation(registerSet));
        } else {
            this.inputRegisters.push(registerReference.createOutput(registerSet));
        }
    }
};

/**
 * Returns the value returned by the nodes function based on the input values from a given register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {*} Functon return value
 */
LinearGPNode.prototype.getFuncReturnValue = function (registerSet) {
    var arguments = [];
    for (var i = 0; i < this.inputRegisters.length; i++) {
        arguments.push(this.inputRegisters[i].getValue(registerSet));
    }
    return this.func.apply(this, arguments);
};

/**
 * Returns a comma seperated string of input registers
 * @returns {string} A comma seperated string of input registers
 */
LinearGPNode.prototype.getArgumentsString = function () {
    var arguments = "";
    for (var i = 0; i < this.inputRegisters.length; i++) {
        arguments += this.inputRegisters[i].toString();
        if (i !== this.inputRegisters.length - 1) {
            arguments += ", ";
        }
    }
    return arguments;
};

exports.LinearGPNode = LinearGPNode;