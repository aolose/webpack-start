module.exports = `
export default function (name, w) {
    const cfg = ss[name];
    const p = cfg[4];
    const style = {
        backgroundImage: 'url("' + p + '")',
        backgroundPosition: w ? cfg[5] + ' ' + cfg[6] : cfg[2] + ' ' + cfg[3],
        width: w ? w : cfg[0],
        height: w ? w * cfg[8] : cfg[1],
    };
    if (w) style.backgroundSize = cfg[7] + ' auto';
    return style;
}`;

