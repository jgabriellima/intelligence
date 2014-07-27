var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.GPTreeIndividual({
    maxDepth: 5
});

var fitnessFunction = function (individual) {
    return Math.abs(individual.evaluate() - 100);
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    fitnessFunction: fitnessFunction,
    crossoverStrategy: intelligence.onePointTreeStrategy,
    elitism: 2,
    populationSize: 75,
    tournamentSize: 2,
});

// this function is called each time a generation completes
var generationCompleted = function (generationNumber, population) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].body;
        console.log("Gen: " + generationNumber + ", best: " + best.getExecutableCode());
    }
};

// this function is called when training completes
var trainCompleted = function (population) {
    var best = population.getFittestIndividuals(1)[0].body;
    console.log("Training completed, best: " + best.join(''));
};

// train the population over 100 generations
population.train(100, generationCompleted, trainCompleted);