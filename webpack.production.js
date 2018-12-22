const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.common.js");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const basePath = "/dist/";
module.exports = merge(baseConfig, {
    output: {
        publicPath: basePath
    },
    optimization: {
        minimizer: [
            new MinifyPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});

