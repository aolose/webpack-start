const base = require('./base');
const webpack = require('webpack');
const cwd = process.cwd();
module.exports = base({
    mode: 'development',
    devtool: 'inline-source-map',
    entry:[
        'webpack-hot-middleware/client?reload=true',
        './src/index.js'
    ],
    resolve: {
        alias: {
            inferno: cwd + '/node_modules/inferno/dist/index.dev.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: 'file-loader',
            }],
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
});