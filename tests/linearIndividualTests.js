var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (cb) {
        this.individualOptions = {
            minLength: 10,
            maxLength: 20,
            numInputs: 5,
            numOutputs: 1,
            geneFactory: intelligence.geneFactories.linearNode,
            functionSet: [

                function add(a, b) {
                    return a + b;
                },
                function subtract(a, b) {
                    return a - b;
                }
            ]
        };
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    linearIndividual_whenOptionsMissing_throws: function (test) {
        test.throws(function () {
            var individual = new intelligence.LinearIndividual(null);
        });
        test.done();
    },
    linearIndividual_whenDefaultOptionsMissing_setsDefaultOptions: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);
        test.ok(individual.options.removeIntrons !== undefined);
        test.ok(individual.options.conditionalSet !== undefined);
        test.done();
    },
    execute_whenCalled_returnsCorrectValue: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);
        var inputs = [1, 2, 3, 4, 5];
        var returnValue = individual.execute(inputs);
        test.ok(intelligence.utils.arrayEqual(individual.options.registerSet.out, returnValue));
        test.done();
    },
    execute_whenCalledTwice_sameValueIsReturned: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);
        var inputs = [1, 2, 3, 4, 5];
        var output1 = individual.execute(inputs);
        var output2 = individual.execute(inputs);
        test.ok(intelligence.utils.arrayEqual(output1, output2));
        test.done();
    }
};