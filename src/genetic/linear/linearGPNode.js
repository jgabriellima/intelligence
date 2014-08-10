var registerReference = require('./registerReference');
var utils = require('./../../infrastructure/utils');

var LinearGPNode = function (func, registerSet) {
    this.func = func;
    this.inputRegisters = null;
    this.setInputRegisters(registerSet);
};

LinearGPNode.prototype.setInputRegisters = function (registerSet) {
    var random = utils.random();
    var totalRegisters = registerSet.getTotalRegisters();
    this.inputRegisters = [];
    for (var i = 0; i < this.func.length; i++) {
        var flag;
        if (random < registerSet.inputRegisters.length / totalRegisters) {
            flag = registerReference.INPUT;
        } else if (random < registerSet.constantRegisters.length / totalRegisters) {
            flag = registerReference.CONSTANT;
        } else if (random < registerSet.calculationRegisters.length / totalRegisters) {
            flag = registerReference.CALCULATION;
        } else {
            flag = registerReference.OUTPUT;
        }
        this.inputRegisters.push(new registerReference.RegisterReference(flag, registerSet));
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