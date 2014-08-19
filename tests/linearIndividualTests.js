var intelligence = require('./../src/intelligence');
var registerReference = require('./../src/genetic/linear/registerReference');

module.exports = {
    setUp: function (cb) {
        this.individualOptions = {
            minLength: 10,
            maxLength: 20,
            numInputs: 5,
            numOutputs: 1,
            removeIntrons: false,
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
        var returnValue = individual.execute(inputs)[0];
        var expectedValue = individual.options.registerSet.out[0];
        test.ok(returnValue === expectedValue || (isNaN(returnValue) && isNaN(expectedValue)));
        test.done();
    },
    execute_whenCalledTwice_sameValueIsReturned: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);
        var inputs = [1, 2, 3, 4, 5];
        var output1 = individual.execute(inputs)[0];
        var output2 = individual.execute(inputs)[0];
        test.ok(output1 === output2 || (isNaN(output1) && isNaN(output2)));
        test.done();
    },
    execute_whenBodyIsKnown_returnsCorrectValue: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);

        var nodeA = new intelligence.LinearFunctionNode(function add(a, b) {
            return a + b;
        }, individual.options.registerSet);
        var nodeB = new intelligence.LinearFunctionNode(function sub(a, b) {
            return a - b;
        }, individual.options.registerSet);
        var nodeC = new intelligence.LinearFunctionNode(function mul(a, b) {
            return a * b;
        }, individual.options.registerSet);

        nodeA.targetRegister = registerReference.createCalculation(individual.options.registerSet, 0);
        nodeB.targetRegister = registerReference.createCalculation(individual.options.registerSet, 1);
        nodeC.targetRegister = registerReference.createOutput(individual.options.registerSet, 0);
        nodeA.inputRegisters[0] = registerReference.createConstant(individual.options.registerSet, 0);
        nodeA.inputRegisters[1] = registerReference.createConstant(individual.options.registerSet, 1);
        nodeB.inputRegisters[0] = registerReference.createConstant(individual.options.registerSet, 10);
        nodeB.inputRegisters[1] = registerReference.createCalculation(individual.options.registerSet, 0);
        nodeC.inputRegisters[0] = registerReference.createCalculation(individual.options.registerSet, 1);
        nodeC.inputRegisters[1] = registerReference.createConstant(individual.options.registerSet, 5);

        individual.body = [nodeA, nodeB, nodeC];
        var output = individual.execute([1, 2, 3, 4, 5])[0];
        test.equal(output, 48);
        test.done();
    },
    execute_whenBodyContainsIfStatement_ifStatementIsApplied: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);

        var nodeA = new intelligence.LinearFunctionNode(function add(a, b) {
            return a + b;
        }, individual.options.registerSet);
        var nodeB = new intelligence.LinearConditionalNode(function greaterThan(a, b) {
            return a > b;
        }, individual.options.registerSet);
        var nodeC = new intelligence.LinearFunctionNode(function mul(a, b) {
            return a * b;
        }, individual.options.registerSet);

        nodeA.targetRegister = registerReference.createOutput(individual.options.registerSet, 0);
        nodeC.targetRegister = registerReference.createOutput(individual.options.registerSet, 0);

        nodeA.inputRegisters[0] = registerReference.createConstant(individual.options.registerSet, 0);
        nodeA.inputRegisters[1] = registerReference.createConstant(individual.options.registerSet, 0);
        nodeB.inputRegisters[0] = registerReference.createInput(individual.options.registerSet, 0);
        nodeB.inputRegisters[1] = registerReference.createInput(individual.options.registerSet, 1);
        nodeC.inputRegisters[0] = registerReference.createConstant(individual.options.registerSet, 1);
        nodeC.inputRegisters[1] = registerReference.createConstant(individual.options.registerSet, 1);

        individual.body = [nodeA, nodeB, nodeC];
        var outputA = individual.execute([1, 2, 3, 4, 5])[0];
        var outputB = individual.execute([5, 4, 3, 2, 1])[0];
        test.equal(outputA, 2);
        test.equal(outputB, 4);
        test.done();
    },
    removeIntrons_whenIndividualIsExecutedBeforeAndAfter_outputIsTheSame: function (test) {
        var individual = new intelligence.LinearIndividual(this.individualOptions);
        var inputs = [1, 2, 3, 4, 5];
        var outputValue = individual.execute(inputs)[0];
        individual.removeIntrons();
        var outputValueAfter = individual.execute(inputs)[0];
        test.equal(outputValue, outputValueAfter);
        test.done();
    }
};