var utils = require('./../../infrastructure/utils');
var clone = require('clone');

/**
 * Linear genetic programming register set
 * @constructor
 * @param {object} options - Register set options
 * @param {number} options.numInputs - The number of input registers
 * @param {number} options.numOutputs - The number of output registers
 * @param {number} [options.constMin=1] - Minimum constant value
 * @param {number} [options.constMax=100] - Maxmimum constant value
 * @param {number} [options.constDivider=1] - Value to divide each constant value by
 * @param {number} [options.defaultCalculationValue=0] - Value to divide each constant value by
 * @param {number} [options.defaultOutputValue=0] - Value to divide each constant value by
 * @param {number} [options.numCalculationRegisters=5] - Value to divide each constant value by
 * @property {object[]} input - Input registers
 * @property {number[]} const - Constant registers
 * @property {number[]} calc - Calculation registers
 * @property {object[]} out - Output registers
 */
var RegisterSet = function (options) {
    this.options = options;
    this.input = [];
    this.const = [];
    this.calc = [];
    this.out = [];
    this.validate();
};

/**
 * Resets all registers
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.reset = function () {
    var i;
    this.input = [];
    this.const = [];
    this.calc = [];
    this.out = [];
    for (i = this.options.constMin; i < this.options.constMax; i++) {
        this.const.push(i / this.options.constDivider);
    }
    for (i = 0; i < this.options.numCalculationRegisters; i++) {
        this.calc.push(this.options.defaultCalculationValue);
    }
    for (i = 0; i < this.options.numOutputs; i++) {
        this.out.push(this.options.defaultOutputValue);
    }
    return this;
};

/**
 * Set the input registers
 * @param {object[]} inputs - An array of inputs
 * @throws An exception is thrown if the length of the input array does not match options.numInputs
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.setInputs = function (inputs) {
    if (inputs.length !== this.options.numInputs) {
        throw "length of inputs does not equal expected length";
    }
    this.reset();
    this.input = inputs;
    return this;
};

/**
 * Validates the register set
 * @throws An exception is thrown if validation fails
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.validate = function () {
    this.setDefaultOptionsIfNotProvided().validateRequiredOptions().validateOptions().reset();
};

/**
 * Throws an exception if a required option is missing
 * @throws An exception is thrown if a required option is missing
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.validateRequiredOptions = function () {
    if (!this.options) {
        throw "options are required";
    } else if (!this.options.numInputs) {
        throw "option 'numInputs is required";
    } else if (!this.options.numOutputs) {
        throw "option 'numOutputs' is required";
    }
    return this;
};

/**
 * Throws an exception if any option values are invalid
 * @throws An exception is thrown if any option values are invalid
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.validateOptions = function () {
    if (this.options.constMin > this.options.constMax) {
        throw "value for option 'constMin' cannot be greater than 'constMax'";
    }
    return this;
};

/**
 * Sets default values for options that have not been defined
 * @returns {RegisterSet} Reference to current object for chaining
 */
RegisterSet.prototype.setDefaultOptionsIfNotProvided = function () {
    if (this.options.constMin === undefined) {
        this.options.constMin = 1;
    }
    if (this.options.constMax === undefined) {
        this.options.constMax = 100;
    }
    if (this.options.constDivider === undefined) {
        this.options.constDivider = 1;
    }
    if (this.options.defaultCalculationValue === undefined) {
        this.options.defaultCalculationValue = 0;
    }
    if (this.options.defaultOutputValue === undefined) {
        this.options.defaultOutputValue = 0;
    }
    if (this.options.numCalculationRegisters === undefined) {
        this.options.numCalculationRegisters = 5;
    }
    return this;
};

/**
 * Returns a deep copy of the register set output array
 * @returns {object[]} A deep copy of the register set output array
 */
RegisterSet.prototype.getOutputNodes = function () {
    return clone(this.out);
};

/**
 * Returns the total number of writable registers
 * @returns {number} The total number of writable registers
 */
RegisterSet.prototype.getTotalWritableRegisters = function () {
    return this.calc.length + this.out.length;
};

exports.RegisterSet = RegisterSet;