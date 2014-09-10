
/**
 * Performs hard limit transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} 1 if the input is greater than 0, else 0
 */
exports.hardLimit = function (input) {
    return input >= 0 ? 1 : 0;
};

/**
 * Performs symetrical hard limit transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} 1 if the input is greater than 0, else -1
 */
exports.symetricalHardLimit = function (input) {
    return input >= 0 ? 1 : -1;
};

/**
 * Performs linear transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} The same, un modified value provided as input
 */
exports.linear = function (input) {
    return input;
};

/**
 * Performs saturating linear transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} The same value if between 0 and 1, otherwise 0 or 1 respectively
 */
exports.saturatingLinear = function (input) {
    if (input < 0) {
        return 0;
    } else if (input > 1) {
        return 1;
    } else {
        return input;
    }
};

/**
 * Performs log sigmoid transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} The log sigmoid of the input value
 */
exports.logSigmoid = function (input) {
    return 1 / (1 + Math.exp(-input))
};

/**
 * Performs hyperbolic tangent sigmoid transfer
 * @param {number} input - Sum of neuron weighted inputs
 * @returns {number} The hyperbolic tangent sigmoid of the input value
 */
exports.hyperbolicTangentSigmoid = function (input) {
    return (Math.exp(input) - Math.exp(-input)) / (Math.exp(input) + Math.exp(-input));
};