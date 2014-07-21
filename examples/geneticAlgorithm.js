var intelligence = require('./../src/intelligence');

// creqte an individual whos body is a fixed length of 12
// geneFactory returns a random letter in the alphabet
var baseIndividual = new intelligence.Individual({
    minLength: 12,
    maxLength: 12,
    geneFactory: intelligence.alphabetGeneFactory
});

// create a population of individuals using the baseIndividual
// fitness function rewards individuals the closer they are to 'hello world'
var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.onePointFixedStrategy,
    fitnessFunction: function(individual) {
        var fitness = 0;
        var targetString = "Hello World";
        for (var i=0; i < individual.body.length; i++) {
            if (individual.body[i] === targetString.charAt(i)) {
                fitness++;
            }
        }
        return fitness;
    },
    elitism: 2,
    populationSize: 75,
    tournamentSize: 2,
});

// train the population over 100 generations
for (var i=0; i< 100; i++) {
    population.step();
    if (i % 10 === 0) {
        var best = population.getFittestIndividuals(1);
        console.log("Generation: " + i + " | " + best[0].body.join(""));
    }
}
