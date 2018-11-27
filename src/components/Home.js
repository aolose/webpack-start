import {Component, linkEvent} from 'inferno'
import {inject, observer} from 'inferno-mobx'

@inject('rootStore') @observer
class Home extends Component {
    render({rootStore}) {
        return <div>
            <h2 className={'y'} onClick={linkEvent(rootStore, changeName)}>{rootStore.name}</h2>
        </div>
    }
}

function changeName(s) {
    s.name = 'Click ' + Date.now();
}

export default Home