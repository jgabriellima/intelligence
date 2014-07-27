var utils = require('./../infrastructure/utils');
var intelligence = require('./../intelligence');

var BaseNode = function () {}

BaseNode.prototype.evaluate = function () {
    throw "method 'evaluate' must be overridden";
};

BaseNode.prototype.traverse = function (arr) {
    throw "method 'traverse' must be overridden";
};

BaseNode.prototype.getExecutableCode = function () {
    throw "method 'getExecutableCode' must be overriden";
};

BaseNode.prototype.replace = function (newNode) {
    if (this === this.parentNode.leftChild) {
        this.parentNode.leftChild = newNode;
    } else {
        this.parentNode.rightChild = newNode;
    }
};

var ValueNode = function (value) {
    this.value = value;
};

ValueNode.prototype = Object.create(BaseNode);

ValueNode.prototype.evaluate = function () {
    return this.value;
};

ValueNode.prototype.traverse = function (arr) {
    arr.push(this);
    return arr;
};

ValueNode.prototype.getExecutableCode = function () {
    return this.value.toString();
};

var OperatorNode = function (gpFunction) {
    this.gpFunction = gpFunction;
    this.leftChild = null;
    this.rightChild = null;
}

OperatorNode.prototype = Object.create(BaseNode);

OperatorNode.prototype.evaluate = function () {
    return this.gpFunction(this.leftChild.evaluate(), this.rightChild.evaluate());
};

OperatorNode.prototype.traverse = function (arr) {
    arr = arr ? arr : [];
    arr.push(this);
    this.leftChild.traverse(arr);
    this.rightChild.traverse(arr);
    return arr;
};

OperatorNode.prototype.getExecutableCode = function () {
    return this.gpFunction.name + "(" + this.leftChild.getExecutableCode() +
        ", " + this.rightChild.getExecutableCode() + ")";
};


var GPTreeIndividual = function (options) {
    this.options = options;
    this.setDefaultOptionsIfNotProvided();
    this.initialise();
};

GPTreeIndividual.prototype = Object.create(intelligence.Individual);

GPTreeIndividual.prototype.setDefaultOptionsIfNotProvided = function () {
    if (!this.options.functionSet) {
        this.options.functionSet = [

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
        ];
    }
    if (!this.options.terminalSet) {
        var arr = [];
        for (var i = 1; i < 101; i++) {
            arr.push(i);
        }
        this.options.terminalSet = arr;
    }
    if (!this.options.creationMethod) {
        this.options.creationMethod = 'full';
    }
    if (!this.options.mutationMethod) {
        this.options.mutationMethod = 'nodeReplacement';
    }
    if (!this.options.maxDepth) {
        this.options.maxDepth = 20;
    }
};

GPTreeIndividual.prototype.evaluate = function () {
    return this.body.evaluate();
};

GPTreeIndividual.prototype.generateOperatorNode = function () {
    return new OperatorNode(utils.selectRandom(this.options.functionSet));
};

GPTreeIndividual.prototype.generateValueNode = function () {
    return new ValueNode(utils.selectRandom(this.options.terminalSet));
};

GPTreeIndividual.prototype.initialise = function () {
    if (this.options.creationStrategy) {
        this.body = this.options.creationStrategy();
    } else {
        if (this.options.creationMethod === 'full') {
            this.body = this.initialiseFull();
        } else if (this.options.creationMethod === 'grow') {
            this.body = this.initialiseGrow();
        } else {
            throw "creation method not implemented";
        }
    }
};

GPTreeIndividual.prototype.initialiseFull = function (currDepth) {
    if (currDepth === undefined) {
        currDepth = this.options.maxDepth;
    }
    if (currDepth > 1) {
        var node = this.generateOperatorNode();
        node.leftChild = this.initialiseFull(--currDepth);
        node.rightChild = this.initialiseFull(--currDepth);
    } else {
        var node = this.generateValueNode();
    }
    return node;
};

