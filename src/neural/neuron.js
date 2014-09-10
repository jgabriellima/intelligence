var utils = require('./../infrastructure/utils');

/**
 * Neural network neuron
 * @constructor
 * @param {object} options - Neuron options
 * @param {number} options.numInputs - The number of inputs that the neuron accepts
 * @param {function} options.transferFunction - The transfer function to apply to the neuron
 * @param {number} [options.bias=1] - The bias value for the neuron
 * @property {number[]} weights - The neurons weights values
 * @property {object} options - Linear indivdual options
 */
var Neuron = function (options) {
    this.weights = [];
    this.biasWeight = 0;
    this.options = options;
    this.setDefaultOptionsIfNotProvided();
    this.validateRequiredOptions();
    this.initialise();
};

/**
 * Validates the individuals current options
 * @throws An exception will occur if a required option is missing
 * @returns {Neuron} Reference to current object for chaining
 */
Neuron.prototype.validateRequiredOptions = function () {
    if (!this.options.numInputs) {
        throw "option 'numInputs' is required";
    } else if (!this.options.transferFunction) {
        throw "option 'transferFunction' is required";
    }
    return this;
};

/**
 * Sets default values for options that have not been defined
 * @returns {Neuron} Reference to current object for chaining
 */
Neuron.prototype.setDefaultOptionsIfNotProvided = function () {
    if (!this.options.bias) {
        this.options.bias = 1;
    }
    return this;
};

/**
 * Re creates the neuron with randomly generated weight values
 * @returns {Neuron} Reference to current object for chaining
 */
Neuron.prototype.initialise = function () {
    this.biasWeight = utils.random();
    this.weights = [];
    for (var i=0; i < this.options.numInputs+1; i++) {
        this.weights.push(utils.random());
    }
    return this;
};

/**
 * Gets the neuron output based on an array of inputs
 * @returns {number} The neuron output based on an array of inputs
 */
Neuron.prototype.getOutput = function (inputs) {
    if (!inputs.length === this.options.numInputs) {
        throw "Invalid number of inputs";   
    }
    else {
        var sum = 0;
        for (var i=0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += (this.options.bias * this.biasWeight);
        return this.options.transferFunction(sum);
    }
};