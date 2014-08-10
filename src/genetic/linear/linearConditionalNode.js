var LinearGPNode = require('./linearGPNode').LinearGPNode;
var utils = require('./../../infrastructure/utils');

var LinearConditionalNode = function (func, registers) {
    LinearGPNode.call(this, func, registers);
};

utils.inherits(LinearConditionalNode, LinearGPNode);

LinearConditionalNode.prototype.toString = function () {
    return utils.formatString("if ({0}({1}))", [this.func.name, this.getArgumentsString()]);
};

LinearConditionalNode.prototype.execute = function (registerSet) {
    return this.getFuncReturnValue(registerSet);
};

exports.LinearConditionalNode = LinearConditionalNode;