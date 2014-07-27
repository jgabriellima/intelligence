var intelligence = require('./../src/intelligence');
var utils = require('./../src/infrastructure/utils');

module.exports = {
    setUp: function (callback) {
        this.individualA = new intelligence.Individual({
            minLength: 10,
            maxLength: 10,
            geneFactory: intelligence.geneFactories.alphabet
        });
        this.variableA = new intelligence.Individual({
            minLength: 10,
            maxLength: 20,
            geneFactory: intelligence.geneFactories.alphabet
        });
        this.individualB = this.individualA.createNew();
        this.variableB = this.variableA.createNew();
        callback();
    },
    tearDown: function (callback) {
        this.individualA = null;
        this.individualB = null;
        callback();
    },
    onePointFixed_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = intelligence.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        test.ok(utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    onePointFixed_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = intelligence.crossoverStrategies.onePointFixed([this.variableA, this.variableB]);
        });
        test.done();
    },
    onePointFixed_whenCalled_offspringHaveChanged: function (test) {
        var offspring = intelligence.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        test.ok(!utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },

    twoPointFixed_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = intelligence.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        test.ok(utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    twoPointFixed_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = intelligence.crossoverStrategies.twoPointFixed([this.variableA, this.variableB]);
        });
        test.done();
    },
    twoPointFixed_whenCalled_offspringHaveChanged: function (test) {
        var offspring = intelligence.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        test.ok(!utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },

    uniform_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = intelligence.crossoverStrategies.uniform([this.individualA, this.individualB]);
        test.ok(utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    uniform_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = intelligence.crossoverStrategies.uniform([this.variableA, this.variableB]);
        });
        test.done();
    },
    uniform_whenCalled_offspringHaveChanged: function (test) {
        var offspring = intelligence.crossoverStrategies.uniform([this.individualA, this.individualB]);
        test.ok(!utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },

    onePointVariable_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.variableA.copy();
        var copyB = this.variableB.copy();
        var offspring = intelligence.crossoverStrategies.onePointVariable([this.variableA, this.variableB]);
        test.ok(utils.arrayEqual(copyA.body, this.variableA.body));
        test.ok(utils.arrayEqual(copyB.body, this.variableB.body));
        test.done();
    },
    onePointVariable_whenCalledWithFixedLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = intelligence.crossoverStrategies.onePointVariable([this.individualA, this.individualB]);
        });
        test.done();
    },
    onePointVariable_whenCalled_offspringHaveChanged: function (test) {
        var offspring = intelligence.crossoverStrategies.onePointVariable([this.variableA, this.variableB]);
        test.ok(!utils.arrayEqual(offspring[0].body, this.variableA.body));
        test.ok(!utils.arrayEqual(offspring[1].body, this.variableB.body));
        test.done();
    },

    twoPointVariable_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.variableA.copy();
        var copyB = this.variableB.copy();
        var offspring = intelligence.crossoverStrategies.twoPointVariable([this.variableA, this.variableB]);
        test.ok(utils.arrayEqual(copyA.body, this.variableA.body));
        test.ok(utils.arrayEqual(copyB.body, this.variableB.body));
        test.done();
    },
    twoPointVariable_whenCalledWithFixedLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = intelligence.crossoverStrategies.twoPointVariable([this.individualA, this.individualB]);
        });
        test.done();
    },
    twoPointVariable_whenCalled_offspringHaveChanged: function (test) {
        var offspring = intelligence.crossoverStrategies.twoPointVariable([this.variableA, this.variableB]);
        test.ok(!utils.arrayEqual(offspring[0].body, this.variableA.body));
        test.ok(!utils.arrayEqual(offspring[1].body, this.variableB.body));
        test.done();
    },
};