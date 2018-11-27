import {linkEvent} from 'inferno'
import {inject, observer} from 'inferno-mobx'

function changeName(s) {
    s.name = 'Click ' + Date.now();
}

export default inject('rootStore')(observer(
    ({rootStore}) => {
        return <div>
            <h2 className={'y'} onClick={linkEvent(rootStore, changeName)}>
                {rootStore.name}
            </h2>
        </div>
    })
);