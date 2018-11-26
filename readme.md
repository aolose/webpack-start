
## Tree
```
├── package.json
├── postcss.config.js
├── readme.md
├── src
│   ├── assets
│   │   ├── fav.ico
│   │   └── images
│   │       ├── sp.png  // auto generated
│   │       ├── raw
│   │       ├── logo01.png
│   │       │   ├── logo02.png
│   │       │   └── logo02.png
│   │       └── sprite
│   │           ├── logo01.png
│   │           └── logo02.png
│   ├── index.html
│   ├── index.js
│   └── styles
│       ├── index.scss
│       └── _sprite.scss  // auto generated
├── webpack
│   ├── config
│   │   ├── base.js
│   │   ├── dev.js   for development
│   │   └── pro.js   for production
│   ├── plugins
│   │   └── sprites   a example for write webpack plugin
│   │       ├── index.js
│   │       └── template.js
│   └── serv.js
└── yarn.lock
```
 
### Debug webpack width webpack-nano in idea
![](./screenshot/0.jpg)

##### [webpack-nano](https://github.com/shellscape/webpack-nano " ")
 Usage:
```
$ npx wp --help

  Usage
    $ wp [...options]

  Options
    --config          A path to a webpack config file
    --config.{name}   A path to a webpack config file, and the config name to run
    --help            Displays this message
    --silent          Instruct the CLI to produce no console output
    --version         Displays webpack-nano and webpack versions

  Examples
    $ wp
    $ wp --help
    $ wp --config webpack.config.js
    $ wp --config.serve webpack.config.js
```    

### Write a Webpack Plugin
Here is an example for how to write a webpack plugin. 

#####  sprites image
Usage:
```
new SpritesPlugin({
    scssPath: '_sprite.scss',              // default value
    base: './src/styles',                  // default value
    source: { 
        '../assets/images/sp':             // output Path               
           '../assets/images/sprite/*.png' // target files or dirs
    },
}),
```