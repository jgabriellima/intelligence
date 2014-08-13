var registerReference = require('./registerReference');
var utils = require('./../../infrastructure/utils');

var LinearGPNode = function (func, registerSet) {
    this.func = func;
    this.inputRegisters = null;
    this.setInputRegisters(registerSet);
};

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

LinearGPNode.prototype.getFuncReturnValue = function (registerSet) {
    var arguments = [];
    for (var i = 0; i < this.inputRegisters.length; i++) {
        arguments.push(this.inputRegisters[i].getValue(registerSet));
    }
    return this.func.apply(this, arguments);
};

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