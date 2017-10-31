import { groupBy } from './util.js';

/**
 * @param {number[]} array Array of numbers
 * @returns {number}
 */
const sum = array => array.reduce((acc, element) => acc + element, 0);


/**
 * @param {number[]} frequencies 
 * @returns {number}
 */
export const average = frequencies => sum(frequencies) / frequencies.length;

/**
 * @param {number[]} frequencies 
 */
export const median = frequencies => {
    const sorted = frequencies.slice().sort((a, b) => a - b);
    const half = (frequencies.length - 1) / 2 |0;
    return sorted.length % 2 === 0
        ? (sorted[half] + sorted[half + 1]) / 2
        : sorted[half];
}

/**
 * Returns an object with the sum, ocurrences, average, mode and median of the given frequencies.
 * @param {number[]} frequencies 
 * @returns {{}}
 */
export const statistics = frequencies => ({
    total: sum(frequencies),
    average: average(frequencies),
    median: median(frequencies)
});
