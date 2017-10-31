import { URL } from 'url';
import fetch from 'node-fetch';
import { fullAnalysis } from './lib/dom-analysis.js';

const main = async args => {
    try {

        if (args.length < 3) {
            console.error('usage: node bin/jscrambler (url)');
            return;
        }

        const url = args[2];
        const response = await fetch(url);
        if (!response.ok) {
            console.error('error retrieving the html');
        }

        const html = await response.text();

        const origin = new URL(url).origin;
        const analysis = fullAnalysis(html, origin);
        console.log(JSON.stringify(analysis));

    } catch (error) {
        console.error('an unexpected error ocurred, make sure the provided url points to valid html');
        console.error(error);
    }
};

main(process.argv);