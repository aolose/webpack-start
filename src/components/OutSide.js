import React, {Component} from "react";
import splitStyle from 'spriteJS';
import 'css/Out.scss';

const Content = ({icon, value}) => <>
    <h5>js width:{parseFloat(value) || ' original'}</h5>
    <div style={splitStyle(icon, parseFloat(value))}/>
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
            {this.props.render(this.state)}
            <input
                style={{
                    position: 'absolute',
                    left: '5%',
                    bottom: 10,
                    width: '90%',
                    fontSize: 10
                }}
                type={'range'}
                value={this.state.value}
                max={105}
                min={1}
                onChange={e => this.setState({value: e.target.value})}
            />
        </>
    }
}

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                ['logo01', 30],
                ['logo03', 60],
                ['logo04', 90],
            ]
        }
    }

    render() {
        const cards = this.state.cards.concat();
        return (
            <div className='z'>
                <h2>BackgroundSize with sprite image</h2>
                {cards.map(([t, c]) =>
                    <div key={t + c} className={'x'}>
                        <Range value={c} render={
                            ({value}) => <Content value={value} icon={t}/>
                        }/>
                    </div>
                )}
                <div className={'x'}>
                    <h5>css width:{100}</h5>
                    <div className={'a'}/>
                </div>
            </div>
        )
    }
};