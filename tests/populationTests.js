var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (cb) {
        this.populationOptions = {
            baseIndividual: new intelligence.Individual({
                minLength: 10,
                maxLength: 20,
                geneFactory: function () {
                    return Math.random() < 0.5 ? 0 : 1;
                }
            }),
            crossoverStrategy: intelligence.crossoverStrategies.onePointFixed,
            fitnessFunction: function (individual) {
                var fitness = 0;
                for (var i = 0; i < individual.length; i++) {
                    fitness += individual.body[i];
                }
                return fitness;
            }
        };
        cb();
    },
    tearDown: function (cb) {
        this.populationOptions = null;
        cb();
    },
    population_initializeMissingOptions_throws: function (test) {
        test.throws(function () {
            var x = Object.create(intelligence.Population).ctor();
        });
        test.done();
    },
    population_initializeMissingDefaultOptions_setsDefaultOptionValues: function (test) {
        var population = new intelligence.Population(this.populationOptions);
        test.ok(population.options.populationSize ? true : false);
        test.ok(population.options.crossoverRate ? true : false);
        test.ok(population.options.mutationRate ? true : false);
        test.ok(population.options.tournamentSize ? true : false);
        test.ok(population.options.selectionStrategy ? true : false);
        test.ok(true);
        test.done();
    },
    population_initializeWithPopulationSize_populationSizeIsCorrect: function (test) {
        var expectedPopulationSize = 100;
        this.populationOptions.populationSize = expectedPopulationSize;
        var population = new intelligence.Population(this.populationOptions);
        test.equal(population.individuals.length, expectedPopulationSize);
        test.done();
    },
    population_initializeValidOptions_initializesIndividuals: function (test) {
        var population = new intelligence.Population(this.populationOptions);
        test.ok(population.individuals ? true : false);
        test.done();
    },
    evaluateFitness_whenCalled_setsFitnessValues: function (test) {
        var population = new intelligence.Population(this.populationOptions);
        population.evaluateFitness();
        var success = true;
        for (var i = 0; i < population.individuals.length; i++) {
            if (population.individuals[i].fitness === null) {
                success = false;
                break;
            }
        }
        test.ok(success);
        test.done();
    }
};