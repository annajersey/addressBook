const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.common.js");
const basePath = "/";
module.exports = merge(baseConfig, {
    output: {
        publicPath: basePath
    }
});
