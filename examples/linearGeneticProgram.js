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
        function subt(a, b) {
            return a - b;
        },
        function mult(a, b) {
            return a * b;
        },
        function div(a, b) {
            return a / b;
        }
    ],
    conditionalSet: [

        function eq(a, b) {
            return a === b;
        },
        function notEq(a, b) {
            return a !== b;
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
        var output = linearIndividual.execute(inputs[i])[0];
        totalError += Math.abs(output - targetValue);
    }
    return totalError;
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.crossoverStrategies.twoPointVariable,
    fitnessFunction: fitnessFunction,
    elitism: 2,
    populationSize: 75,
    tournamentSize: 2,
    isMinimise: true
});

population.on('generationCompleted', function (population, generationNumber) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].toString();
        var avg = population.getAverageFitness();
        console.log("Gen: " + generationNumber + " average: " + avg + ", best:");
        process.stdout.write(best);
        console.log("");
        console.log("");
    }
});

population.train(100);