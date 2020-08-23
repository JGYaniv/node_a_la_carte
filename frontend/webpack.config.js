const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/root.js",
    output: {
        path: path.resolve(__dirname, "src"),
        filename: "bundle.js",
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