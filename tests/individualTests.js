var intelligence = require('./../src/intelligence');

module.exports = {
    setUp: function (callback) {
        this.individualOptions = {
            minLength: 10,
            maxLength: 20,
            geneFactory: intelligence.geneFactories.alphabet
        };
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    individual_initialiseMissingOptions_throws: function (test) {
        test.throws(function () {
            var x = new intelligence.Individual();
        });
        test.done();
    },
    individual_initialiseValidOptions_initializesBody: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(ind.body ? true : false);
        test.done();
    },
    individual_initialisedWithFixedLengthBody_bodySizeIsCorrect: function (test) {
        this.individualOptions.minLength = 20;
        this.individualOptions.maxLength = 20;
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(ind.body.length === 20);
        test.done();
    },
    individual_initialisedWithVariableLengthBody_bodySizeIsWithinBounds: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        test.ok(ind.body.length >= 10 && ind.body.length <= 20);
        test.done();
    },
    initialise_afterConstruction_resetsBody: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        var prevBody = ind.body.slice(0);
        ind.initialise();
        test.notDeepEqual(JSON.stringify(prevBody), JSON.stringify(ind.body));
        test.done();
    },
    initialise_whenCalled_returnsIndividualInstance: function (test) {
        var ind = new intelligence.Individual(this.individualOptions);
        var retrned = ind.initialise();
        test.equal(retrned, ind);
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
        test.ok(JSON.stringify(ind) === JSON.stringify(copy));
        test.done();
    }
};