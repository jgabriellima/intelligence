var RegisterSet = require('./../src/genetic/linear/registerSet').RegisterSet;
var registerReference = require('./../src/genetic/linear/registerReference');

module.exports = {
    setUp: function (cb) {
        this.registerSet = new RegisterSet({
            numInputs: 5,
            numOutputs: 5
        });
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    registerReference_propertyDoesNotExist_throws: function (test) {
        test.throws(function () {
            var r = new registerReference.RegisterReference('doesnotexist', this.registerSet);
        });
        test.done();
    },
    getValue_whenIsInput_returnsInputValue: function (test) {
        var r = new registerReference.RegisterReference(registerReference.INPUT, this.registerSet);
        var expectedValue = this.registerSet.input[r.index];
        test.equal(r.getValue(this.registerSet), expectedValue);
        test.done();
    },
    getValue_whenIsConstant_returnsConstantValue: function (test) {
        var r = new registerReference.RegisterReference(registerReference.CONSTANT, this.registerSet);
        var expectedValue = this.registerSet.const[r.index];
        test.equal(r.getValue(this.registerSet), expectedValue);
        test.done();
    },
    getValue_whenIsCalculation_returnsCalculationValue: function (test) {
        var r = new registerReference.RegisterReference(registerReference.CALCULATION, this.registerSet);
        var expectedValue = this.registerSet.calc[r.index];
        test.equal(r.getValue(this.registerSet), expectedValue);
        test.done();
    },
    getValue_whenIsOutput_returnsOutputValue: function (test) {
        var r = new registerReference.RegisterReference(registerReference.OUTPUT, this.registerSet);
        var expectedValue = this.registerSet.out[r.index];
        test.equal(r.getValue(this.registerSet), expectedValue);
        test.done();
    },
    setValue_whenIsInput_throws: function (test) {
        var newValue = 12345;
        var r = new registerReference.RegisterReference(registerReference.INPUT, this.registerSet);
        test.throws(function () {
            r.setValue(this.registerSet, newValue);
        });
        test.done();
    },
    setValue_whenIsConstant_throws: function (test) {
        var newValue = 12345;
        var r = new registerReference.RegisterReference(registerReference.CONSTANT, this.registerSet);
        test.throws(function () {
            r.setValue(this.registerSet, newValue);
        });
        test.done();
    },
    setValue_whenIsCalulcation_setsCalculationValue: function (test) {
        var newValue = 12345;
        var r = new registerReference.RegisterReference(registerReference.CALCULATION, this.registerSet);
        r.setValue(this.registerSet, newValue);
        test.equal(r.getValue(this.registerSet), newValue);
        test.done();
    },
    setValue_whenIsOutput_setsOutputValue: function (test) {
        var newValue = 12345;
        var r = new registerReference.RegisterReference(registerReference.OUTPUT, this.registerSet);
        r.setValue(this.registerSet, newValue);
        test.equal(r.getValue(this.registerSet), newValue);
        test.done();
    }
};