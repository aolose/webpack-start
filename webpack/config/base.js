const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesPlugin = require('../plugins/sprites');
const base = process.cwd();
const dist = path.resolve(base, 'docs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function (cfg = {}) {
    const isPro = cfg.mode === 'production';
    const minCss = isPro && new MiniCssExtractPlugin({
        filename: "css/[name].[hash:8].css",
        chunkFilename: "[id].css"
    }) || [];
    return merge({
        context: base,
        output: {
            filename: '[name].[hash:8].js',
            path: dist
        },
        resolve: {
            alias: {
                spriteJS:path.resolve(base,"src/styles/_sprite.js"),
                css:path.resolve(base,"src/styles/")
            }
        },
        plugins: [
            new CleanWebpackPlugin([dist], {
                root: base
            }),
            new SpritesPlugin({
                source: {
                    '../assets/images/sp': '../assets/images/sprite/*.png'
                },
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                favicon: './src/assets/fav.ico',
            }),
            new CopyWebpackPlugin([{
                from: './src/assets/images/raw',
                to: './images/a',
            }]),
        ].concat(minCss),
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isPro ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                }
            ]
        }
    }, cfg)
};