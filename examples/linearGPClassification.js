var intelligence = require('./../src/intelligence');

var one = [
    0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0
];

var two = [
    0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0,
    0, 0, 1, 0, 0, 0,
    0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
];

var three = [
    0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0
];

var four = [
    1, 1, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0,
];

var five = [
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 0, 0, 0,
    0, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0
];

var six = [
    0, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 0,
    0, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 0,
];

var seven = [
    0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 0, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0
];

var eight = [
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 0
];

var nine = [
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0
];

var baseIndividual = new intelligence.LinearIndividual({
    minLength: 10,
    maxLength: 20,
    numInputs: 42,
    numOutputs: 9,
    numCalculationRegisters: 3,
    geneFactory: intelligence.geneFactories.linearNode,
    functionSet: [

        function add(a, b) {
            return a + b;
        },

        function sub(a, b) {
            return a - b;
        },

        function mult(a, b) {
            return a * b;
        },

        function div(a, b) {
            return a / b;
        }
    ]
});

var getMaxIndex = function (inputs) {
    var maxValue = inputs[0];
    var maxIndex = 0;
    for (var i = 1; i < inputs.length; i++) {
        if (inputs[i] > maxValue) {
            maxValue = inputs[i];
            maxIndex = i;
        }
    }
    return maxIndex;
};

var fitnessFunction = function (linearIndividual) {
    var fitness = 0;
    fitness += getMaxIndex(linearIndividual.execute(one)) === 0 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(two)) === 1 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(three)) === 2 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(four)) === 3 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(five)) === 4 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(six)) === 5 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(seven)) === 6 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(eight)) === 7 ? 1 : 0;
    fitness += getMaxIndex(linearIndividual.execute(nine)) === 8 ? 1 : 0;
    return fitness;
};

var population = new intelligence.Population({
    baseIndividual: baseIndividual,
    crossoverStrategy: intelligence.crossoverStrategies.twoPoint,
    fitnessFunction: fitnessFunction,
    populationSize: 3000,
    tournamentSize: 15
});

population.on('generationCompleted', function (population, generationNumber) {
    if (generationNumber % 10 === 0) {
        var best = population.getFittestIndividuals(1)[0];
        var accuracy = population.getFittestIndividuals(1)[0].fitness / 9;
        accuracy = Math.round(accuracy * 100) + "%";
        console.log("Gen: " + generationNumber + " accuracy: " + accuracy + ", best:");
        process.stdout.write(best.toString());
        console.log("");
        console.log("");
    }
});

population.train(100);