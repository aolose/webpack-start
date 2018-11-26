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
const fs = require("fs");

function combineCss(ls) {
    let css = '';
    let v = '';
    const m = {};
    ls.forEach(f => {
        const {c: {k, d}, s: {o}} = f;
        v += `${k} : "${o}";\n`;
        d.forEach(([n, x]) => {
            let nm = n;
            if (m[n]) nm += '_' + m[n]++;
            else m[n] = 1;
            css += `$${nm} : ${x}`;
        });
    });
    return v + css + tmp;
}

module.exports = class Sprites {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        const {source = {}, scssPath = '_sprite.scss', base = './src/styles'} = this.options;
        let inProcess = false;
        let watched = false;
        const initWatch = (d, f) => {
            watched = true;
            compiler.hooks.afterCompile.tap('after-compile',(cp)=>{
                const dirs = Object.keys(d);
                const files = Object.keys(f);
                if (dirs.length) {
                    dirs.forEach(o => cp.contextDependencies.add(o));
                }
                if (files.length) {
                    files.forEach(o => cp.fileDependencies.add(o));
                }
            });
        };
        const func = isWatch => (cp, cb) => {
            const done = () => {
                inProcess = false;
                cb && cb();
            };
            if (inProcess) return cb && cb();
            const files = [];
            const basePath = path.resolve(process.cwd(), base);
            const dirs = {};
            const ffs = {};
            Object.keys(source).forEach(k => {
                const p = source[k];
                const ps = path.resolve(basePath, p);
                const x = ps.indexOf('*');
                const f = glob.sync(ps);
                if (x) {
                    dirs[ps.substr(0, x)] = 1;
                } else if (/\*|[^.\\/]+[\\/]?$/.test(ps)) {
                    dirs[ps] = 1
                } else {
                    f && f.forEach(v => ffs[v] = 1);
                }
                files.push({out: k + '.png', files: f})
            });
            inProcess = true;
            const l = files.length, rs = [];
            if (!l) {
                return done();
            }
            if (isWatch && !watched) initWatch(dirs, ffs);
            if (isWatch && cp.watchMode) {
                const wc = cp.watchFileSystem.watcher;
                const mt = wc && wc.mtimes;
                if (!mt || !Object.keys(mt).length) return cb && cb();
                const ff = [];
                files.forEach(o => {
                    const f0 = o.files;
                    for (let i = 0, l = f0.length; i < l; i++) {
                        if (mt[f0[i].replace(/\//g,'\\')]) {
                            return ff.push(o);
                        }
                    }
                });
                if (!ff.length) return done();
                files.length = 0;
                files.push(...ff);
            }
            let i = 0;
            files.forEach(o => {
                run(o.files, o.out, r => {
                    rs.push(r);
                    if (++i === l) {
                        fs.writeFileSync(path.resolve(basePath, scssPath), combineCss(rs));
                        rs.forEach(a => {
                            fs.writeFileSync(path.resolve(basePath, a.s.o), a.s.d);
                        });
                        done();
                    }
                });
            });
        };
        compiler.hooks.afterPlugins.tap('WebPackSprites', func());
        compiler.hooks.watchRun.tap('WebPackSprites', func(1));
    }
};