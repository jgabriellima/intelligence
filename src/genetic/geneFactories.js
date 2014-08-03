var utils = require('./../infrastructure/utils');

exports.number = function () {
    return utils.random();
};

exports.binaryNumber = function () {
    return utils.random() < 0.5 ? 0 : 1;
};

exports.binaryString = function () {
    return utils.random() < 0.5 ? '0' : '1';
};

exports.alphabet = function () {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '.split('');
    return letters[utils.randBetween(0, letters.length)];
};