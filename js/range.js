/**
 * Simple utility for mapping a value to an array entry based on number ranges.
 * Consider the following example
 * Values: ['North', 'East', 'South', 'West']
 * Range 360
 * Test 40: 'North'
 * Test 50: 'East'
 * Test 190: 'South'
 * Test 350: 'North'
 */

GardenRange = {};

GardenRange.normalize = function (range, test) {
    while (test < 0) test += range;
    while (test > range) test -= range;
    return test;
};

GardenRange.find = function (values, range, test) {
    test = GardenRange.normalize(range, test);

    const interval = range / values.length;

    for (let i = 1; i < values.length + 1; i++) {
        const prev = (i - 1) * interval;
        const next = i * interval;
        if (test >= prev && test <= next) {
            const pdist = test - prev;
            const ndist = next - test;
            return pdist < ndist ? values[i - 1] : values[i % values.length];
        }
    }

    return 'None';
};