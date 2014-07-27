exports.Population = require('./genetic/population').Population;
exports.Individual = require('./genetic/individual').Individual;
exports.GPTreeIndividual = require('./genetic/tree').GPTreeIndividual;

// crossover
exports.onePointFixedStrategy = require('./genetic/crossover').onePointFixedStrategy;
exports.twoPointFixedStrategy = require('./genetic/crossover').twoPointFixedStrategy;
exports.uniformCrossoverStrategy = require('./genetic/crossover').uniformCrossoverStrategy;
exports.onePointVariableStrategy = require('./genetic/crossover').onePointVariableStrategy;
exports.twoPointVariableStrategy = require('./genetic/crossover').onePointVariableStrategy;

// selection
exports.selection = require('./genetic/selection');

// genes
exports.alphabetGeneFactory = require('./genetic/genes').alphabetGeneFactory;
exports.binaryNumberGeneFactory = require('./genetic/genes').binaryNumberGeneFactory;