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
            var r = new registerReference.RegisterReference(this.registerSet, 'doesnotexist');
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
        var r = new registerReference.RegisterReference(registerReference.CALCULATION, this.registerSet);
        r.setValue(this.registerSet, newValue);
        test.equal(r.getValue(this.registerSet), newValue);
        test.done();
    },
    createInput_whenCalled_returnsInputRegisterReference: function (test) {
        var r = registerReference.createInput(this.registerSet);
        test.equal(r.flag, registerReference.INPUT);
        test.done();
    },
    createConstant_whenCalled_returnsConstantRegisterReference: function (test) {
        var r = registerReference.createConstant(this.registerSet);
        test.equal(r.flag, registerReference.CONSTANT);
        test.done();
    },
    createCalculation_whenCalled_returnsCalculationRegisterReference: function (test) {
        var r = registerReference.createCalculation(this.registerSet);
        test.equal(r.flag, registerReference.CALCULATION);
        test.done();
    },
    createOutput_whenCalled_returnsOutputRegisterReference: function (test) {
        var r = registerReference.createOutput(this.registerSet);
        test.equal(r.flag, registerReference.OUTPUT);
        test.done();
    }
};