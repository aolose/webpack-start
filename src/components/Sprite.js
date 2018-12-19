import React, {useState} from "react";
import splitStyle from 'spriteJS';
import {inject, observer} from 'mobx-react';
import 'css/sprite1.scss';
import {Spring} from 'react-spring';

function noBgSplitStyle(icon, value, useCss) {
    const o = splitStyle(icon, parseFloat(value));
    const {width} = o;
    return useCss ? value ? {width} : {} : o;
}

const Content = ({icon, value, useCss = 0}) => <>
    <h5>{
        ['js auto width - ', 'css auto width - ', 'css fixed width - '][useCss]}
        {parseFloat(value) || (useCss - 1 ? ' original' : '100')
        }</h5>
    <div className={['', icon + '-a', icon + '-b'][useCss]}
         style={noBgSplitStyle(icon, parseFloat(value), useCss)}/>
</>;

const Range = inject('outStore')(observer(({outStore, render, handleClick, toggle}) => <>
        <button onClick={handleClick}> Auto Change</button>
        <br/>
        <Spring
            from={{value: toggle % 2 ? 0 : 240}}
            to={{value: toggle % 2 ? 240 : 1}}
            onFrame={({value}) => {
                if (toggle) outStore.value = parseFloat(value.toFixed(2))
            }}
        >
            {() => {
                return <input
                    className={'range'}
                    type={'range'}
                    value={outStore.value}
                    max={240}
                    min={0}
                    onChange={e => outStore.value = e.target.value}
                />
            }}
        </Spring>
        <div className={'clear'}/>
        {render(outStore.value)}
    </>
));

const desc = [
    '通过JS计算雪碧图的样式，只改变宽度',
    '通过CSS生成定位和背景大小为百分比的雪碧图样式，只改变宽度',
    '通过CSS生成固定宽高的雪碧图样式，只改变宽度',
];
export default () => {
    const [t, setT] = useState(false);
    const toggle = () => setT(t + 1);
    return <div className='z'>
        <h2>BackgroundSize with sprite image</h2>
        <Range toggle={t} handleClick={() => {
            toggle();
        }} render={(value) =>
            [0, 1, 2].reduce(
                (a, n) => a.push(
                    ['', desc[n]],
                    ['logo01', value, n],
                    ['logo02', value, n],
                    ['logo03', value, n],
                    ['logo04', value, n],
                ) && a, []).map(
                ([t, c, useCss]) =>
                    t ? <div key={t + c + useCss} className={'x'}>
                        <label>Image origin name: {t}.png</label>
                        <Content value={value} useCss={useCss} icon={t}/>
                    </div> : <div key={t + c + useCss} className={'desc'}>{c}</div>
            )
        }/>
    </div>;
}