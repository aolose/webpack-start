module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 4,
            browsers: 'last 2 versions',
        },
        'css-mqpacker':{ sort: true },
        'postcss-svgo':{},
        'postcss-normalize':{
            browsers: 'last 2 versions'
        },
        'cssnano': {
            'mergeRules':true,
            'preset': [
                'default',
                {'discardComments': {'removeAll': true}}
            ]
        }
    }
};