var intelligence = require('./../src/intelligence');

var tree = new intelligence.GPTreeIndividual({
    maxDepth: 10
});


console.log(tree.getExecutableCode());
console.log("done");