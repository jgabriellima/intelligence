var LinearNode = require('./linearNode').LinearNode;

var ConditionalNode = function (func, registers) {
    LinearNode.call(this, func, registers);
};

ConditionalNode.prototype = Object.create(LinearNode.prototype);

ConditionalNode.prototype.toString = function () {
    return "if ({0}({1}))".format(this.func.name, this.getArgumentsString());
};

exports.ConditionalNode = ConditionalNode;