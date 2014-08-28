var proxyquire = require('proxyquire');
var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (cb) {
        this.utilsMock = {};
        this.selectionStrategies = proxyquire('./../src/genetic/selectionStrategies', {
            './../infrastructure/utils': this.utilsMock
        });
        this.population = new intelligence.Population({
            baseIndividual: new intelligence.Individual({
                minLength: 10,
                maxLength: 20,
                geneFactory: function () {
                    return Math.random();
                }
            }),
            crossoverStrategy: intelligence.crossoverStrategies.onePoint,
            fitnessFunction: function (individual) {
                return individual.body[0];
            },
            tournamentSize: 2
        });
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    random_whenCalled_returnsTwoIndividuals: function (test) {
        var selections = intelligence.selectionStrategies.random(this.population);
        test.equal(selections.length, 2);
        test.done();
    },
    rank_whenCalled_returnsTwoIndividuals: function (test) {
        var selections = intelligence.selectionStrategies.rank(this.population);
        test.equal(selections.length, 2);
        test.done();
    },
    rank_whenSelectionsAreKnown_returnsCorrectIndividuals: function (test) {
        this.utilsMock.random = (function () {
            var calls = 0;
            var f = function (individuals) {
                calls++;
                if (calls === 1) {
                    return 0.4;
                } else {
                    return 0.6;
                }
            };
            return f;
        }());
        var selections = this.selectionStrategies.rank(this.population);
        var runningTotal = 0;
        var sum = 0;
        for (var i = 0; i < this.population.individuals.length; i++) {
            sum += (i + 1);
        }
        var sortedIndividuals = this.population.individuals.sort(function (a, b) {
            return a.normalisedFitness - b.normalisedFitness;
        });
        var selectionA, selectionB, i;
        for (i = sortedIndividuals.length - 1; i >= 0; i--) {
            runningTotal += ((i + 1) / sum);
            if (runningTotal >= 0.4 && !selectionA) {
                selectionA = this.population.individuals[i];
            }
            if (runningTotal >= 0.6) {
                selectionB = this.population.individuals[i];
                break;
            }
        }
        test.ok(intelligence.utils.arrayEqual(selections[0].body, selectionA.body));
        test.ok(intelligence.utils.arrayEqual(selections[1].body, selectionB.body));
        test.done();
    },
    tournament_whenCalled_returnsTwoIndividuals: function (test) {
        var selections = intelligence.selectionStrategies.tournament(this.population);
        test.equal(selections.length, 2);
        test.done();
    },
    tournament_whenSelectionsAreKnown_returnsCorrectIndividuals: function (test) {
        this.utilsMock.selectRandom = (function () {
            var calls = 0;
            var f = function (individuals) {
                calls++;
                return individuals[calls];
            };
            return f;
        }());
        var selections = this.selectionStrategies.tournament(this.population);
        var expectedSelections = [];
        if (this.population.individuals[1].normalisedFitness > this.population.individuals[2].normalisedFitness) {
            expectedSelections.push(this.population.individuals[1]);
        } else {
            expectedSelections.push(this.population.individuals[2]);
        }
        if (this.population.individuals[3].normalisedFitness > this.population.individuals[4].normalisedFitness) {
            expectedSelections.push(this.population.individuals[3]);
        } else {
            expectedSelections.push(this.population.individuals[4]);
        }
        test.ok(intelligence.utils.arrayEqual(expectedSelections[0].body, selections[0].body));
        test.ok(intelligence.utils.arrayEqual(expectedSelections[1].body, selections[1].body));
        test.done();
    },
    rouletteWheel_whenCalled_returnsTwoIndividuals: function (test) {
        var selections = intelligence.selectionStrategies.rouletteWheel(this.population);
        test.equal(selections.length, 2);
        test.done();
    },
    rouletteWheel_whenSelectionsAreKnown_returnsCorrectIndividuals: function (test) {
        this.utilsMock.random = (function () {
            var calls = 0;
            var f = function (individuals) {
                calls++;
                if (calls === 1) {
                    return 0.4;
                } else {
                    return 0.6;
                }
            };
            return f;
        }());
        var selections = this.selectionStrategies.rouletteWheel(this.population);
        var runningTotal = 0;
        var sum = this.population.getSumNormalisedFitness();
        var selectionA, selectionB, foundA, i;
        for (i = 0; i < this.population.individuals.length; i++) {
            runningTotal += this.population.individuals[i].normalisedFitness / sum;
            if (runningTotal >= 0.4 && !foundA) {
                foundA = true;
                selectionA = this.population.individuals[i];
            }
            if (runningTotal >= 0.6) {
                selectionB = this.population.individuals[i];
                break;
            }
        }
        test.ok(intelligence.utils.arrayEqual(selections[0].body, selectionA.body));
        test.ok(intelligence.utils.arrayEqual(selections[1].body, selectionB.body));
        test.done();
    }
};