const path = require('path');

module.exports = {
    mode: "production",
    entry: "./temp/store/src/index.js",
    output: {
        path: path.resolve(__dirname, "temp/store/src"),
        filename: "index.min.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};