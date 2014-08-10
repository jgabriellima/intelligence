var utils = require('./../../infrastructure/utils');
var LinearGPNode = require('./linearGPNode').LinearGPNode;
var registerReference = require('./registerReference');

var LinearFunctionNode = function (func, registerSet) {
    LinearGPNode.call(this, func, registerSet);
    this.targetRegister = null;
    this.setTargetRegister(registerSet);
};

LinearFunctionNode.prototype = Object.create(LinearGPNode.prototype);

LinearFunctionNode.prototype.setTargetRegister = function (registerSet) {
    var pCalulcation = registerSet.calculationRegisters.length / registerSet.getTotalWritableRegisters();
    if (utils.random() < pCalulcation) {
        this.targetRegister = new registerReference.RegisterReference(registerReference.CALCULATION, registerSet);
    } else {
        this.targetRegister = new registerReference.RegisterReference(registerReference.OUTPUT, registerSet);
    }
};

LinearFunctionNode.prototype.execute = function (registerSet) {
    this.targetRegister.setValue(registerSet, this.getFuncReturnValue(registerSet));
};

LinearFunctionNode.prototype.toString = function () {
    return "{0} = {1}({2});".format(this.targetRegister.toString(), this.func.name, this.getArgumentsString());
};

exports.LinearFunctionNode = LinearFunctionNode;