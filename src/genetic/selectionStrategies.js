var utils = require('./../infrastructure/utils');

exports.random = function (individuals, options) {
    var selections = [individuals[utils.randBetween(0, individuals.length)]];
    while (true) {
        var spouse = individuals[utils.randBetween(0, individuals.length)];
        if (spouse !== selections[0]) {
            selections.push(spouse);
            break;
        }
    }
    return selections;
};

exports.rank = function (individuals, options) {
    throw "not implemented";
};

exports.tournament = function (individuals, options) {
    var selections = [];
    for (var i = 0; i < 2; i++) {
        var tournament = [];
        for (var j = 0; j < options.tournamentSize; j++) {
            var selection = individuals[utils.randBetween(0, individuals.length)];
            tournament.push(selection);
        }
        var winner = tournament[0];
        if (options.minimise) {
            for (var j = 1; j < tournament.length; j++) {
                if (tournament[j].fitness < winner.fitness) winner = tournament[j];
            }
        } else {
            for (var j = 1; j < tournament.length; j++) {
                if (tournament[j].fitness > winner.fitness) winner = tournament[j]
            }
        }
        selections.push(winner);
    }
    return selections;
};

exports.rouletteWheel = function (individuals, options) {
    throw "not implemented";
};