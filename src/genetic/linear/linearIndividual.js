var clone = require('clone');
var utils = require('./../../infrastructure/utils');
var Individual = require('./../individual').Individual;
var RegisterSet = require('./registerSet').RegisterSet;
var FunctionNode = require('./functionNode').FunctionNode;
var ConditionalNode = require('./conditionalNode').ConditionalNode;

var LinearIndividual = function (options) {
    this.options = options;
    this.options.registerSet = new RegisterSet(clone(this.options));
    this.setDefaultOptionsIfNotProvided();
    Individual.call(this, options);
};

LinearIndividual.prototype = Object.create(Individual.prototype);

LinearIndividual.prototype.validateRequiredOptions = function () {
    Individual.prototype.validateRequiredOptions.call(this);
    if (!this.options.numInputs) {
        throw "option 'numInputs' is required";
    } else if (!this.options.numOutputs) {
        throw "option 'numOutputs' is required";
    } else if (!this.options.functionSet) {
        throw "option 'functionSet' is required";
    }
};

LinearIndividual.prototype.setDefaultOptionsIfNotProvided = function () {
    if (this.options.removeIntrons === undefined) {
        this.options.removeIntrons = true;
    }
    if (!this.options.conditionalSet) {
        this.options.conditionalSet = [];
    }
};

LinearIndividual.prototype.evaluate = function (inputs) {
    var i = 0;
    this.options.registerSet.setInputs(inputs);
    while (i < this.body.length) {
        var node = this.body[i];
        if (node instanceof FunctionNode) {
            node.execute(this.options.registerSet);
        } else if (node instanceof ConditionalNode) {
            if (!node.execute(this.options.registerSet)) {
                while (this.body[i] instanceof ConditionalNode) {
                    i++;
                }
                i++;
                continue;
            }
        } else {
            throw "unknown node type";
        }
    }
    return this.options.registerSet.getOutputNodes();
};

LinearIndividual.prototype.toString = function () {
    var toReturn = "";
    var numIndents = 0;
    for (var i = 0; i < this.body.length; i++) {
        var node = this.body[i];
        toReturn += node.toString() + "\n";
        for (var j = 0; j < numIndents; j++) {
            toReturn += "  ";
        }
    }
    return toReturn;
};

exports.LinearIndividual = LinearIndividual;