var intelligence = require('./../src/intelligence');

// Create an individual whos body is a fixed length of 12
// geneFactories.alphabet returns a random letter in the alphabet.
// Each individual in the population will be modeled on this individual.
var individual = new intelligence.Individual({
    minLength: 11,
    maxLength: 11,
    geneFactory: intelligence.geneFactories.alphabet
});

// Create a fitness function that, when given an individual,
// returns a value that represents the strength of this individual
// as a solution to our target problem. In this case we are
// rewarding individuals the closer their body is to the
// string 'Hello World'.
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

// create a population using the individual created above as the baseIndividual.
// crossoverStrategies.twoPointFixed performs two point crossover on 
// individuals whos length is fixed.
var population = new intelligence.Population({
    baseIndividual: individual,
    crossoverStrategy: intelligence.crossoverStrategies.twoPointFixed,
    fitnessFunction: fitnessFunction,
    elitism: 2,
    populationSize: 500,
    tournamentSize: 2,
});

// this function is called each time a single generation has completed
var generationCompleted = function (population, generationNumber) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].body;
        console.log("Gen: " + generationNumber + ", best: " + best.join(''));
    }
};

// this function is called when training completes
var trainingCompleted = function (population) {
    var best = population.getFittestIndividuals(1)[0].body;
    console.log("Training completed, best: " + best.join(''));
};

population.on('generationCompleted', generationCompleted);
population.on('trainingCompleted', trainingCompleted);

// train the population over 100 generations
population.train(100);