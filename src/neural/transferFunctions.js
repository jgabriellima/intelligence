exports.hardLimit = function (input) {
    return input >= 0 ? 1 : 0;
};

exports.symetricalHardLimit = function (input) {
    return input >= 0 ? 1 : -1;
};

exports.linear = function (input) {
    return input;
};

exports.saturatingLinear = function (input) {
    if (input < 0) {
        return 0;
    } else if (input > 1) {
        return 1;
    } else {
        return input;
    }
};

exports.logSigmoid = function (input) {
    return 1 / (1 + Math.exp(-input))
};

exports.hyperbolicTangentSigmoid = function (input) {
    return (Math.exp(input) - Math.exp(-input)) / (Math.exp(input) + Math.exp(-input));
};