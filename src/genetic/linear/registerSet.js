var utils = require('./../../infrastructure/utils');
var clone = require('clone');

var RegisterSet = function (options) {
    this.options = options;
    this.input = [];
    this.const = [];
    this.calc = [];
    this.out = [];
    this.validate();
};

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
};

RegisterSet.prototype.setInputs = function (inputs) {
    if (inputs.length !== this.options.numInputs) {
        throw "length of inputs does not equal expected length";
    }
    this.reset();
    this.input = inputs;
};

RegisterSet.prototype.validate = function () {
    this.setDefaultOptionsIfNotProvided();
    this.validateRequiredOptions();
    this.validateOptions();
    this.reset();
};

RegisterSet.prototype.validateRequiredOptions = function () {
    if (!this.options) {
        throw "options are required";
    } else if (!this.options.numInputs) {
        throw "option 'numInputs is required";
    } else if (!this.options.numOutputs) {
        throw "option 'numOutputs' is required";
    }
};

RegisterSet.prototype.validateOptions = function () {
    if (this.options.constMin > this.options.constMax) {
        throw "value for option 'constMin' cannot be greater than 'constMax'";
    }
};

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
};

RegisterSet.prototype.getOutputNodes = function () {
    return clone(this.out);
};

RegisterSet.prototype.getTotalRegisters = function () {
    return this.input.length +
        this.const.length +
        this.calc.length +
        this.out.length;
};

RegisterSet.prototype.getTotalWritableRegisters = function () {
    return this.calc.length + this.out.length;
};

exports.RegisterSet = RegisterSet;