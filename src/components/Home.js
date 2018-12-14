import React from "react";
import {inject, observer} from 'mobx-react';

function changeName(s) {
    s.name = 'Click ' + Date.now();
}

export default inject('rootStore')(observer(
    ({rootStore}) => {
        return <div>
            <h2 className={'y'} onClick={()=>changeName(rootStore)}>
                {rootStore.name}
            </h2>
        </div>
    })
);