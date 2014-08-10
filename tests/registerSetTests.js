var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (cb) {
        this.registerSetOptions = {
            numInputs: 5,
            numOutputs: 5
        };
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    registerSet_whenOptionsMissing_throws: function (test) {
        test.throws(function () {
            var x = new intelligence.RegisterSet();
        });
        test.done();
    },
    registerSet_whenNumInputsIsZero_throws: function (test) {
        this.registerSetOptions.numInputs = 0;
        test.throws(function () {
            var x = new intelligence.RegisterSet(this.registerSetOptions);
        });
        test.done();
    },
    registerSet_whenNumOutputsIsZero_throws: function (test) {
        this.registerSetOptions.numOutputs = 0;
        test.throws(function () {
            var x = new intelligence.RegisterSet(this.registerSetOptions);
        });
        test.done();
    },
    registerSet_whenConstMinIsGreaterThanConstMax_throws: function (test) {
        this.registerSetOptions.constMin = 2;
        this.registerSetOptions.constMax = 1;
        test.throws(function () {
            var x = new intelligence.RegisterSet(this.registerSetOptions);
        });
        test.done();
    },
    registerSet_whenDefaultOptionsMissing_setsDefaultOptions: function (test) {
        var x = new intelligence.RegisterSet(this.registerSetOptions);
        test.ok(x.options.constMin !== undefined);
        test.ok(x.options.constMax !== undefined);
        test.ok(x.options.constDivider !== undefined);
        test.ok(x.options.defaultCalculationValue !== undefined);
        test.ok(x.options.defaultOutputValue !== undefined);
        test.ok(x.options.numCalculationRegisters !== undefined);
        test.done();
    },
    setInputs_whenLengthIsIncorrect_throws: function (test) {
        var x = new intelligence.RegisterSet(this.registerSetOptions);
        test.throws(function () {
            x.setInputs([1, 2, 3]);
        });
        test.done();
    },
    setInputs_whenLengthIsCorrect_setsInputs: function (test) {
        var inputs = [1, 2, 3, 4, 5];
        var x = new intelligence.RegisterSet(this.registerSetOptions);
        x.setInputs(inputs);
        test.equal(x.inputRegisters, inputs);
        test.done();
    }
};