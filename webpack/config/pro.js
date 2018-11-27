const base = require('./base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = base({
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'js/[name].[hash:8].js',
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                parallel: true,
                uglifyOptions: {
                    output:{
                        comments:false,
                        beautify:false,
                    },
                    compress: {
                        drop_console:true,
                        inline: true
                    }
                }
            })
        ],
        removeAvailableModules:true,
        sideEffects: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[hash:8].[ext]",
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            }
        ],
    },
    plugins: [

    ],
});