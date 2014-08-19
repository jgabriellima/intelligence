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
        callback();
    },
    onePoint_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = this.crossoverStrategies.onePoint([this.individualA, this.individualB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    onePoint_whenCalledWithFixedLengthIndivisuals_offspringAreSameLength: function (test) {
        var offspring = this.crossoverStrategies.onePoint([this.individualA, this.individualB]);
        test.equal(this.individualA.body.length, offspring[0].body.length);
        test.equal(this.individualB.body.length, offspring[0].body.length);
        test.done();
    },
    onePoint_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.onePoint([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    onePoint_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.selectRandom = function () {
            return {
                a: 4,
                b: 6
            };
        };
        var offspring = this.crossoverStrategies.onePoint([this.variableA, this.variableB]);
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
    onePoint_whenBodyLengthIsTwo_offspringHaveChanged: function (test) {
        var individualA = new intelligence.Individual({
            minLength: 2,
            maxLength: 2,
            geneFactory: intelligence.geneFactories.alphabet
        });
        var individualB = individualA.createNew();
        var offspring = this.crossoverStrategies.onePoint([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    twoPoint_whenCalled_parentsAreUnchanged: function (test) {
        var copyA = this.individualA.copy();
        var copyB = this.individualB.copy();
        var offspring = this.crossoverStrategies.twoPoint([this.individualA, this.individualB]);
        test.ok(intelligence.utils.arrayEqual(copyA.body, this.individualA.body));
        test.ok(intelligence.utils.arrayEqual(copyB.body, this.individualB.body));
        test.done();
    },
    twoPoint_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.twoPoint([this.individualA, this.individualB]);
        test.equal(this.individualA.body.length, offspring[0].body.length);
        test.equal(this.individualB.body.length, offspring[0].body.length);
        test.done();
    },
    twoPoint_whenCalled_offspringHaveChanged: function (test) {
        var offspring = this.crossoverStrategies.twoPoint([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    twoPoint_whenBodyLengthIsTwo_offspringHaveChanged: function (test) {
        var individualA = new intelligence.Individual({
            minLength: 2,
            maxLength: 2,
            geneFactory: intelligence.geneFactories.alphabet
        });
        var individualB = individualA.createNew();
        var offspring = this.crossoverStrategies.twoPoint([this.individualA, this.individualB]);
        test.ok(!intelligence.utils.arrayEqual(offspring[0].body, this.individualA.body));
        test.ok(!intelligence.utils.arrayEqual(offspring[1].body, this.individualB.body));
        test.done();
    },
    twoPoint_whenCrossoverPointIsKnown_correctElementsAreSwapped: function (test) {
        this.utilsMock.selectRandom = function () {
            return {
                a: 2,
                b: 4,
                c: 6,
                d: 8
            };
        };
        var offspring = this.crossoverStrategies.twoPoint([this.variableA, this.variableB]);
        console.log(JSON.stringify([this.variableA, this.variableB]));
        console.log(JSON.stringify(offspring));
        var i;
        for (i = 0; i < 2; i++) {
            test.equal(offspring[0].body[i], this.variableA.body[i]);
        }
        for (i = 2; i < 5; i++) {
            test.equal(offspring[0].body[i], this.variableB.body[i + 4]);
        }
        for (i = 5; i < offspring[0].body.length; i++) {
            test.equal(offspring[0].body[i], this.variableA.body[i]);
        }
        for (i = 0; i < 6; i++) {
            test.equal(offspring[1].body[i], this.variableB.body[i]);
        }
        for (i = 6; i < 9; i++) {
            test.equal(offspring[1].body[i], this.variableA.body[i - 4]);
        }
        for (i = 9; i < offspring[1].body.length; i++) {
            test.equal(offspring[1].body[i], this.variableB.body[i]);
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
    }
};