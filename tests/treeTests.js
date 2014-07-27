var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (cb) {
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    GPTreeIndividual_initializeMissingOptions_setsDefaultOptions: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        test.ok(tree.options ? true : false);
        test.done();
    },
    Initialise_WhenCreationMethodIsGrow_InitialisesUsingGrowMethod: function (test) {
        var tree = new intelligence.GPTreeIndividual({
            creationMethod: 'full',
            maxDepth: 20
        });
        tree.initialise();
        test.ok(tree.body ? true : false);
        test.dome();
    },
    Initialise_WhenCreationMethodIsGrow_InitialisesUsingGrowMethod: function (test) {
        var tree = new intelligence.GPTreeIndividual({
            creationMethod: 'grow',
            maxDepth: 20
        });
        tree.initialise();
        test.ok(tree.body ? true : false);
        test.done();
    },
    getRandomOperatorNode_whenCalled_returnsOperatorNode: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var operatorNode = tree.getRandomOperatorNode();
        test.ok(operatorNode ? true : false);
        test.ok(operatorNode.gpFunction ? true : false);
        test.done();
    },
    getRandomValueNode_WhenCalled_ReturnsValueNode: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var valueNode = tree.getRandomValueNode();
        test.ok(valueNode ? true : false);
        test.ok(valueNode.value ? true : false);
        test.done();
    },
    getNodesArray_whenCalled_returnsNodesArray: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var nodesArray = tree.getNodesArray();
        test.ok(nodesArray ? true : false);
        test.done();
    },
    getRandomNode_whenCalled_returnsRandomNode: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var randomNode = tree.getRandomNode();
        test.ok(randomNode ? true : false);
        test.done();
    },
    mutateSubtree_whenCalled_bodyIsMutated: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var previousBody = JSON.stringify(tree.body);
        tree.mutateSubtree();
        test.ok(previousBody !== JSON.stringify(tree.body));
        test.done();
    },
    mutateNodeReplacement_whenCalled_bodyIsMutated: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var previousBody = JSON.stringify(tree.body);
        tree.mutateNodeReplacement();
        test.ok(previousBody !== JSON.stringify(tree.body));
        test.done();
    },
    mutateConstant_whenCalled_bodyIsMutated: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var previousBody = JSON.stringify(tree.body);
        tree.mutateConstant();
        test.ok(previousBody !== JSON.stringify(tree.body));
        test.done();
    },
    mutuateShrink_whenCalled_bodyIsMutated: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var previousBody = JSON.stringify(tree.body);
        tree.mutuateShrink();
        test.ok(previousBody !== JSON.stringify(tree.body));
        test.done();
    },
    mutateHoist_whenCalled_bodyIsMutated: function (test) {
        var tree = new intelligence.GPTreeIndividual({});
        var previousBody = JSON.stringify(tree.body);
        tree.mutateHoist();
        test.ok(previousBody !== JSON.stringify(tree.body));
        test.done();
    },
};