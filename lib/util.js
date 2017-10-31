'use strict';

/**
 * @template T, R
 * @param {Map<T, R>} map 
 * @param {T} key 
 * @param {() => R} factory 
 */
export const getOrSet = (map, key, factory) => {
    if (map.has(key)) {
        return map.get(key);
    } else {
        const result = factory();
        map.set(key, result);
        return result;
    }
};

/**
 * @template K, V 
 * @param {(V) => K} selector
 * @param {V[]} array
 * @returns {Map<K, V[]>}
 */
export const groupBy = (selector, array) => array.reduce((groups, item) => {
    const group = getOrSet(groups, selector(item), () => []);
    group.push(item);
    return groups;
}, new Map());
