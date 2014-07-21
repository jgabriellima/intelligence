var utils = require('./../infrastructure/utils');
var intelligence = require('./../intelligence');

BaseNode = function() {
    this.parent = null;
}

BaseNode.prototype.evaluate = function() {
    throw "method 'evaluate' must be overridden";
};

ValueNode = function(value) {
    this.value = value;
};

ValueNode.prototype = new BaseNode();

ValueNode.prototype.evaluate = function() {
    return this.value;
};


OperatorNode = function(gpFunction) {
    this.leftChild = null;
    this.rightChild = null;
    this.gpFunction = gpFunction;
}

OperatorNode.prototype = new BaseNode();

OperatorNode.prototype.evaluate = function() {
    return this.gpFunction(this.leftChild.evaluate(), this.rightChild.evaluate());
};


exports.GPTreeIndividual = function(options) {
    this.options = options;
    this.validateRequiredOptions();
    this.setDefaultOptionsIfNotRequired();
    this.initialise();
};

GPTreeIndividual.prototype = new intelligence.Individual();

GPTreeIndividual.prototype.setDefaultOptionsIfNotRequired = function() {
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
        for (var i=1; i < 101; i++) {
            arr.push(i);
        }
        this.options.terminalSet = arr;
    }
};

GPTreeIndividual.generateOperatorNode = function() {
    return new OperatorNode(utils.selectRandom(this.options.functionSet));
};

GPTreeIndividual.generateValueNode = function() {
    return new ValueNode(utils.selectRandom(this.options.terminalSet));
};