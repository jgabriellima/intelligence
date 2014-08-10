var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (callback) {
        this.testFunction = function (a, b) {
            return a > b;
        };
        this.registerSet = new intelligence.RegisterSet({
            numInputs: 2,
            numOutputs: 1
        });
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    getFuncReturnValue_whenCalled_returnsCorrectValue: function (test) {
        var node = new intelligence.LinearConditionalNode(this.testFunction, this.registerSet);
        var inputA = node.inputRegisters[0];
        var inputB = node.inputRegisters[1];
        var expectedValue = inputA.getValue(this.registerSet) > inputB.getValue(this.registerSet);
        test.equal(node.getFuncReturnValue(this.registerSet), expectedValue);
        test.done();
    }
};