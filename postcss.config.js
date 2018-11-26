module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 4,
            browsers: 'last 2 versions',
        },
        'cssnano': {
            'preset': [
                'default',
                {'discardComments': {'removeAll': true}}
            ]
        }
    }
};