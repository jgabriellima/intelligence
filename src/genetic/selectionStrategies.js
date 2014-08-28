var utils = require('./../infrastructure/utils');

/**
 * Returns two randomly selected individuals
 * @param {Individual[]} individuals - An array of individuals
 * @param {object} options - Population options
 */
exports.random = function (population) {
    var individuals = population.individuals;
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

/**
 * Returns two individuals using the rank selection algorithm
 * @param {Population} population - A population instance
 */
exports.rank = function (population) {
    var a = utils.random();
    var b = utils.random();
    var selectionA, selectionB;
    var runningTotal = 0;
    var numIndividuals = population.individuals.length;
    var sum = (numIndividuals * (numIndividuals + 1)) / 2;
    var individuals = population.individuals.sort(function (a, b) {
        return a.normalisedFitness - b.normalisedFitness;
    });
    for (var i = individuals.length - 1; i >= 0; i--) {
        runningTotal += ((i + 1) / sum);
        if (runningTotal >= a && !selectionA) {
            selectionA = individuals[i];
        }
        if (runningTotal >= b && !selectionB) {
            selectionB = individuals[i];
        }
        if (selectionA && selectionB) {
            break;
        }
    }
    return [selectionA, selectionB];
};

/**
 * Returns two individuals using the tournament selection algorithm
 * @param {Population} population - A population instance
 */
exports.tournament = function (population) {
    var selections = [];
    var individuals = population.individuals;
    for (var i = 0; i < 2; i++) {
        var tournament = [];
        for (var j = 0; j < population.options.tournamentSize; j++) {
            var selection = utils.selectRandom(population.individuals);
            tournament.push(selection);
        }
        var winner = tournament[0];
        for (var j = 1; j < tournament.length; j++) {
            if (tournament[j].normalisedFitness > winner.normalisedFitness) winner = tournament[j];
        }
        selections.push(winner);
    }
    return selections;
};

/**
 * Returns two individuals using the roulette wheel selection algorithm
 * @param {Population} population - A population instance
 */
exports.rouletteWheel = function (population) {
    var selections = [];
    var a = utils.random();
    var b = utils.random();
    var runningTotal = 0;
    var selectionA, selectionB;
    var sum = population.getSumNormalisedFitness();
    for (var i = 0; i < population.individuals.length; i++) {
        var individual = population.individuals[i];
        runningTotal += individual.normalisedFitness / sum;
        if (runningTotal > a && !selectionA) {
            selectionA = individual;
        }
        if (runningTotal >= b && !selectionB) {
            selectionB = individual;
        }
        if (selectionA && selectionB) {
            break;
        }
    }
    return [selectionA, selectionB];
};