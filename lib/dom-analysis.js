import { URL } from 'url';
import { JSDOM } from 'jsdom';
import { statistics } from './statistics.js';
import { groupBy } from './util.js';

/**
 * 
 * @param {Element[]} elements 
 * @returns {Array<[string, Element[]]>}
 */
const groupByTagName = elements => [...groupBy(element => element.tagName.toLowerCase(), elements)];

/**
 * @param {Element} element 
 */
export const maximumDepth = element => {
    const children = element.children;
    return 1 + (children.length > 0 ? Math.max(...[...children].map(maximumDepth)) : 0);
};

/**
 * @param {Element[]} elements
 */
export const elementCount = elements => {
    const groups = groupBy(el => el.tagName.toLowerCase(), elements);
    return [...groups].reduce((obj, [tag, values]) => {
        obj[tag] = values.length;
        return obj;
    }, {});
};

/**
 * @param {Element[]} elements
 */
export const attributeStatistics = elements => {
    const groups = groupByTagName(elements);
    return groups.reduce((obj, [tag, elements]) => {
        obj[tag] = statistics(elements.map(element => element.attributes.length));
        return obj;
    }, {});
};

/**
 * @param {Element[]} elements
 */
export const childrenStatistics = elements => {
    const groups = groupByTagName(elements);
    return groups.reduce((obj, [tag, elements]) => {
        const stats = statistics(elements.map(element => element.children.length));
        const allChildren = elements.reduce((all, element) => all.concat([...element.children]), []);
        const byChildType = groupByTagName(allChildren).reduce((map, [childTag, els]) => {
            map[childTag] = els.length;
            return map;
        }, {});

        obj[tag] = {
            statistics: stats,
            children: byChildType
        }
        return obj;
    }, {});
};

/**
 * 
 * @param {Element[]} elements 
 * @param {string} baseUrl
 */
export const scripts = (elements, baseOrigin) => {
    const scriptUrls = elements.filter(element => element.matches('script'))
        .map(script => script.src);

    return analyseUrls(scriptUrls, baseOrigin);
};


const analyseUrls = (urls, baseOrigin) => {
    const groups = groupBy(url => new URL(url, baseOrigin).origin, urls);

    return [...groups].reduce((obj, [origin, scripts]) => {
        obj[origin] = scripts.length;
        return obj;
    }, {});
};


/**
 * 
 * @param {Element[]} elements 
 * @param {string} baseUrl
 */
export const stylesheets = (elements, baseOrigin) => {
    const cssUrls = elements.filter(element => element.matches('link') && element.rel === 'stylesheet')
        .map(link => link.href);

    return analyseUrls(cssUrls, baseOrigin);
};

/**
 * 
 * @param {Element[]} elements 
 * @param {string} baseUrl
 */
export const images = (elements, baseOrigin) => {
    const imgSrcs = elements.filter(element => element.matches('img'))
        .map(img => img.src);

    return analyseUrls(imgSrcs, baseOrigin);
};

/**
 * @param {Element[]} elements 
 * @param {string} baseUrl
 */
export const videos = (elements, baseOrigin) => {
    const videoSrcs = elements.filter(element => element.matches('video'))
        .map(video => {
            if (video.src)
                return video.src;
            const source = video.querySelector('source');
            return source ? source.src : '';
        });

    return analyseUrls(videoSrcs, baseOrigin);
};

/**
 * @param {Element[]} elements 
 * @param {string} baseUrl
 */
export const audios = (elements, baseOrigin) => {
    const audioSrcs = elements.filter(element => element.matches('audio'))
        .map(audio => {
            if (audio.src)
                return audio.src;
            const source = audio.querySelector('source');
            return source ? source.src : '';
        });

    return analyseUrls(audioSrcs, baseOrigin);
};


/**
 * Returns the full analysis of the DOM tree represented by 'html' at the given origin
 * @param {string} html
 * @param {string} origin
 */
export const fullAnalysis = (html, origin) => {
    const dom = new JSDOM(html);
    const elements = [...dom.window.document.querySelectorAll('*')];

    return {
        maximumDepth: maximumDepth(dom.window.document.documentElement),
        tagCount: elementCount(elements),
        attributeStatistics: attributeStatistics(elements),
        childrenStatistics: childrenStatistics(elements),
        linkedResources: {
            scripts: scripts(elements, origin),
            images: images(elements, origin),
            stylesheets: stylesheets(elements, origin),
            videos: videos(elements, origin),
            audios: audios(elements, origin)
        }
    };
};