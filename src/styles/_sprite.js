import $x7rv60e from '../assets/images/sp.png';

const ss = {
            logo01:["200px","200px","-0px","-302px",$x7rv60e,"0%","100%","261%","1"],
            logo02:["160px","160px","-202px","-302px",$x7rv60e,"55.8011%","88.30409%","326.25%","1"],
            logo03:["220px","227px","-302px","-0px",$x7rv60e,"100%","0%","237.27273%","1.0318181818181817"],
            logo04:["300px","300px","-0px","-0px",$x7rv60e,"0%","0%","174%","1"],};

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
}