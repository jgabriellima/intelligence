var clone = require('clone');
var utils = require('./../../infrastructure/utils');
var Individual = require('./../individual').Individual;
var RegisterSet = require('./registerSet').RegisterSet;
var registerReference = require('./registerReference');
var LinearFunctionNode = require('./linearFunctionNode').LinearFunctionNode;
var LinearConditionalNode = require('./linearConditionalNode').LinearConditionalNode;

/**
 * Linear genetic programming individual
 * @constructor
 * @extends Individual
 * @param {object} options - Linear indivdual options
 * @param {number} options.numInputs - The number of inputs that the individual accepts
 * @param {number} options.numOutputs - The number of output the individual should return
 * @param {function[]} options.functionSet - An array of functions that are made available to the individual
 * @param {boolean} [options.removeIntrons=true] - Specify whether introns should be removed before execution
 * @param {function[]} [options.conditionalSet=[]] - An array of functions that can be used to control logic
 * @property {object} options - Linear indivdual options
 */
var LinearIndividual = function (options) {
    this.options = options;
    this.options.registerSet = new RegisterSet(clone(this.options));
    this.setDefaultOptionsIfNotProvided();
    Individual.call(this, options);
    return this;
};

utils.inherits(LinearIndividual, Individual);

/**
 * Validates the linear individuals current options
 * @throws An exception will occur if a required option is missing
 * @returns {LinearIndividual} Reference to current object for chaining
 */
LinearIndividual.prototype.validateRequiredOptions = function () {
    Individual.prototype.validateRequiredOptions.call(this);
    if (!this.options.numInputs) {
        throw "option 'numInputs' is required";
    } else if (!this.options.numOutputs) {
        throw "option 'numOutputs' is required";
    } else if (!this.options.functionSet) {
        throw "option 'functionSet' is required";
    }
    return this;
};

/**
 * Sets default values for options that have not been defined
 * @returns {LinearIndividual} Reference to current object for chaining
 */
LinearIndividual.prototype.setDefaultOptionsIfNotProvided = function () {
    if (this.options.removeIntrons === undefined) {
        this.options.removeIntrons = true;
    }
    if (!this.options.conditionalSet) {
        this.options.conditionalSet = [];
    }
};

/**
 * Executes the liner code represented by the indivduals body
 * @param {object[]} An array of inputs
 * @returns {object[]} An array of outputs
 */
LinearIndividual.prototype.execute = function (inputs) {
    if (this.options.removeIntrons) {
        this.removeIntrons();
    }
    var i = 0;
    this.options.registerSet.setInputs(inputs);
    while (i < this.body.length) {
        var node = this.body[i];
        if (node instanceof LinearFunctionNode) {
            node.execute(this.options.registerSet);
        } else if (node instanceof LinearConditionalNode) {
            if (!node.execute(this.options.registerSet)) {
                while (this.body[i] instanceof LinearConditionalNode) {
                    i++;
                }
            }
        } else {
            throw "unknown node type";
        }
        i++;
    }
    return this.options.registerSet.getOutputNodes();
};

/**
 * Removes all structurally noneffective code until the body length reaches the minimum allowed length
 * @returns {LinearIndividual} Reference to current object for chaining
 */
LinearIndividual.prototype.removeIntrons = function () {
    console.log("Hi");
    var references = [];
    var firstAssignment = false;
    var removeConditional = false;
    var i = this.body.length - 1
    while (i >= 0 && this.body.length > this.options.minLength) {
        var node = this.body[i];
        if (!firstAssignment) {
            if (node instanceof LinearConditionalNode ||
                node.targetRegister.flag !== registerReference.OUTPUT) {
                this.body.splice(i, 1);
            } else {
                firstAssignment = true;
                references = references.concat(node.inputRegisters);
            }
        } else {
            if (removeConditional && node instanceof LinearConditionalNode) {
                this.body.splice(i, 1);
            } else {
                removeConditional = false;
                if (node instanceof LinearFunctionNode) {
                    var isEffective = false;
                    for (var j = 0; j < references.length; j++) {
                        var reference = references[j];
                        if (reference.flag === node.targetRegister.flag &&
                            reference.index === node.targetRegister.index) {
                            isEffective = true;
                            break;
                        }
                    }
                    if (isEffective) {
                        references = references.concat(node.inputRegisters);
                    } else {
                        this.body.splice(i, 1);
                        removeConditional = true;
                    }
                }
            }
        }
        i--;
    }
    return this;
};

/**
 * Mutates a single node or an input or target register within a node
 * @returns {LinearIndividual} Reference to current object for chaining
 */
LinearIndividual.prototype.mutate = function () {
    if (utils.random() < 0.5) {
        Individual.prototype.mutate.call(this);
    } else {
        var node = utils.selectRandom(this.body);
        if (node instanceof LinearFunctionNode && utils.random() < 0.5) {
            node.targetRegister = registerReference.createRandomWritable(this.options.registerSet);
        } else {
            var elementIndex = utils.randBetween(0, node.inputRegisters.length);
            node.inputRegisters[elementIndex] = registerReference.createRandomReadable(this.options.registerSet);
        }
    }
    return this;
};

/**
 * Returns a string containing an executable representation of the individual
 * @returns {string} A string containing an executable representation of the individual
 */
LinearIndividual.prototype.toString = function () {
    var toReturn = "";
    var numIndents = 0;
    var i, j;
    for (i = 0; i < this.body.length; i++) {
        var node = this.body[i];
        for (j = 0; j < numIndents; j++) {
            toReturn += '\t';
        }
        toReturn += node.toString() + '\n';
        if (node instanceof LinearFunctionNode) {
            numIndents = 0;
        } else {
            numIndents += 1;
        }
    }
    return toReturn;
};

exports.LinearIndividual = LinearIndividual;