var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (callback) {
        this.testFunction = function (a, b) {
            return a + b;
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
    linearFunctionNode_whenInitialized_setsTargetRegister: function (test) {
        var node = new intelligence.LinearFunctionNode(this.testFunction, this.registerSet);
        test.ok(node.targetRegister ? true : false);
        test.done();
    },
    execute_whenCalled_targetRegisterReflectsNewValue: function (test) {
        var node = new intelligence.LinearFunctionNode(this.testFunction, this.registerSet);
        var inputA = node.inputRegisters[0];
        var inputB = node.inputRegisters[1];
        var expectedValue = inputA.getValue(this.registerSet) + inputB.getValue(this.registerSet);
        node.execute(this.registerSet);
        var returnValue = node.targetRegister.getValue(this.registerSet)
        test.ok(returnValue === expectedValue || (isNaN(returnValue) && isNaN(expectedValue)));
        test.done();
    }
};