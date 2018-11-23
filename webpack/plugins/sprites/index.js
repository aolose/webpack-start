const ss = require('spritesmith');
const tmp = require('./template');
const path = require('path');
function run(images, k, cb) {
    const ck = '$x' + (Math.random() * Date.now() * 1e4).toString(32).substr(0, 6);
    const o = {
        c: {k: ck, d: []},
        s: {o: '', d: ''}
    };
    ss.run({
        src: images,
        padding: 2
    }, (err, result) => {
        if (err) return;
        const {coordinates: v, image: i} = result;
        Object.keys(v).forEach(r => {
            const n = r.replace(/\.\w+$/, '')
                .replace(/.*[\/\\]/, '')
                .replace(/\s/gi, '')
                .replace(/(^\d)/, '_$1');
            const {x, y, width, height} = v[r];
            o.c.d.push([`${n}`, `${width}px ${height}px ${x}px -${y}px ${ck};\n`]);
        });
        o.s.o = k;
        o.s.d = i;
        cb(o);
    });
}

const glob = require("glob");
const fs =  require("fs");
function combineCss(ls) {
    let css = '';
    let v = '';
    const m = {};
    ls.forEach(f => {
        const {c: {k, d}, s: {o}} = f;
        v += `${k} : "${o}";\n`;
        d.forEach(([n,x])=>{
            let nm = n;
            if (m[n]) nm += '_'+m[n]++;
            else m[n] = 1;
            css += `$${nm} : ${x}`;
        });
    });
    return v + css + tmp;
}

module.exports = class Sprites {
    constructor(options) {
        const {source = {}, scssPath = '_sprite.scss', base = './src/styles'} = options;
        const ls = [];
        const basePath = path.resolve(process.cwd(),base);
        Object.keys(source).forEach(k => {
            const p = source[k];
            ls.push({out: k + '.png', files: glob.sync(path.resolve(basePath,p))})
        });
        this.files = ls || [];
        this.scssPath = scssPath;
        this.basePath = basePath;
    }

    apply(compiler) {
        const {files, scssPath, basePath} = this;
        const func = () => {
            const l = files.length, rs = [];
            let i = 0;
            files.forEach(o => {
                run(o.files, o.out, r => {
                    rs.push(r);
                    if (++i === l) {
                        fs.writeFileSync(path.resolve(basePath,scssPath), combineCss(rs));
                        rs.forEach(a => {
                            fs.writeFileSync(path.resolve(basePath,a.s.o), a.s.d);
                        });
                    }
                });
            });
        };
        compiler.hooks.afterPlugins.tap('WebPackSprites', func);
    }
};