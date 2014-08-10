var utils = require('./../../infrastructure/utils');
var LinearGPNode = require('./linearGPNode').LinearGPNode;
var registerReference = require('./registerReference');

var LinearFunctionNode = function (func, registerSet) {
    LinearGPNode.call(this, func, registerSet);
    this.targetRegister = null;
    this.setTargetRegister(registerSet);
};

utils.inherits(LinearFunctionNode, LinearGPNode);

LinearFunctionNode.prototype.setTargetRegister = function (registerSet) {
    var pCalulcation = registerSet.calc.length / registerSet.getTotalWritableRegisters();
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
    var argumentsArray = [this.targetRegister.toString(), this.func.name, this.getArgumentsString()];
    return utils.formatString("{0} = {1}({2});", argumentsArray);
};

exports.LinearFunctionNode = LinearFunctionNode;