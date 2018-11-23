const base = require('./base');
const webpack = require('webpack');

module.exports = base({
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/,
                use: "file-loader",
            }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
});