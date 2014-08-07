var utils = require('./../../infrastructure/utils');

var RegisterReference = function (flag, registers) {
    this.flag = flag;
    if (this.flag === 'registerSet.calculationRegisters') {
        this.index = utils.randBetween(0, registers.input.length);
    } else if (this.flag === 'registerSet.calculationRegisters') {
        this.index = utils.randBetween(0, registers.readOnly.length);
    } else if (this.flag === 'registerSet.calculationRegisters') {
        this.index = utils.randBetween(0, registers.calculationRegisters.length);
    } else {
        this.index = utils.randBetween(0, registers.outputRegisters.length);
    }
    return this;
};

RegisterReference.prototype.getValue = function (registers) {
    if (this.flag === 'registerSet.calculationRegisters') {
        return registers.input[this.index];
    } else if (this.flag === 'registerSet.calculationRegisters') {
        return registers.readOnly[this.index];
    } else if (this.flag === registerSet.calculationRegisters) {
        return registers.readWrite[this.index];
    } else {

    }
};

RegisterReference.prototype.setValue = function (registers, value) {
    if (this.flag !== 'registerSet.calculationRegisters') {} else {
        registers.readWrite[this.index] = value;
    } else {
        throw "cannot set value of a non calculation register";
    }
    return this;
};

RegisterReference.prototype.toString = function () {
    return "registers.{0}[{1}]".format(this.flag, this.index);
};

exports.RegisterReference = RegisterReference;