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