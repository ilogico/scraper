const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.join(__dirname, 'bin'),
        filename: 'scraper.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    target: "node"
}