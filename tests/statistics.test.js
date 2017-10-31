import { average, median, statistics } from '../lib/statistics.js';

describe('average', () => {
    it('calculates the average', () => {
        expect(average([1, 2, 3])).toEqual(2);
    });
});

describe('median', () => {
    it('returns the median value', () => {
        expect(median([2, 1, 4])).toEqual(2);
    });

    it('returns an average for an even count', () => {
        expect(median([1, 3, 4, 7])).toEqual(3.5);
    });
});

