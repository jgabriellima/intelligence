exports.randBetween = function(min, max) {
    var val = Math.floor(Math.random()*(max-min+1)+min);
    return val === max ? val - 1 : val;
};

exports.random = function() {
    return Math.random();
};