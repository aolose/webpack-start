const args = require('args');
const o = 'option';
args
    [o]('port', 'The port on which the app will be running', 4200)
    [o]('host', 'The host on which the app will be running', 'localhost')
    [o]('config', 'the webpack config');
const {config, port, host} = args.parse(process.argv);
const webpack = require('webpack');
const webpackHistoryApiFallback = require('express-history-api-fallback-middleware');
const webpackConfig = require('./' + config.replace(/^(.\/)?webpack\//, ''));
const path = require('path');
const express = require('express');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-dev-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();
app.use(webpackHistoryApiFallback());
if (isDeveloping) {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath || '',
        contentBase: webpackConfig.devServer.contentBase || '',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
        res.end();
    });
} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(port, host, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://%s:%s/ in your browser.', port, host, port);
});