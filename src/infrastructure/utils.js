var util = require('util');

exports.randBetween = function (min, max) {
    var val = Math.floor(Math.random() * (max - min + 1) + min);
    return val === max ? val - 1 : val;
};

exports.random = function () {
    return Math.random();
};

exports.selectRandom = function (from) {
    return from[exports.randBetween(0, from.length)];
};

exports.fpEqual = function (a, b) {
    return (a - b) <= 0.000001;
};

exports.arrayEqual = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

exports.formatString = function (stringVar, argsArray) {
    return stringVar.replace(/{(\d+)}/g, function (match, number) {
        return typeof argsArray[number] != 'undefined' ? argsArray[number] : match;
    });
};

exports.inherits = function (constructor, superConstructor) {
    util.inherits(constructor, superConstructor);
};