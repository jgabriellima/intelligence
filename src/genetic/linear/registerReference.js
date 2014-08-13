var utils = require('./../../infrastructure/utils');

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

RegisterReference.prototype.getValue = function (registerSet) {
    return registerSet[this.flag][this.index];
};

RegisterReference.prototype.setValue = function (registerSet, value) {
    if (this.flag !== exports.CALCULATION && this.flag !== exports.OUTPUT) {
        throw "only calculation or output registers can be set";
    } else {
        registerSet[this.flag][this.index] = value;
    }
    return this;
};

RegisterReference.prototype.toString = function () {
    return utils.formatString("registerSet.{0}[{1}]", [this.flag, this.index]);
};

exports.createInput = function (registerSet, index) {
    return new RegisterReference(exports.INPUT, registerSet, index);
};

exports.createConstant = function (registerSet, index) {
    return new RegisterReference(exports.CONSTANT, registerSet, index);
};

exports.createCalculation = function (registerSet, index) {
    return new RegisterReference(exports.CALCULATION, registerSet, index);
};

exports.createOutput = function (registerSet, index) {
    return new RegisterReference(exports.OUTPUT, registerSet, index);
};

exports.INPUT = 'input';
exports.CONSTANT = 'const';
exports.CALCULATION = 'calc';
exports.OUTPUT = 'out';
exports.RegisterReference = RegisterReference;