var intelligence = require('./../src/intelligence');
var proxyquire = require("proxyquire");

module.exports = {
    setUp: function (callback) {
        this.utilsMock = {};
        this.crossoverStrategies = proxyquire('./../src/genetic/crossoverStrategies', {
            './../infrastructure/utils': this.utilsMock
        });
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
        this.utilsMock = null;
        this.intelligence = null;
        this.individualA = null;
        this.individualB = null;
        this.variableA = null;
        this.variableB = null;
        callback();
    },
    onePointFixed_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = this.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    onePointFixed_whenCalled_offspringAreSameLength: function (test) {
        var offspring = this.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        test.equal(this.individualA.body.length, offspring[0].body.length);
        test.equal(this.individualB.body.length, offspring[0].body.length);
        test.done();
    },
    onePointFixed_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = this.crossoverStrategies.onePointFixed([this.variableA, this.variableB]);
        });
        test.done();
    },
    onePointFixed_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    onePointFixed_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.randBetween = function (a, b) {
            return 5;
        };
        var offspring = this.crossoverStrategies.onePointFixed([this.individualA, this.individualB]);
        for (var i = 0; i < 10; i++) {
            if (i < 5) {
                test.equal(offspring[0].body[i], this.individualA.body[i]);
                test.equal(offspring[1].body[i], this.individualB.body[i]);
            } else {
                test.equal(offspring[0].body[i], this.individualB.body[i]);
                test.equal(offspring[1].body[i], this.individualA.body[i]);
            }
        }
        test.done();
    },
    twoPointFixed_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = this.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    twoPointFixed_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        test.equal(this.individualA.body.length, offspring[0].body.length);
        test.equal(this.individualB.body.length, offspring[0].body.length);
        test.done();
    },
    twoPointFixed_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = this.crossoverStrategies.twoPointFixed([this.variableA, this.variableB]);
        });
        test.done();
    },
    twoPointFixed_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    twoPointFixed_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.randBetween = (function () {
            var calls = 0;
            var f = function () {
                calls++;
                if (calls === 1) {
                    return 3;
                } else {
                    return 5;
                }
            };
            return f;
        }());
        var offspring = this.crossoverStrategies.twoPointFixed([this.individualA, this.individualB]);
        for (var i = 0; i < 10; i++) {
            if (i < 3 || i >= 5) {
                test.equal(offspring[0].body[i], this.individualA.body[i]);
                test.equal(offspring[1].body[i], this.individualB.body[i]);
            } else {
                test.equal(offspring[0].body[i], this.individualB.body[i]);
                test.equal(offspring[1].body[i], this.individualA.body[i]);
            }
        }
        test.done();
    },
    uniform_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = this.crossoverStrategies.uniform([this.individualA, this.individualB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    uniform_whenCalled_offspringAreSameLength: function (test) {
        var offspring = this.crossoverStrategies.uniform([this.individualA, this.individualB]);
        test.equal(this.individualA.body.length, offspring[0].body.length);
        test.equal(this.individualB.body.length, offspring[0].body.length);
        test.done();
    },
    uniform_whenCalledWithVariableLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = this.crossoverStrategies.uniform([this.variableA, this.variableB]);
        });
        test.done();
    },
    uniform_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.uniform([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    uniform_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.random = (function () {
            var calls = 0;
            var f = function () {
                calls++;
                if (calls % 2 === 0) {
                    return 0.75;
                } else {
                    return 0.25;
                }
            };
            return f;
        }());
        var offspring = this.crossoverStrategies.uniform([this.individualA, this.individualB]);
        for (var i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                test.equal(offspring[0].body[i], this.individualB.body[i]);
                test.equal(offspring[1].body[i], this.individualA.body[i]);
            } else {
                test.equal(offspring[0].body[i], this.individualA.body[i]);
                test.equal(offspring[1].body[i], this.individualB.body[i]);
            }
        }
        test.done();
    },
    onePointVariable_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.variableA.copy();
        var copyB = this.variableB.copy();
        var offspring = this.crossoverStrategies.onePointVariable([this.variableA, this.variableB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.variableA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.variableB.body));
        test.done();
    },
    onePointVariable_whenCalledWithFixedLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = this.crossoverStrategies.onePointVariable([this.individualA, this.individualB]);
        });
        test.done();
    },
    onePointVariable_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.onePointVariable([this.variableA, this.variableB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.variableA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.variableB.body));
        test.done();
    },
    onePointVariable_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.randBetween = (function () {
            var calls = 0;
            var f = function () {
                calls++;
                if (calls === 1) {
                    return 4;
                } else {
                    return 6;
                }
            };
            return f;
        }());
        var offspring = this.crossoverStrategies.onePointVariable([this.variableA, this.variableB]);
        var i;
        for (i = 0; i < 4; i++) {
            test.equal(offspring[0].body[i], this.variableA.body[i]);
        }
        for (i = 4; i < offspring[0].body.length; i++) {
            test.equal(offspring[0].body[i], this.variableB.body[i + 2]);
        }
        for (i = 0; i < 6; i++) {
            test.equal(offspring[1].body[i], this.variableB.body[i]);
        }
        for (i = 6; i < offspring[1].body.length; i++) {
            test.equal(offspring[1].body[i], this.variableA.body[i - 2]);
        }
        test.done();
    },
    twoPointVariable_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.variableA.copy();
        var copyB = this.variableB.copy();
        var offspring = this.crossoverStrategies.twoPointVariable([this.variableA, this.variableB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.variableA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.variableB.body));
        test.done();
    },
    twoPointVariable_whenCalledWithFixedLengthIndividuals_throws: function (test) {
        test.throws(function () {
            var offspring = this.crossoverStrategies.twoPointVariable([this.individualA, this.individualB]);
        });
        test.done();
    },
    twoPointVariable_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.twoPointVariable([this.variableA, this.variableB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.variableA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.variableB.body));
        test.done();
    },
    twoPointVariable_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.randBetween = (function () {
            var calls = 0;
            var f = function () {
                calls++;
                if (calls === 1) {
                    return 2;
                } else if (calls === 2) {
                    return 4;
                } else if (calls == 3) {
                    return 6;
                } else {
                    return 8;
                }
            };
            return f;
        }());
        var offspring = this.crossoverStrategies.twoPointVariable([this.variableA, this.variableB]);
        var i;
        for (i = 0; i < 2; i++) {
            test.equal(offspring[0].body[i], this.variableA.body[i]);
        }
        for (i = 2; i < 4; i++) {
            test.equal(offspring[0].body[i], this.variableB.body[i + 4]);
        }
        for (i = 4; i < offspring[0].body.length; i++) {
            test.equal(offspring[0].body[i], this.variableA.body[i]);
        }

        for (i = 0; i < 6; i++) {
            test.equal(offspring[1].body[i], this.variableB.body[i]);
        }
        for (i = 6; i < 8; i++) {
            test.equal(offspring[1].body[i], this.variableA.body[i - 4]);
        }
        for (i = 8; i < offspring[1].body.length; i++) {
            test.equal(offspring[1].body[i], this.variableB.body[i]);
        }
        test.done();
    },
};