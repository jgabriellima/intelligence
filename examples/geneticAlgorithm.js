var intelligence = require('./../src/intelligence');

// creqte an individual whos body is a fixed length of 12
// geneFactory returns a random letter in the alphabet
var baseIndividual = new intelligence.Individual({
    minLength: 12,
    maxLength: 12,
    geneFactory: intelligence.alphabetGeneFactory
});

var fitnessFunction = function (individual) {
    var fitness = 0;
    var targetString = "Hello World";
    for (var i = 0; i < individual.body.length; i++) {
        if (individual.body[i] === targetString.charAt(i)) {
            fitness++;
        }
    }
    return fitness;
};

// create a population of individuals using the baseIndividual
// fitness function rewards individuals the closer they are to 'hello world'
var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.onePointFixedStrategy,
    fitnessFunction: fitnessFunction,
    elitism: 2,
    populationSize: 75,
    tournamentSize: 2,
});


// this function is called each time a generation completed
var generationCompleted = function(generationNumber, population) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].body;
        console.log("Gen: " + generationNumber + ", best: " + best.join(''));
    }
};

// this function is called when training completes
var trainCompleted = function(population) {
    var best = population.getFittestIndividuals(1)[0].body;
    console.log("Training completed, best: " + best.join(''));
};

// train the population over 100 generations
population.train(100, generationCompleted, trainCompleted);