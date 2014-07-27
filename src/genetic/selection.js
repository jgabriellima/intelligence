var utils = require('./../infrastructure/utils');

exports.randomSelectionStrategy = function (chromosomes, options) {
    var selections = [chromosomes[utils.randBetween(0, chromosomes.length)]];
    while (true) {
        var spouse = chromosomes[utils.randBetween(0, chromosomes.length)];
        if (spouse !== selections[0]) {
            selections.push(spouse);
            break;
        }
    }
    return selections;
}

exports.rankSelectionStrategy = function (chromosomes, options) {
    throw "not implemented";
}

exports.tournamentSelectionStrategy = function (chromosomes, options) {
    var selections = [];
    for (var i = 0; i < 2; i++) {
        var tournament = [];
        for (var j = 0; j < options.tournamentSize; j++) {
            while (true) {
                var selection = chromosomes[utils.randBetween(0, chromosomes.length)];
                for (var k = 0; k < tournament.length; k++) {
                    if (selection === tournament[k]) {
                        continue;
                    }
                }
                tournament.push(selection);
                break;
            }
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
}

exports.rouletteWheelSelectionStrategy = function (chromosomes, options) {
    throw "not implemented";
}