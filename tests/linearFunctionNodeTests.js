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
        console.log(JSON.stringify(inputA), JSON.stringify(inputB));
        var expectedValue = inputA.getValue(this.registerSet) + inputB.getValue(this.registerSet);
        node.execute(this.registerSet);
        test.equal(node.targetRegister.getValue(this.registerSet), expectedValue);
        test.done();
    }
};