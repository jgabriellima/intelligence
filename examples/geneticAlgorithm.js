var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.Individual({
    minLength: 11,
    maxLength: 11,
    geneFactory: intelligence.binaryNumberGeneFactory
});

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.onePointFixedStrategy,
    fitnessFunction: function(individual) {
        var fitness = 0;
        for (var i=0; i < individual.body.length; i++) {
            fitness += individual.body[i];
        }
        return fitness;
    },
    elitism: 2
});

for (var i=0; i< 200; i++) {
    population.step();
    var best = population.getFittestIndividuals(1);
    console.log(best[0].body.join("") + "    " + population.getAverageFitness());
}