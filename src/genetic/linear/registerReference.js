var utils = require('./../../infrastructure/utils');

/**
 * Linear genetic programming register reference
 * @constructor
 * @param {string} flag - The register set property name
 * @param {RegisterSet} registerSet - The register set to randomly select an index from
 * @param {number} index - Optional user specified index
 * @property {string} flag - The register set property name
 * @property {number} index - The register set array index
 */
var RegisterReference = function (flag, registerSet, index) {
    if (!registerSet[flag]) {
        throw "Property does not exist";
    }
    this.flag = flag;
    if (index !== undefined) {
        this.index = index;
    } else {
        this.setRandomIndex(registerSet);
    }
    return this;
};

/**
 * Sets the index property to a random value based on the provided register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {RegisterReference} Reference to current object for chaining
 */
RegisterReference.prototype.setRandomIndex = function (registerSet) {
    if (this.flag === exports.INPUT) {
        this.index = utils.randBetween(0, registerSet.options.numInputs);
    } else if (this.flag === exports.CONSTANT) {
        this.index = utils.randBetween(0, registerSet.const.length);
    } else if (this.flag === exports.CALCULATION) {
        this.index = utils.randBetween(0, registerSet.calc.length);
    } else {
        this.index = utils.randBetween(0, registerSet.out.length);
    }
    return this;
};

/**
 * Gets the value that this register reference represents in the given register set
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {*} Value from the register set
 */
RegisterReference.prototype.getValue = function (registerSet) {
    return registerSet[this.flag][this.index];
};

/**
 * Sets the value that this register reference represents in the given register set
 * @param {RegisterSet} registerSet - A register set instance
 * @param {*} value - A value to set
 * @returns {RegisterReference} Reference to current object for chaining
 */
RegisterReference.prototype.setValue = function (registerSet, value) {
    if (this.flag !== exports.CALCULATION && this.flag !== exports.OUTPUT) {
        throw "only calculation or output registers can be set";
    } else {
        registerSet[this.flag][this.index] = value;
    }
    return this;
};

/**
 * Returns a string representation of register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {string} A string representation of the register reference
 */
RegisterReference.prototype.toString = function () {
    return utils.formatString("registerSet.{0}[{1}]", [this.flag, this.index]);
};

/**
 * Returns a new input register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @param {number} index - Optional user specified index
 * @returns {RegisterReference} A new input register reference
 */
exports.createInput = function (registerSet, index) {
    return new RegisterReference(exports.INPUT, registerSet, index);
};

/**
 * Returns a new constant register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @param {number} index - Optional user specified index
 * @returns {RegisterReference} A new constant register reference
 */
exports.createConstant = function (registerSet, index) {
    return new RegisterReference(exports.CONSTANT, registerSet, index);
};

/**
 * Returns a new calculation register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @param {number} index - Optional user specified index
 * @returns {RegisterReference} A new calculation register reference
 */
exports.createCalculation = function (registerSet, index) {
    return new RegisterReference(exports.CALCULATION, registerSet, index);
};

/**
 * Returns a new output register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @param {number} index - Optional user specified index
 * @returns {RegisterReference} A new output register reference
 */
exports.createOutput = function (registerSet, index) {
    return new RegisterReference(exports.OUTPUT, registerSet, index);
};

/**
 * Creates a random readable register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {RegisterReference} A new readable register reference
 */
exports.createRandomReadable = function (registerSet) {
    var random = utils.random();
    if (random < 0.25) {
        return exports.createInput(registerSet);
    } else if (random < 0.5 && registerSet.const.length > 0) {
        return exports.createConstant(registerSet);
    } else if (random < 0.75 && registerSet.calc.length > 0) {
        return exports.createCalculation(registerSet);
    } else {
        return exports.createOutput(registerSet);
    }
};

/**
 * Creates a random writable register reference
 * @param {RegisterSet} registerSet - A register set instance
 * @returns {RegisterReference} A new writable register reference
 */
exports.createRandomWritable = function (registerSet) {
    var random = utils.random();
    if (random < 0.5 && registerSet.calc.length > 0) {
        return exports.createCalculation(registerSet);
    } else {
        return exports.createOutput(registerSet);
    }
};

exports.INPUT = 'input';
exports.CONSTANT = 'const';
exports.CALCULATION = 'calc';
exports.OUTPUT = 'out';
exports.RegisterReference = RegisterReference;