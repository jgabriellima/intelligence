var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (callback) {
        this.individualOptions = {
            minLength: 10,
            maxLength: 20,
            geneFactory: intelligence.geneFactories.binaryNumber
        };
        callback();
    },
    tearDown: function (callback) {
        this.individualOptions = null;
        callback();
    },
    individual_initializeMissingOptions_throws: function (test) {
        test.throws(function () {
            var x = new intelligence.Individual();
        });
        test.done();
    },
    individual_initializeValidOptions_initializesBody: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(ind.body ? true : false);
        test.done();
    },
    initialize_afterConstruction_resetsBody: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        var prevBody = ind.body.slice(0);
        ind.initialize();
        test.notDeepEqual(JSON.stringify(prevBody), JSON.stringify(ind.body));
        test.done();
    },
    isFixedLength_whenIndividualIsFixedLength_returnsTrue: function (test) {
        this.individualOptions.minLength = 10;
        this.individualOptions.maxLength = 10;
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(ind.isFixedLength());
        test.done();
    },
    isFixedLength_whenIndividualIsNotFixedLength_returnsFalse: function (test) {
        this.individualOptions.minLength = 10;
        this.individualOptions.maxLength = 20;
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(!ind.isFixedLength());
        test.done();
    },
    copy_whenBodyHasBeenSet_bodyIsEqual: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        var copy = ind.copy();
        test.deepEqual(JSON.stringify(ind), JSON.stringify(copy));
        test.done();
    }
};