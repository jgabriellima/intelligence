var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (callback) {
        this.testFunctionTwoArgs = function (a, b) {
            return a + b;
        };
        this.testFunctionThreeArgs = function (a, b, c) {
            return a + b + c;
        };
        this.registerSet = new intelligence.RegisterSet({
            numInputs: 3,
            numOutputs: 1
        });
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    linearGPNode_whenInitialised_inputRegistersAreSet: function (test) {
        var linearGPNode = new intelligence.LinearGPNode(this.testFunctionTwoArgs, this.registerSet);
        test.ok(linearGPNode.inputRegisters ? true : false);
        test.done();
    },
    LinearGPNode_whenFunctionTakesTwoArguments_twoInputRegistersCreated: function (test) {
        var linearGPNode = new intelligence.LinearGPNode(this.testFunctionTwoArgs, this.registerSet);
        test.equal(linearGPNode.inputRegisters.length, 2);
        test.done();
    },
    LinearGPNode_whenFunctionTakesThreeArguments_twoInputRegistersCreated: function (test) {
        var linearGPNode = new intelligence.LinearGPNode(this.testFunctionThreeArgs, this.registerSet);
        test.equal(linearGPNode.inputRegisters.length, 3);
        test.done();
    },
    getFuncReturnValue_whenCalled_returnsCorrectValue: function (test) {
        var linearGPNode = new intelligence.LinearGPNode(this.testFunctionTwoArgs, this.registerSet);
        var inputA = linearGPNode.inputRegisters[0];
        var inputB = linearGPNode.inputRegisters[1];
        var expectedValue = inputA.getValue(this.registerSet) + inputB.getValue(this.registerSet);
        test.equal(linearGPNode.getFuncReturnValue(this.registerSet), expectedValue);
        test.done();
    }
};