var LinearNode = require('./linearNode').LinearNode;
var RegisterReference = require('./registerReference').RegisterReference;

var FunctionNode = function (func, registers) {
    LinearNode.call(this, func, registers);
    this.targetRegister = null;
    this.setTargetRegister(registers);
};

FunctionNode.prototype = Object.create(LinearNode.prototype);

FunctionNode.prototype.setTargetRegister = function (registers) {
    this.targetRegister = Object.create(RegisterReference).ctor('readWrite', registers);
};

FunctionNode.prototype.execute = function (registers) {
    this.targetRegister.setValue(registers, this.getFuncReturnValue(registers));
};

FunctionNode.prototype.toString = function () {
    return "{0} = {1}({2});".format(this.targetRegister.toString(), this.func.name, this.getArgumentsString());
};

exports.FunctionNode = FunctionNode;