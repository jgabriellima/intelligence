var utils = require('./../../infrastructure/utils');

var RegisterReference = function (flag, registerSet) {
    if (!registerSet[flag]) {
        throw "Property does not exist";
    }
    this.flag = flag;
    if (this.flag === exports.INPUT) {
        this.index = utils.randBetween(0, registerSet.inputRegisters.length);
    } else if (this.flag === exports.CONSTANT) {
        this.index = utils.randBetween(0, registerSet.constantRegisters.length);
    } else if (this.flag === exports.CALCULATION) {
        this.index = utils.randBetween(0, registerSet.calculationRegisters.length);
    } else {
        this.index = utils.randBetween(0, registerSet.outputRegisters.length);
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
    return "registerSet.{0}[{1}]".format(this.flag, this.index);
};

exports.RegisterReference = RegisterReference;
exports.INPUT = 'inputRegisters';
exports.CONSTANT = 'constantRegisters';
exports.CALCULATION = 'calculationRegisters';
exports.OUTPUT = 'outputRegisters';