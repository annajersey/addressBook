const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("autoprefixer")]
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g)/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "img/[path][name].[ext]",
                            context: "src/assets/images",
                            limit: 10000
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            name: "img/[path][name].[ext]",
                            context: "src/assets/images"
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            svgo: {
                                plugins: [
                                    {
                                        removeTitle: true,
                                    },
                                    {
                                        cleanupIDs: {
                                            prefix: {
                                                toString() {
                                                    this.counter = this.counter || 0;
                                                    return `id-${this.counter++}`;
                                                }
                                            }
                                        }
                                    },
                                ],
                                floatPrecision: 3,
                            },
                            jsx: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })

    ]

};
