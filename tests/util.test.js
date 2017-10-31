import { groupBy, getOrSet } from '../lib/util.js';

describe('getOrSet', () => {
    it('sets the value when the key is not present', () => {
        /** @type {Map<number, number>} */
        const map = new Map();

        expect(getOrSet(map, 42, () => 54))
            .toEqual(54);
        expect(map.get(42))
            .toEqual(54);
    });

    it('returns the existing value when present', () => {
        const value = {};
        const map = new Map([[42, value]]);
        expect(getOrSet(map, 42, () => ({})))
            .toBe(value);
    });
});

describe('grouBy', () => {
    it('groups by the selected key', () => {
        const values = [1,2,3,4,5,6,7];
        expect(groupBy(v => v % 3, values))
            .toEqual(new Map([[1, [1, 4, 7]], [2, [2, 5]], [0, [3, 6]]]));
    });
});