GPTreeIndividual.prototype.initialiseGrow = function (currDepth) {
    if (currDepth === undefined) {
        currDepth = this.options.maxDepth;
    }
    if (currDepth > 1) {
        if (utils.random() < 0.5) {
            var node = this.generateOperatorNode();
            node.leftChild = this.initialiseGrow(--currDepth);
            node.rightChild = this.initialiseGrow(--currDepth);
        } else {
            var node = this.generateValueNode();
        }
    } else {
        var node = this.generateValueNode();
    }
    return node;
};

GPTreeIndividual.prototype.getNodesArray = function () {
    return this.body.traverse();
};

GPTreeIndividual.prototype.getParentNode = function (node, currNode) {
    var nodes = this.getNodesArray();
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].gpFunction) {
            if (nodes[i].leftChild === node || node.rightChild === node) {
                return node;
            }
        }
    }
    return null;
};

GPTreeIndividual.prototype.replaceNodes = function (toReplace, newNode) {
    var parent = this.getParentNode(toReplace);
    if (parent) {
        parent.leftChild === toReplace ? parent.leftChild = newNode : parent.rightChild = newNode;
    }
};

GPTreeIndividual.prototype.getRandomOperatorNode = function () {
    var nodes = this.getNodesArray();
    var operatorNodes = []
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].gpFunction) {
            operatorNodes.push(nodes[i]);
        }
    }
    return utils.selectRandom(operatorNodes);
};

GPTreeIndividual.prototype.getRandomValueNode = function () {
    var nodes = this.getNodesArray();
    var valueNodes = []
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].value) {
            valueNodes.push(nodes[i]);
        }
    }
    return utils.selectRandom(valueNodes);
};

GPTreeIndividual.prototype.getRandomNode = function () {
    var nodes = this.getNodesArray();
    return utils.selectRandom(nodes);
};

// TODO take into account node depth when generating subtree
GPTreeIndividual.prototype.mutateSubtree = function () {
    var selectedNode = this.getRandomOperatorNode();
    selectedNode.leftChild = this.initialiseGrow(this.options.maxDepth, selectedNode);
    selectedNode.leftChild = this.initialiseGrow(this.options.maxDepth, selectedNode);
};

GPTreeIndividual.prototype.mutateNodeReplacement = function () {
    var selectedNode = this.getRandomNode();
    if (selectedNode.gpFunction) {
        this.replaceNodes(selectedNode, this.getRandomOperatorNode());
    } else {
        this.replaceNodes(selectedNode, this.getRandomValueNode());
    }
};

GPTreeIndividual.prototype.mutateConstant = function () {
    throw "not implemented";
};

GPTreeIndividual.prototype.mutuateShrink = function () {
    var selectedNode = this.getRandomOperatorNode();
    this.replaceNodes(selectedNode, this.getRandomValueNode());
};

GPTreeIndividual.prototype.mutateHoist = function () {
    var selectedNode = this.getRandomOperatorNode();
    this.body = selectedNode;
};

GPTreeIndividual.prototype.mutate = function () {
    if (this.options.mutationStrategy) {
        this.options.mutationStrategy(this);
    } else if (this.options.mutationMethod === 'subtree') {
        this.mutateSubtree();
    } else if (this.options.mutationMethod === 'nodeReplacement') {
        this.mutateNodeReplacement();
    } else if (this.options.mutationMethod === 'constant') {
        this.mutateConstant();
    } else if (this.options.mutationMethod === 'shrink') {
        this.mutuateShrink();
    } else if (this.options.mutationMethod === 'hoist') {
        this.mutateHoist();
    } else {
        throw "mutation not implemented";
    }
};

GPTreeIndividual.prototype.getExecutableCode = function () {
    var code = "";

    return this.body.getExecutableCode() + ";";
};

exports.GPTreeIndividual = GPTreeIndividual;