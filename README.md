# This is a small application that collects meta information about the static HTML of a page

## Install dependencies
npm install

## Build
npm run build

## Run unit tests
npm run test

## Use
node bin/scraper https://somepage.com

## Results
The program will output a JSON to stdout with the following format:

    {
        maximumDepth: 'a number representing maximum depth of the DOM tree',
        tagCount: 'an object whose keys are tags and the values is number of ocurrences of the tag',
        attributeStatistics: 'statistics for the number of attributes per tag: total, average and mean',
        childrenStatistics: 'an object whose keys are tags and the value contains statistics for the children of that tag',
        linkedResources: {
            scripts: {},
            images: {},
            stylesheets: {},
            videos: {},
            audios: {}
        }
    }

All the linkedResources have the same format: a dictionary whose keys are the origin of the resource and the values are the respective count.

## How it works
The resource is fetched with `node-fetch`, the html is parsed with `jsdom` and then the statistics are collected.