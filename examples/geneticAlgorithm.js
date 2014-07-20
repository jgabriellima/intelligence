var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.Individual({
    minLength: 12,
    maxLength: 12,
    geneFactory: intelligence.alphabetGeneFactory
});

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

for (var i=0; i< 100; i++) {
    population.step();
    if (i % 10 === 0) {
        var best = population.getFittestIndividuals(1);
        console.log("Generation: " + i + " | " + best[0].body.join(""));
    }
}