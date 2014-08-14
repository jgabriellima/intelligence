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
    },
    filterNanFitness_whenCalled_convertsNanFitnessToZero: function (test) {
        var population = new intelligence.Population(this.populationOptions);
        population.individuals[0].fitness = Number.NaN;
        population.individuals[1].fitness = Number.NaN;
        population.filterNanFitness();
        test.ok(!isNaN(population.individuals[0].fitness));
        test.ok(!isNaN(population.individuals[1].fitness));
        test.done();
    },
    getFittestIndividuals_whenOneIndividualIsRequested_returnsFittestIndividual: function (test) {
        var population = new intelligence.Population(this.populationOptions);
        var returnedIndividual = population.getFittestIndividuals(1)[0];
        var fittest = population.individuals[0];
        for (var i = 1; i < population.individuals.length; i++) {
            if (population.individuals[i].fitness > fittest.fitness) {
                fittest = population.individuals[i];
            }
        }
        test.equal(fittest.fitness, returnedIndividual.fitness);
        test.done();
    },
    getFittestIndividuals_whenOneIndividualIsRequestedMinimise_returnsFittestIndividual: function (test) {
        this.populationOptions.isMinimise = true;
        var population = new intelligence.Population(this.populationOptions);
        var returnedIndividual = population.getFittestIndividuals(1)[0];
        var fittest = population.individuals[0];
        for (var i = 1; i < population.individuals.length; i++) {
            if (population.individuals[i].fitness < fittest.fitness) {
                fittest = population.individuals[i];
            }
        }
        test.equal(fittest.fitness, returnedIndividual.fitness);
        test.done();
    }
};