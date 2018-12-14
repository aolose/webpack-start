import React from "react";
import {inject, observer} from 'mobx-react';

function changeName(s) {
    s.name = 'Click ' + Date.now();
}

export default inject('homeStore')(observer(
    ({homeStore}) => {
        return <div>
            <h2 className={'y'} onClick={()=>changeName(homeStore)}>
                {homeStore.name}
            </h2>
        </div>
    })
);