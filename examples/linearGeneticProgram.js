var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.LinearIndividual({
    minLength: 10,
    maxLength: 20,
    numInputs: 3,
    numOutputs: 1,
    geneFactory: intelligence.geneFactories.linearNode,
    functionSet: [

        function add(a, b) {
            return a + b;
        },
        function subtract(a, b) {
            return a - b;
        },
        function multiply(a, b) {
            return a * b;
        },
        function divide(a, b) {
            return a / b;
        }
    ]
});

var inputs = [
    [12, 23, 34],
    [23, 98, 6],
    [87, 44, 43],
    [21, 67, 32],
    [33, 33, 33],
    [98, 99, 3],
    [73, 83, 42],
    [25, 36, 13],
    [32, 2, 19]
];

var fitnessFunction = function (linearIndividual) {
    var totalError = 0;
    var targetValue = 100;
    for (var i = 0; i < inputs.length; i++) {
        var output = linearIndividual.evaluate(inputs[i]);
        totalError += Math.abs(output - targetValue);
    }
    return totalError;
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.crossoverStrategies.twoPointFixed,
    fitnessFunction: fitnessFunction,
    elitism: 2,
    populationSize: 75,
    tournamentSize: 2,
});

population.train(100);