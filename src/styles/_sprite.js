import $x3vmkms from '../assets/images/sp.png';

const ss = {
            logo01:["512px","512px","-2003px","-0px",$x3vmkms,"100%","0%","491.21094%","1"],
            logo02:["512px","512px","-2003px","-514px",$x3vmkms,"100%","33.07593%","491.21094%","1"],
            logo03:["2001px","2066px","-0px","-0px",$x3vmkms,"0%","0","125.68716%","1.0324837581209396"],
            logo04:["512px","512px","-2003px","-1028px",$x3vmkms,"100%","66.15187%","491.21094%","1"],};

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