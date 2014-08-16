var util = require('util');

/**
 * Returns a random whole number between a specified range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns A random whole number between a specified range
 */
exports.randBetween = function (min, max) {
    var val = Math.floor(Math.random() * (max - min + 1) + min);
    return val === max ? val - 1 : val;
};

/**
 * Returns a random number between 0 and 1
 * @returns A random number between 0 and 1
 */
exports.random = function () {
    return Math.random();
};

/**
 * Returns a randomly selected element from an array
 * @param {array} from - An array to select an element from
 * @returns A randomly selected element from the provided array
 */
exports.selectRandom = function (from) {
    return from[exports.randBetween(0, from.length)];
};

/**
 * Performs floating point comparison between two numbers with an epsilon of 0.00001
 * @param {number} a - The first number to compare
 * @param {number} b - The second number to compare
 * @returns {boolean} True if the provided numbers are equal, otherwise false
 */
exports.fpEqual = function (a, b) {
    return (a - b) <= 0.00001;
};

/**
 * Compares two arrays by each element
 * @param {array} a - The first array to compare
 * @param {array} b - The second array to compare
 * @returns {boolean} True if the provided arrays are equal, otherwise false
 */
exports.arrayEqual = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

/**
 * Replaces each tag in the provided string with its corresponding parameter element
 * @param {string} stringVar - String to convert
 * @param {array} argsArray - An array of arguments
 * @returns {string} Converted string
 */
exports.formatString = function (stringVar, argsArray) {
    return stringVar.replace(/{(\d+)}/g, function (match, number) {
        return typeof argsArray[number] != 'undefined' ? argsArray[number] : match;
    });
};

/**
 * Calls nodes util.inherits function
 */
exports.inherits = function (constructor, superConstructor) {
    util.inherits(constructor, superConstructor);
};