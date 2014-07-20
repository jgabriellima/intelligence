var utils = require('./../infrastructure/utils');

exports.numberGeneFactory = function() {
    return utils.random();
};

exports.binaryNumberGeneFactory = function() {
    return utils.random() < 0.5 ? 0 : 1;
};

exports.binaryStringGeneFactory = function() {
    return utils.random() < 0.5 ? '0' : '1';
};

exports.alphabetGeneFactory = function() {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '.split('');
    return letters[utils.randBetween(0, letters.length)];
};