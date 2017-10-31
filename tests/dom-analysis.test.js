import { JSDOM } from 'jsdom';
import {
    maximumDepth, elementCount, attributeStatistics, childrenStatistics,
    scripts, stylesheets, images, videos, audios
} from '../lib/dom-analysis.js';

const dom1 = new JSDOM(`
<div id="42">
    <span>
        <span class="myClass"></span>
    </span>
    <span id="myId"></span>
    <img src="someSrc" alt="some alt">
    <div>
        <div></div>
    </div>
</div>
`).window.document.getElementById('42');


describe('maximumDepth', () => {
    it('calculates  the maximum depth of an element', () => {
        expect(maximumDepth(dom1))
            .toEqual(3);

    })
});

describe('attributeStatistics', () => {
    it('returns statistics for the number of attributes per tag', () => {
        expect(attributeStatistics([...dom1.querySelectorAll('*')]))
            .toEqual({
                div: {
                    average: 0,
                    median: 0,
                    total: 0,
                },
                img: {
                    average: 2,
                    median: 2,
                    total: 2,
                },
                span: {
                    average: 2/3,
                    median: 1,
                    total: 2,
                }
            });
    });
});

describe('elementCount', () => {
    it('returns the number of elements by tagName', () => {
        expect(elementCount([...dom1.querySelectorAll('*')]))
            .toEqual({
                span: 3,
                img: 1,
                div: 2
            });
    });
});

describe('childStatistics', () => {
    it('returns statististics for count and type per tag name', () => {
        expect(childrenStatistics([...dom1.querySelectorAll('*')]))
            .toMatchSnapshot();
    });
});

describe('scripts', () => {
    const dom = new JSDOM(`
    <div id="42">
        <script src="https://somehost/app.js"></script>
        <script src="https://someother/app.js"></script>
        <script src="https://someother/app.js"></script>
        <script src="app.jsstylesheets"></script>
    </div>
    `).window.document.getElementById('42');

    it('returns script count per host', () => {
        expect(scripts([...dom.querySelectorAll('*')], 'https://myhost'))
            .toEqual({
                "https://myhost": 1,
                "https://somehost": 1,
                "https://someother": 2
            });
    });
});

describe('stylesheets', () => {
    const dom = new JSDOM(`
    <head id="42">
        <link href="https://somehost/styles.css" rel="stylesheet">
        <link href="https://someother/styles.css" rel="stylesheet">
        <link href="https://someother/styles.css" rel="stylesheet">
        <link href="styles.css" rel="stylesheet">
    </head>stylesheets
    `).window.document.getElementById('42');

    it('returns stylesheet count per host', () => {
        expect(stylesheets([...dom.querySelectorAll('*')], 'https://myhost'))
            .toEqual({
                "https://myhost": 1,
                "https://somehost": 1,
                "https://someother": 2
            });
    });
});

describe('images', () => {
    const dom = new JSDOM(`
    <div id="42">
        <img src="https://somehost/img.png">
        <img src="https://someother/img.png">
        <img src="https://someother/img.png">
        <img src="img.png">
    </div>
    `).window.document.getElementById('42');

    it('returns image count per host', () => {
        expect(images([...dom.querySelectorAll('*')], 'https://myhost'))
            .toEqual({
                "https://myhost": 1,
                "https://somehost": 1,
                "https://someother": 2
            });
    });
});

describe('videos', () => {
    const dom = new JSDOM(`
    <div id="42">
        <video src="https://somehost/funny.wemb"></video>
        <video src="https://someother/funny.wemb"></video>
        <video>
            <source src="https://someother/funny.wemb">
        </video>
        <video src="funny.wemb"></video>
    </div>
    `).window.document.getElementById('42');

    it('returns video count per host', () => {
        expect(videos([...dom.querySelectorAll('*')], 'https://myhost'))
            .toEqual({
                "https://myhost": 1,
                "https://somehost": 1,
                "https://someother": 2
            });
    });
});

describe('audios', () => {
    const dom = new JSDOM(`
    <div id="42">
        <audio src="https://somehost/funny.wemb"></audio>
        <audio src="https://someother/funny.wemb"></audio>
        <audio>
            <source src="https://someother/funny.wemb">
        </audio>
        <audio src="funny.wemb"></audio>
    </div>
    `).window.document.getElementById('42');

    it('returns audio count per host', () => {
        expect(audios([...dom.querySelectorAll('*')], 'https://myhost'))
            .toEqual({
                "https://myhost": 1,
                "https://somehost": 1,
                "https://someother": 2
            });
    });
});