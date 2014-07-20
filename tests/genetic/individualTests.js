var individual = require('./../../src/genetic/individual');

module.exports = {
    setUp: function(callback) {
        this.validOptions  = {
            minLength: 10,
            maxLength: 20,
            geneFactory: function() {
                return Math.random() < 0.5 ? 0 : 1;
            }
        };
        callback();
    },
    tearDown: function(callback) {
        callback();
    },
    individual_initializeMissingOptions_throws: function(test) {
        test.throws(new individual.Individual(), "options are required");
    },
    individual_initializeValidOptions_initializesBody: function(test) {
        var ind = new individual.Indvidual(this.validOptions);
        test.ok(ind.body ? true : false);
    },
    initialize_afterConstruction_resetsBody: function(test) {
        var ind = new individual.Individual(this.validOptions);
        var prevBody = ind.body.slice(0);
        ind.initialize();
        test.notDeepEqual(JSON.stringify(prevBody), JSON.stringify(ind.body));
    },
    isFixedLength_whenIndividualIsFixedLength_returnsTrue: function(test) {
        this.options.minLength = 10;
        this.options.maxLength = 10;
        var ind = new individual.Individual(this.options);
        test.ok(ind.isFixedLength());
    },
    isFixedLength_whenIndividualIsNotFixedLength_returnsFalse: function(test) {
        this.options.minLength = 10;
        this.options.maxLength = 20;
        var ind = new individual.Individual(this.options);
        test.ok(!ind.isFixedLength());
    },
    copy_whenBodyHasBeenSet_bodyIsEqual: function(test) {
        var ind = new individual.Individual(this.options);
        var copy = ind.copy();
        test.deepEqual(JSON.stringify(ind), JSON.stringify(copy));
    }
};