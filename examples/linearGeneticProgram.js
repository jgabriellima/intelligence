var intelligence = require('./../src/intelligence');

var baseIndividual = new intelligence.LinearIndividual({
    minLength: 3,
    maxLength: 30,
    numInputs: 7,
    numOutputs: 1,
    constMin: 0,
    constMax: 0,
    numCalculationRegisters: 3,
    geneFactory: intelligence.geneFactories.linearNode,
    functionSet: [

        function add(a, b) {
            return a + b;
        }
    ]
});

var inputs = [
 [11, 43, 25, 43, 66, 77, 88],
 [21, 33, 32, 37, 43, 22, 87],
 [34, 55, 28, 97, 58, 48, 22],
 [36, 78, 44, 96, 46, 37, 78],
 [45, 45, 44, 35, 35, 36, 5],
 [34, 25, 37, 51, 28, 75, 44],
 [98, 97, 23, 48, 75, 66, 34]
]

var fitnessFunction = function (linearIndividual) {
    var output, targetValue;
    var totalError = 0;
    for (var i = 0; i < inputs.length; i++) {
        var targetValue = 0;
        for (var j = 0; j < inputs[i].length; j++) {
            targetValue += inputs[i][j];
        }
        output = linearIndividual.execute(inputs[i])[0];
        totalError += Math.abs(output - targetValue);
    }
    return totalError;
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.crossoverStrategies.onePoint,
    fitnessFunction: fitnessFunction,
    elitism: 1,
    populationSize: 1000,
    tournamentSize: 5,
    mutationRate: 0.75,
    isMinimise: true
});

population.on('generationCompleted', function (population, generationNumber) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0].toString();
        var bestFitness = population.getFittestIndividuals(1)[0].fitness;
        console.log(population.getFittestIndividuals(1)[0].execute([1, 1, 1, 1, 1, 1, 1]));
        console.log("Gen: " + generationNumber + " fitness: " + bestFitness + ", best:");
        process.stdout.write(best);
        console.log("");
        console.log("");
    }
});

population.train(100);