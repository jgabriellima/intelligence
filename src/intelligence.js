// genetic
exports.Population = require('./genetic/population').Population;
exports.SteadyStatePopulation = require('./genetic/steadyStatePopulation').SteadyStatePopulation;
exports.Individual = require('./genetic/individual').Individual;
exports.crossoverStrategies = require('./genetic/crossoverStrategies');
exports.selectionStrategies = require('./genetic/selectionStrategies');
exports.geneFactories = require('./genetic/geneFactories');

// linear
exports.RegisterSet = require('./genetic/linear/registerSet').RegisterSet;
exports.LinearGPNode = require('./genetic/linear/linearGPNode').LinearGPNode;
exports.LinearFunctionNode = require('./genetic/linear/linearFunctionNode').LinearFunctionNode;
exports.LinearConditionalNode = require('./genetic/linear/linearConditionalNode').LinearConditionalNode;
exports.LinearIndividual = require('./genetic/linear/linearIndividual').LinearIndividual;

// infrastructure
exports.utils = require('./infrastructure/utils');

// neural
exports.transferFunctions = require('./neural/transferFunctions');