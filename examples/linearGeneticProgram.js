var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.LinearIndividual({
    minLength: 2,
    maxLength: 10,
    numInputs: 4,
    numOutputs: 1,
    geneFactory: intelligence.geneFactories.linearNode,
    functionSet: [

        function add(a, b) {
            return a + b;
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
    [12, 23, 34, 23],
    [23, 98, 6, 44],
    [87, 44, 43, 2],
    [21, 67, 32, 98],
    [33, 33, 33, 39],
    [98, 99, 3, 72],
    [73, 83, 42, 72],
    [25, 36, 13, 27],
    [32, 2, 19, 53]
];

var fitnessFunction = function (linearIndividual) {
    var output, targetValue;
    var totalError = 0;
    for (var i = 0; i < inputs.length; i++) {
        output = linearIndividual.execute(inputs[i])[0];
        targetValue = 0;
        for (var j = 0; j < inputs[i].length; j++) {
            targetValue += inputs[i][j];
        }
        totalError += Math.abs(output - targetValue);
    }
    return totalError;
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.crossoverStrategies.onePoint,
    fitnessFunction: fitnessFunction,
    elitism: 5,
    populationSize: 1000,
    tournamentSize: 5,
    mutationRate: 0.4,
    isMinimise: true
});

population.on('generationCompleted', function (population, generationNumber) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].toString();
        var bestFitness = population.getFittestIndividuals(1)[0].fitness;
        console.log("Gen: " + generationNumber + " fitness: " + bestFitness + ", best:");
        process.stdout.write(best);
        console.log("");
        console.log("");
    }
});

population.train(100);