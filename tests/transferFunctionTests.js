var intelligence = require('./../src/intelligence');
var utils = require('./../src/infrastructure/utils');

module.exports = {
    setUp: function (cb) {
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    hardLimit_whenInputIsGreaterThanZero_returnsOne: function (test) {
        var result = intelligence.transferFunctions.hardLimit(0.5);
        test.ok(utils.fpEqual(result, 1));
        test.done();
    },
    hardLimit_whenInputIsLessThanZero_returnsZero: function (test) {
        var result = intelligence.transferFunctions.hardLimit(-0.5);
        test.ok(utils.fpEqual(result, 0));
        test.done();
    },
    symetricalHardLimit_whenInputIsGreaterThanZero_returnsOne: function (test) {
        var result = intelligence.transferFunctions.symetricalHardLimit(0.5);
        test.ok(utils.fpEqual(result, 1));
        test.done();
    },
    symetricalHardLimit_whenInputIsLessThanZero_returnsMinusOne: function (test) {
        var result = intelligence.transferFunctions.symetricalHardLimit(-0.5);
        test.ok(utils.fpEqual(result, -1));
        test.done();
    },
    linear_whenCalled_returnsSameValue: function (test) {
        var result = intelligence.transferFunctions.linear(5);
        test.ok(utils.fpEqual(result, 5));
        test.done();
    },
    saturatingLinear_whenInputIsLessThanZero_returnsZero: function (test) {
        var result = intelligence.transferFunctions.saturatingLinear(-0.5);
        test.ok(utils.fpEqual(result, 0));
        test.done();
    },
    saturatingLinear_whenInputIsBetweenZeroAndOne_returnsSameValue: function (test) {
        var result = intelligence.transferFunctions.saturatingLinear(0.5);
        test.ok(utils.fpEqual(result, 0.5));
        test.done();
    },
    saturatingLinear_whenInputIsGreaterThanOne_returnsOne: function (test) {
        var result = intelligence.transferFunctions.saturatingLinear(1.5);
        test.ok(utils.fpEqual(result, 1));
        test.done();
    },
    logSigmoid_whenCalled_returnsCorrectValue: function (test) {
        var result = intelligence.transferFunctions.logSigmoid(0.5);
        test.ok(utils.fpEqual(result, 0.6224593312));
        test.done();
    },
    hyperbolicTangentSigmoid_whenCalled_returnsCorrectValue: function (test) {
        var result = intelligence.transferFunctions.hyperbolicTangentSigmoid(0.5);
        test.ok(utils.fpEqual(result, 0.46211715726));
        test.done();
    }
};