var LinearGPNode = require('./linearGPNode').LinearGPNode;

var LinearConditionalNode = function (func, registers) {
    LinearGPNode.call(this, func, registers);
};

LinearConditionalNode.prototype = Object.create(LinearGPNode.prototype);

LinearConditionalNode.prototype.toString = function () {
    return "if ({0}({1}))".format(this.func.name, this.getArgumentsString());
};

LinearConditionalNode.prototype.execute = function (registerSet) {
    return this.getFuncReturnValue(registerSet);
};

exports.LinearConditionalNode = LinearConditionalNode;