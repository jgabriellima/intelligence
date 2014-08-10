var utils = require('./../../infrastructure/utils');

var RegisterReference = function (flag, registerSet) {
    if (!registerSet[flag]) {
        throw "Property does not exist";
    }
    this.flag = flag;
    if (this.flag === exports.INPUT) {
        this.index = utils.randBetween(0, registerSet.input.length);
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

exports.RegisterReference = RegisterReference;
exports.INPUT = 'input';
exports.CONSTANT = 'const';
exports.CALCULATION = 'calc';
exports.OUTPUT = 'out';