import React, {Component} from "react";
import splitStyle from 'spriteJS';
import 'css/Out.scss';

function noBgSplitStyle(icon, value, useCss) {
    const o = splitStyle(icon, parseFloat(value));
    const {width, height} = o;
    console.log(icon, o);
    return useCss ? value ? {width, height} : {} : o;
}

const Content = ({icon, value, useCss = 0}) => <>
    <h5>{
        ['js auto width - ', 'css auto width - ', 'css fixed width - '][useCss]}
        {parseFloat(value) || (useCss-1?' original':'100')
        }</h5>
    <div className={['', icon + '-a', icon + '-b'][useCss]}
         style={noBgSplitStyle(icon, parseFloat(value), useCss)}/>
</>;

class Range extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || 0
        }
    }

    render() {
        return <>
            <input
                className={'range'}
                type={'range'}
                value={this.state.value}
                max={1000}
                min={0}
                onChange={e => this.setState({value: e.target.value})}
            />
            <div className={'clear'}/>
            {this.props.render(this.state)}
        </>
    }
}

export default () => <div className='z'>
    <h2>BackgroundSize with sprite image</h2>
    <Range value={100} render={({value}) =>
        [0, 1, 2].reduce(
            (a, n) => a.push(
                ['logo01', value, n],
                ['logo02', value, n],
                ['logo03', value, n],
                ['logo04', value, n]
            ) && a, []).map(
            ([t, c, useCss]) =>
                <div key={t + c + useCss} className={'x'}>
                    <label>Image origin name: {t}.png</label>
                    <Content value={value} useCss={useCss} icon={t}/>
                </div>
        )
    }/>
</div>;