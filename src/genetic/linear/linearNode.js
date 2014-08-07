var RegisterReference = require('./registerReference').RegisterReference;
var utils = require('./../../infrastructure/utils');

var LinearNode = function(func, registerSet) {
    this.func = func;
    this.inputRegisters = null;
    this.setInputRegisters(registerSet);
};

LinearNode.prototype.setInputRegisters = function (registerSet) {
    var random = utils.random();
    var totalRegisters = registerSet.input.length + registerSet.readOnly.length + registerSet.readWrite.length;
    this.inputRegisters = [];
    for (var i = 0; i < this.func.length; i++) {
        var flag;
        if (random < registers.inputRegisters.length / totalRegisters) {
            flag = 'registers.inputRegisters';
        } else if (random < registers.constantRegisters.length / totalRegisters) {
            flag = 'registers.constantRegisters';
        } else if (random < registers.calculationRegisters.length / totalRegisters) {
            flag = 'registers.calculationRegisters';
        }
        else {
            
        }
        this.inputRegisters.push(new RegisterReference(flag, this.options.regiserSet));
};

LinearNode.prototype.getFuncReturnValue = function (registers) {
    var arguments = [];
    for (var i = 0; i < this.inputRegisters.length; i++) {
        arguments.push(this.inputRegisters[i].getValue(registers));
    }
    return this.func.apply(this, arguments);
};

LinearNode.prototype.getArgumentsString = function () {
    var arguments = "";
    for (var i = 0; i < this.inputRegisters.length; i++) {
        arguments += this.inputRegisters[i].toString();
        if (i !== this.inputRegisters.length - 1) {
            arguments += ", ";
        }
    }
    return arguments;
};

exports.LinearNode = LinearNode;